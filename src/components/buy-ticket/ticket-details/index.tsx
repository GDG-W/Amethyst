"use client";
import React, { useMemo } from "react";

import Card from "@/components/ui/card";
import { API_DAY_TO_LABEL } from "@/lib/constants";
import { indexTicketsByIsoDate } from "@/lib/utils";
import { Ticket } from "@/types/ticket";

type TicketDetailsProps = {
  selectedDates?: string[];
  tickets: Ticket[];
  quantities?: Record<string, number>;
  onChangeQuantity?: (ticketId: string, quantity: number) => void;
};

function formatCurrencyNaira(value: number): string {
  try {
    return new Intl.NumberFormat("en-NG", {
      currency: "NGN",
      style: "currency",
      maximumFractionDigits: 0,
    }).format(value);
  } catch {
    return `₦${value.toLocaleString()}`;
  }
}

export default function TicketDetails({
  selectedDates = [],
  tickets,
  quantities = {},
  onChangeQuantity,
}: TicketDetailsProps) {
  const ticketsByDateKey = useMemo(() => indexTicketsByIsoDate(tickets), [tickets]);

  const selectedTickets = useMemo(
    () =>
      selectedDates
        .map((iso) => ticketsByDateKey.get(iso) ?? null)
        .filter((t): t is Ticket => t !== null),
    [selectedDates, ticketsByDateKey]
  );

  const handleQty =
    (ticketId: string, available: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = Number.isNaN(e.currentTarget.valueAsNumber) ? 0 : e.currentTarget.valueAsNumber;
      const clamped = Math.max(0, Math.min(available, val));
      onChangeQuantity?.(ticketId, clamped);
    };

  return (
    <Card title="Ticket Details" numbered number={2}>
      <div className="px-4 py-5">
        {selectedTickets.length === 0 ? (
          <p className="text-soft-400 text-sm">Select date(s) to view details</p>
        ) : (
          <ul className="flex flex-col gap-6">
            {selectedTickets.map((t) => {
              const dayLabel = API_DAY_TO_LABEL[t.day] ?? t.day;
              const qty = quantities[t.id] ?? 0;
              const max = t.available_quantity ?? 0;
              return (
                <li key={t.id}>
                  <div className="label-3 mb-2 flex items-center justify-between font-medium sm:mb-3">
                    <p>
                      {dayLabel} - <span className="capitalize">{t.theme}</span>
                    </p>
                    <p>{formatCurrencyNaira(t.price)}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sub-600 label-5 capitalize">{t.theme}</p>
                    <input
                      aria-label={`Quantity for ${dayLabel}`}
                      type="number"
                      min={0}
                      max={max}
                      value={qty}
                      onChange={handleQty(t.id, max)}
                      className="border-soft-200 h-8 w-16 rounded-md border px-2 text-sm"
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </Card>
  );
}
