import React, { useEffect, useMemo } from "react";

import TicketDetails from "@/components/buy-ticket/ticket-details";
import { useTickets } from "@/hooks/useTickets";
import { API_DAY_TO_LABEL } from "@/lib/constants";
import { indexTicketsByIsoDate } from "@/lib/utils";
import { Ticket } from "@/types/ticket";
import { useBuyFormStore } from "@/store/buy-form-store";

import { OrderItem } from "@/app/buy/client";

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
  const { tickets: proTickets } = useTickets("pro");

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

  const mk = (t: Ticket): OrderItem | null => {
    const qty = quantities[t.id] ?? 0;
    if (qty <= 0) return null;

    const dayLabel = API_DAY_TO_LABEL[t.day] ?? t.day;
    const typeLabel = t.ticket_type === "pro" ? "Pro Ticket" : "Standard Ticket";

    return {
      id: t.id,
      name: `${qty} x ${dayLabel} (${typeLabel})`,
      dayName: dayLabel,
      ticketCount: qty,
      price: qty * t.price,
    };
  };

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
  }, [selectedByType, standardTickets, proTickets, quantities]);

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
    setOrderItems(items);
  }, [items, setOrderItems]);

  return (
    <div className="h-fit">
      <TicketsSelection
        activeTab={activeTicketType}
        onTabChange={setActiveTicketType}
        selectedDates={selectedDates}
        onSelectionChange={handleSelectionChange}
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
