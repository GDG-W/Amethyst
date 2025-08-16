"use client";

import React from "react";
import { useForm, useController } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import TextField from "@/components/ui/inputs/text-field";
import Checkbox from "@/components/ui/inputs/checkbox";

import Card from "@/components/ui/card";

import { buyerSchema } from "@/schemas/buyerSchema";

import ProfileRegistration from "../profile-reg";
import AttendeeInfo from "../attendee-info";

type FormData = z.infer<typeof buyerSchema>;

const BuyerInformation = () => {
  const { control, handleSubmit, watch } = useForm<FormData>({
    resolver: zodResolver(buyerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      belongsToMe: false,
    },
  });

  const {
    field: fullNameField,
    fieldState: { error: fullNameError },
  } = useController({
    name: "fullName",
    control,
  });

  const {
    field: emailField,
    fieldState: { error: emailError },
  } = useController({
    name: "email",
    control,
  });

  const { field: belongsToMeField } = useController({
    name: "belongsToMe",
    control,
  });

  // Watch the belongsToMe checkbox and form values
  const belongsToMe = watch("belongsToMe");
  const fullName = watch("fullName");
  const email = watch("email");

  return (
    <div>
      <Card title='Buyer Information' numbered={true} number={3}>
        <form onSubmit={handleSubmit(() => {})}>
          <div className='space-y-4 px-5 py-7'>
            <div>
              <TextField
                label='Full Name'
                name='fullName'
                placeholder='Enter full name'
                value={fullNameField.value}
                onChange={fullNameField.onChange}
                onBlur={fullNameField.onBlur}
                error={fullNameError?.message}
              />
            </div>

            <div>
              <TextField
                label='Email address'
                name='email'
                type='email'
                placeholder='Enter email address'
                value={emailField.value}
                onChange={emailField.onChange}
                onBlur={emailField.onBlur}
                error={emailError?.message}
              />
            </div>
          </div>
        </form>
      </Card>

      <div className='mt-4'>
        <Checkbox
          name='belongsToMe'
          label='This ticket belongs to me'
          checked={belongsToMeField.value}
          onChange={belongsToMeField.onChange}
        />
      </div>

      {/* Conditional rendering based on belongsToMe checkbox */}
      <div className='mt-6'>
        {belongsToMe ? (
          <ProfileRegistration
            initialData={{ fullName, email }}
            readonlyFields={["fullName", "email"]}
          />
        ) : (
          <AttendeeInfo selectedDates={[]} />
        )}
      </div>
    </div>
  );
};

export default BuyerInformation;
