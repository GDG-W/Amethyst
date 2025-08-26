"use client";

import Link from "next/link";
import { FormProvider, useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import Button from "@/components/ui/button";
import TextField from "@/components/ui/inputs/text-field";

const loginSchema = z.object({
  email_address: z.email("Please enter a valid email"),
  ticket_id: z.string().length(8, "Ticket ID must be exactly 8 characters"), // customize as needed
});

export default function LoginClient() {
  const methods = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    mode: "all", // show errors as user types
    defaultValues: {
      email_address: "",
      ticket_id: "",
    },
  });

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = methods;

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    console.log(values);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-sm:border-soft-200 flex w-full flex-col gap-y-6 rounded-lg bg-white px-4 py-5 max-sm:rounded-t-none max-sm:border max-sm:border-t-0 sm:w-[450px] sm:p-5"
      >
        <Controller
          name="email_address"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type="email"
              label="Email address"
              placeholder="Enter email address"
              helperText="The email associated with your ticket"
              error={errors.email_address?.message}
            />
          )}
        />

        <Controller
          name="ticket_id"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type="text"
              label="Ticket ID"
              placeholder="Enter your ticket ID"
              error={errors.ticket_id?.message}
            />
          )}
        />

        <div className="space-y-4">
          <Button disabled={!isValid} type="submit" size="full">
            <span className="text-lg leading-6 font-bold tracking-[-4%] text-white">Log in</span>
          </Button>
          <p className="label-4 text-soft-400 text-center">
            Don’t have a ticket?{" "}
            <Link href="/buy" className="text-away-base">
              Buy here
            </Link>
          </p>
        </div>
      </form>
    </FormProvider>
  );
}
