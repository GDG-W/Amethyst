import React, { useEffect, useMemo, useCallback } from "react";

import { API_DAY_TO_LABEL } from "@/lib/constants";
import { OrderItem } from "@/app/(root)/buy/client";
import { Ticket } from "@/types/ticket";
import TicketDetails from "@/components/buy-ticket/ticket-details";

import { indexTicketsByIsoDate } from "@/lib/utils";
import { useBuyFormStore } from "@/store/buy-form-store";
import { useTickets } from "@/hooks/useTickets";

import { BOTH_DAYS_FULL_ID } from "@/constants/ticket";

import TicketsSelection from "../ui/ticket-selection";

const BuyTicket = () => {
  const {
    activeTicketType,
    selectedByType,
    quantities,
    setActiveTicketType,
    setSelectedByType,
    setQuantities,
    updateTicketQuantity,
    setOrderItems,
  } = useBuyFormStore();

  const { tickets: standardTickets } = useTickets("standard");

  const proTickets = useMemo(() => {
    if (standardTickets.length < 2) return [];

    const fri = standardTickets.find((t) => t.day === "fri");
    const sat = standardTickets.find((t) => t.day === "sat");

    if (!fri || !sat) return [];

    const syntheticPro: Ticket = {
      id: BOTH_DAYS_FULL_ID,
      ticket_type: "pro",
      day: "both" as unknown as "fri",
      price: fri.price + sat.price,
      total_quantity: Math.min(fri.total_quantity, sat.total_quantity),
      available_quantity: Math.min(fri.available_quantity, sat.available_quantity),
      created_at: fri.created_at,
      updated_at: fri.updated_at,
      theme: "Full Experience",
      description: "Access to both days of the event",
      date: "bothT00:00:00.000Z", // Keep standard ISO format for split("T")[0] logic
    };

    return [syntheticPro];
  }, [standardTickets]);

  const ticketsActive = useMemo(
    () => (activeTicketType === "pro" ? proTickets : standardTickets),
    [activeTicketType, standardTickets, proTickets]
  );

  const stdByIso = useMemo(() => indexTicketsByIsoDate(standardTickets), [standardTickets]);
  const proByIso = useMemo(() => indexTicketsByIsoDate(proTickets), [proTickets]);

  const selectedDates = useMemo(
    () => selectedByType[activeTicketType],
    [selectedByType, activeTicketType]
  );

  const mk = useCallback(
    (t: Ticket): OrderItem | null => {
      const qty = quantities[t.id] ?? 0;
      if (qty <= 0) return null;

      const dayLabel = API_DAY_TO_LABEL[t.day] ?? t.day;
      const typeLabel = t.ticket_type === "pro" ? "Full Experience Ticket" : "Standard Ticket";

      return {
        id: t.id,
        name: `${qty} x ${dayLabel} (${typeLabel})`,
        dayName: dayLabel,
        ticketCount: qty,
        price: qty * t.price,
        theme: t.theme,
        description: t.description,
      };
    },
    [quantities]
  );

  const items = useMemo(() => {
    const iso = (d: string) => d.split("T")[0];

    const stdSel = new Set(selectedByType.standard);
    const proSel = new Set(selectedByType.pro);

    const stdItems = standardTickets
      .filter((t) => stdSel.has(iso(t.date)))
      .map(mk)
      .filter((x): x is OrderItem => !!x);

    const proItems = proTickets
      .filter((t) => proSel.has(iso(t.date)))
      .map(mk)
      .filter((x): x is OrderItem => !!x);

    return [...stdItems, ...proItems];
  }, [selectedByType, standardTickets, proTickets, mk]);

  const handleSelectionChange = (newDates: string[]) => {
    setSelectedByType(activeTicketType, newDates);

    const prevDates = selectedDates;
    const added = newDates.filter((d) => !prevDates.includes(d));
    const removed = prevDates.filter((d) => !newDates.includes(d));

    const activeDateToTicketMap = activeTicketType === "pro" ? proByIso : stdByIso;

    const addUpdates = added
      .map((isoDate) => activeDateToTicketMap.get(isoDate))
      .filter((t): t is Ticket => !!t)
      .map((t) => [t.id, Math.max(1, quantities[t.id] ?? 0)] as const);

    const removeUpdates = removed
      .map((isoDate) => activeDateToTicketMap.get(isoDate))
      .filter((t): t is Ticket => !!t)
      .map((t) => [t.id, 0] as const);

    const newQuantities = [...addUpdates, ...removeUpdates].reduce(
      (acc, [id, qty]) => {
        acc[id] = qty;
        return acc;
      },
      { ...quantities }
    );

    setQuantities(newQuantities);
  };

  useEffect(() => {
    const currentItems = useBuyFormStore.getState().orderItems;

    const areItemsEqual =
      currentItems.length === items.length &&
      currentItems.every(
        (item, i) => item.id === items[i]?.id && item.ticketCount === items[i]?.ticketCount
      );

    if (!areItemsEqual) {
      setOrderItems(items);
    }
  }, [items, setOrderItems]);

  return (
    <div className="h-fit">
      <TicketsSelection
        activeTab={activeTicketType}
        onTabChange={setActiveTicketType}
        selectedDates={selectedDates}
        onSelectionChange={handleSelectionChange}
        tickets={ticketsActive}
      />
      <div className="mt-5">
        <TicketDetails
          tickets={ticketsActive}
          quantities={quantities}
          selectedDates={selectedDates}
          onChangeQuantity={updateTicketQuantity}
        />
      </div>
    </div>
  );
};

export default BuyTicket;
