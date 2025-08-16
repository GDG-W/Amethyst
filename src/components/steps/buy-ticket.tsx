import React, { useEffect, useMemo, useState } from "react";

import { useQueryClient } from "@tanstack/react-query";

import TicketDetails from "@/components/buy-ticket/ticket-details";
import { useTickets } from "@/hooks/useTickets";
import { API_DAY_TO_LABEL } from "@/lib/constants";
import { indexTicketsByIsoDate } from "@/lib/utils";
import { Ticket, TicketType } from "@/types/ticket";

import { OrderItem } from "@/app/buy/client";

import TicketsSelection from "../ui/ticket-selection";

type BuyTicketProps = {
  onItemsChange?: (items: OrderItem[]) => void;
};

const BuyTicket = ({ onItemsChange }: BuyTicketProps) => {
  const queryClient = useQueryClient();
  const ticketDetails = queryClient.getQueryData<OrderItem[]>(["orderItems"]);

  const [activeType, setActiveType] = useState<TicketType>("standard");

  const { tickets: standardTickets } = useTickets("standard");
  const { tickets: proTickets } = useTickets("pro");

  const ticketMap = useMemo(() => {
    const all = [...standardTickets, ...proTickets];
    return new Map(all.map((t) => [t.id, t]));
  }, [standardTickets, proTickets]);

  // derives initial states from cache
  const initialQuantities: Record<string, number> = {};
  const initialSelectedByType: Record<TicketType, string[]> = { standard: [], pro: [] };

  if (ticketDetails) {
    for (const item of ticketDetails) {
      const t = ticketMap.get(item.id);
      if (t) {
        initialQuantities[item.id] = item.ticketCount;

        const isoDate = t.date.split("T")[0];
        initialSelectedByType[t.ticket_type].push(isoDate);
      }
    }
  }

  const ticketsActive = useMemo(
    () => (activeType === "pro" ? proTickets : standardTickets),
    [activeType, standardTickets, proTickets]
  );

  const [quantities, setQuantities] = useState<Record<string, number>>(initialQuantities);
  const [selectedByType, setSelectedByType] =
    useState<Record<TicketType, string[]>>(initialSelectedByType);

  const stdByIso = useMemo(() => indexTicketsByIsoDate(standardTickets), [standardTickets]);
  const proByIso = useMemo(() => indexTicketsByIsoDate(proTickets), [proTickets]);

  const selectedDates = useMemo(() => selectedByType[activeType], [selectedByType, activeType]);

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
    setSelectedByType((prev) => ({ ...prev, [activeType]: newDates }));

    const prevDates = selectedDates;
    const added = newDates.filter((d) => !prevDates.includes(d));
    const removed = prevDates.filter((d) => !newDates.includes(d));

    const activeDateToTicketMap = activeType === "pro" ? proByIso : stdByIso;

    setQuantities((prev) => {
      const addUpdates = added
        .map((isoDate) => activeDateToTicketMap.get(isoDate))
        .filter((t): t is Ticket => !!t)
        .map((t) => [t.id, Math.max(1, prev[t.id] ?? 0)] as const);

      const removeUpdates = removed
        .map((isoDate) => activeDateToTicketMap.get(isoDate))
        .filter((t): t is Ticket => !!t)
        .map((t) => [t.id, 0] as const);

      return [...addUpdates, ...removeUpdates].reduce(
        (acc, [id, qty]) => {
          acc[id] = qty;
          return acc;
        },
        { ...prev }
      );
    });
  };

  useEffect(() => {
    if (!onItemsChange) return;
    onItemsChange(items);
  }, [items, onItemsChange]);

  return (
    <div className="h-fit">
      <TicketsSelection
        activeTab={activeType}
        onTabChange={setActiveType}
        selectedDates={selectedDates}
        onSelectionChange={handleSelectionChange}
      />
      <div className="mt-5">
        <TicketDetails
          tickets={ticketsActive}
          quantities={quantities}
          selectedDates={selectedDates}
          onChangeQuantity={(ticketId, quantity) =>
            setQuantities((prev) => ({ ...prev, [ticketId]: quantity }))
          }
        />
      </div>
    </div>
  );
};

export default BuyTicket;
