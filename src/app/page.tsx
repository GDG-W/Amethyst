"use client";

import TextField from "@/components/ui/inputs/text-field";
import SuccessCard from "@/components/ui/success-card";

export default function Home() {
  return (
    <div>
      <SuccessCard
        title='Purchase Successful'
        summary='You have successfully purchased tickets for DevFest Lagos 2025. Check your email for your ticket ID.'
      />

      <div className='max-w-128'>
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
    </div>
  );
}
