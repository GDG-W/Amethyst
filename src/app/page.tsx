"use client";

import Header from "@/components/layout/header";
import Card from "@/components/ui/card";
import Checkbox from "@/components/ui/inputs/checkbox";
import TextField from "@/components/ui/inputs/text-field";
import SuccessCard from "@/components/ui/success-card";

export default function Home() {
  return (
    <div className='w-[700px] m-auto space-y-3'>
      <SuccessCard
        title='Purchase Successful'
        summary='You have successfully purchased tickets for DevFest Lagos 2025. Check your email for your ticket ID.'
      />

      <div className='w-128'>
        <TextField
          label='Label'
          name='email'
          placeholder='Enter your name'
          value=''
          onChange={() => {}}
          // error='Name must be more than 2 characters'
          helperText="We'll never share your details."
        />
      </div>

      <Checkbox
        name='check-box'
        label='This ticket belongs to me'
        checked={false}
        onChange={() => {}}
      />

      <Header />

      <div className="max-w-[350px]">
        <Card numbered number={1} title="Select Date(s)">
          <div></div>
        </Card>
        <Card numbered number={2} title="Ticket Details">
          <div></div>
        </Card>
      </div>
    </div>
  );
}
