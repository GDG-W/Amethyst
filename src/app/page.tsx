"use client";

import Header from "@/components/layout/header";
import Breadcrumb from "@/components/ui/breadcrumb";
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

      <Breadcrumb breadcrumbList={breadcrumbList} />

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
    </div>
  );
}

const breadcrumbList = [
  {
    name: "Home Page",
    link: "/",
  },
  {
    name: "Buy Ticket",
    link: "/buy-ticket",
  },
  {
    name: "Buyer Information",
    link: "/buyer-information",
  },
];
