"use client";

import { Card, CardAction, CardContent, CardHeader, CardItem, CardTitle } from "../card";

import { DeleteIcon } from "./delete-icon";
import { DropdownIcon } from "./dropdown-icon";

export const DetailCard = ({
  sn,
  isMobile,
  items,
}: {
  sn?: number;
  isMobile?: boolean;
  items:
    | {
        id: string;
        day?: string;
        track?: string;
        itemName?: string;
        description: string;
        currency?: string;
        amount: number;
        type?: string;
      }[]
    | undefined;
}) => {
  const discount = {
    currency: "₦",
    amount: 10000,
  };
  const total = Array.from(items!.values()).reduce((acc, item) => acc + item.amount, 0);

  return (
    <Card className='w-full max-w-[450px] font-[inter] leading-none'>
      <CardHeader className=''>
        {sn ? (
          <span className='w-[27px] h-6 rounded-[4px] bg-(--foreground) text-xs text-(--background) flex justify-center items-center'>
            {sn}
          </span>
        ) : null}
        <CardTitle className='font-medium text-base leading-[100%] -tracking-[0.8px]'>
          Ticket Details
        </CardTitle>
      </CardHeader>
      <CardContent className=''>
        {items ? (
          <ul className='w-full flex flex-col gap-y-6'>
            {items.map((item) => {
              return (
                <CardItem key={item.id} className=''>
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
                        {item.currency ?? "₦"} {new Intl.NumberFormat("en-US").format(item.amount)}
                      </span>
                    </div>
                    <p className='max-w-[300px] mt-2 text-xs leading-[calc(4/3)] text-(--text-sub-600) -tracking-[0.6px]'>
                      {item.description}
                    </p>
                  </div>
                </CardItem>
              );
            })}
          </ul>
        ) : (
          <p>Select your ticket date(s) to see ticket details.</p>
        )}
      </CardContent>

      {isMobile ? (
        <CardAction>
          <div>
            <div>
              <label>Add discount code</label>{" "}
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
            </div>
          </div>
          <div>
            <div>
              <span>Total</span>
              <span>
                {discount.currency}
                {new Intl.NumberFormat("en-US").format(total - discount.amount)}
              </span>
            </div>
            <button>Continue</button>
          </div>
        </CardAction>
      ) : null}
    </Card>
  );
};

export const SummaryCard = ({
  items,
}: {
  items:
    | {
        id: string;
        day?: string;
        track?: string;
        itemName?: string;
        description: string;
        currency?: string;
        amount: number;
        type?: string;
      }[]
    | undefined;
}) => {
  const discount = {
    currency: "₦",
    amount: 10000,
  };
  const total = Array.from(items!.values()).reduce((acc, item) => acc + item.amount, 0);

  return (
    <Card className='rounded-[8px]'>
      <CardHeader>
        <CardTitle>Ticket Details</CardTitle>
      </CardHeader>
      <CardContent>
        {items ? (
          <ul>
            {items.map((item) => {
              //setTotal(total + item.amount);
              return (
                <li key={item.id}>
                  <div>
                    <h5>
                      {!item.itemName && item.day ? item.day : null}
                      {!item.itemName && item.day && item.track ? " - " : null}
                      {!item.itemName && item.track ? item.track : null}
                      {item.itemName ? item.itemName : null}
                      <span>{item.type ?? ""}</span>
                    </h5>
                    <p>{item.description}</p>
                  </div>
                  <span>
                    {item.currency ?? "₦"} {new Intl.NumberFormat("en-US").format(item.amount)}
                  </span>
                </li>
              );
            })}
          </ul>
        ) : null}
        <CardAction>
          <div>
            <div>
              <label>Add discount code</label>{" "}
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
            </div>
          </div>
          <div>
            <div>
              <span>Total</span>
              <span>
                {discount.currency}
                {new Intl.NumberFormat("en-US").format(total - discount.amount)}
              </span>
            </div>
            <button>Continue</button>
          </div>
        </CardAction>
      </CardContent>
    </Card>
  );
};
