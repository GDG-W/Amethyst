"use client";

import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "../card";
// CardAction,
// import { DeleteIcon } from "./delete-icon";

type NumberedItem = {
  id: string;
  day?: string;
  track?: string;
  itemName?: string;
  description: string;
  currency?: string;
  amount: number;
  type?: string;
};

type UnnumberedItem = {
  id: string;
  day: string;
  currency?: string;
  amount: number;
  type?: string;
};

type TicketCardProps =
  | {
      variant: "numbered";
      sn?: number;
      items?: NumberedItem[];
    }
  | {
      variant: "unnumbered";
      items?: UnnumberedItem[];
    };

export const TicketCard = (props: TicketCardProps) => {
  if (props.variant === "numbered") {
    const { sn, items } = props;
    return (
      <Card className='max-w-[450px]'>
        <CardHeader>
          {sn ? (
            <span className='w-[27px] h-6 rounded-[4px] bg-(--foreground) text-xs text-(--background) flex justify-center items-center'>
              {sn}
            </span>
          ) : null}
          <CardTitle>Ticket Details</CardTitle>
        </CardHeader>
        <CardContent>
          {items ? (
            <ul className='w-full flex flex-col gap-y-6'>
              {/* {items.map((item) => (
                <CardItem key={item.id}>
                  <div>
                    <div className='flex justify-between gap-x-2'>
                      <div className='min-w-0 flex items-center gap-x-2 leading-none'>
                        <h5 className='font-medium text-sm md:text-base leading-normal -tracking-[0.6px] truncate'>
                          {!item.itemName && item.day ? item.day : null}
                          {!item.itemName && item.day && item.track ? " - " : null}
                          {!item.itemName && item.track ? item.track : null}
                          {item.itemName ? item.itemName : null}
                        </h5>
                        {item.type ? (
                          <span className='py-0.5 px-1 flex items-center gap-x-1 border border-solid border-(--stroke-sub-300) rounded-[4px] text-(--away-base) font-medium text-xs leading-none'>
                            <span>{item.type}</span>
                            <button className='w-4 h-4'>
                              <DropdownIcon />
                            </button>
                          </span>
                        ) : null}
                      </div>
                      <span className='font-medium text-sm md:text-base leading-normal -tracking-[0.6px] whitespace-nowrap'>
                        {item.currency ?? "₦"}
                        {new Intl.NumberFormat("en-US").format(item.amount)}
                      </span>
                    </div>
                    <p className='max-w-[300px] mt-2 text-xs leading-[calc(4/3)] text-(--text-sub-600) -tracking-[0.6px]'>
                      {item.description}
                    </p>
                  </div>
                </CardItem>
              ))} */}
            </ul>
          ) : (
            <p>Select your ticket date(s) to see ticket details.</p>
          )}
        </CardContent>
      </Card>
    );
  }

  // Variant === "unnumbered"
  const { items } = props;
  // const discount = {
  //   currency: "₦",
  //   amount: 10000,
  // };
  // const total = items?.reduce((acc, item) => acc + item.amount, 0) ?? 0;

  return (
    <Card className='w-full max-w-[400px] font-[inter] leading-none'>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent>
        {items ? (
          <ul className='w-full flex flex-col gap-y-6'>
            {/* {items.map((item) => (
              <CardItem key={item.id}>
                <div className='flex justify-between gap-x-2'>
                  <h5 className='font-medium text-sm md:text-base leading-normal text-(--text-sub-600) -tracking-[0.6px] truncate'>
                    {item.day}
                    {item.type ? ` (${item.type})` : null}
                  </h5>
                  <span className='font-medium text-sm md:text-base leading-normal -tracking-[0.6px] whitespace-nowrap'>
                    {item.currency ?? "₦"}
                    {new Intl.NumberFormat("en-US").format(item.amount)}
                  </span>
                </div>
              </CardItem>
            ))} */}
          </ul>
        ) : (
          <p>Select your ticket date(s) to see order summary.</p>
        )}
        {/* <CardAction>
          <div className='my-5 py-5 border-y border-dashed border-(--stroke-soft-200)'>
            <div>
              <button className='text-(--away-base) text-base leading-[calc(4/3)] -tracking-[0.6px] underline'>
                Add discount code
              </button>
              <button>
                <DeleteIcon />
              </button>
            </div>
            <div>
              <input type='text' />
              <span>
                -{discount.currency}
                {new Intl.NumberFormat("en-US").format(discount.amount)}
              </span>
              <span>error</span>
            </div>
          </div>
          <div>
            <div className='flex justify-between items-center'>
              <span className='text-sm md:text-base leading-normal -tracking-[0.6px]'>Total</span>
              <span className='font-medium text-(--text-strong-950) text-sm md:text-base leading-normal -tracking-[0.6px]'>
                {discount.currency}
                {new Intl.NumberFormat("en-US").format(total - discount.amount)}
              </span>
            </div>
            <button className='mt-5 w-full h-[45px] bg-(--away-base) font-medium text-(--background) text-base leading-[150%] -tracking-[0.3px] rounded-[2.25rem]'>
              Proceed to pay
            </button>
          </div>
        </CardAction> */}
      </CardContent>
    </Card>
  );
};
