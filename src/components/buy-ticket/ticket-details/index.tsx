"use client";

import React, { useMemo } from "react";

import { API_DAY_TO_LABEL } from "@/lib/constants";
import Card from "@/components/ui/card";
import SelectField from "@/components/ui/inputs/select";
import { Ticket } from "@/types/ticket";
import { indexTicketsByIsoDate } from "@/lib/utils";

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
  const MAX_TICKETS_PER_DAY = 9;
  const ticketSelectOptions = Array.from({ length: MAX_TICKETS_PER_DAY }, (_, i) => ({
    label: String(i + 1),
    value: String(i + 1),
  }));

  const ticketsByDateKey = useMemo(() => indexTicketsByIsoDate(tickets), [tickets]);

  const selectedTickets = useMemo(
    () =>
      selectedDates
        .map((iso) => ticketsByDateKey.get(iso) ?? null)
        .filter((t): t is Ticket => t !== null),
    [selectedDates, ticketsByDateKey]
  );

  const handleQty = (ticketId: string, available: number) => (val: string) => {
    // Treat empty input as 0
    const num = val === "" ? 0 : Number(val);

    // Clamp to max allowed
    const clamped = Math.max(0, Math.min(num, available, MAX_TICKETS_PER_DAY));

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
                      {dayLabel} -{" "}
                      <span className={`${t.theme === "ui/ux" ? "uppercase" : "capitalize"}`}>
                        {t.theme}
                      </span>
                    </p>
                    <p>{formatCurrencyNaira(t.price)}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p
                      className={`text-sub-600 label-5 max-w-[19rem] ${t.theme === "ui/ux" ? "uppercase" : ""}`}
                    >
                      {t.description}
                    </p>
                    <SelectField
                      placeholder="1"
                      value={String(qty)}
                      options={ticketSelectOptions}
                      onChange={handleQty(t.id, max)}
                      width="88px"
                      inputStyle="!p-2.5 !pl-3"
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
