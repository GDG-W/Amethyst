"use client";

import { useState } from "react";

import Header from "@/components/layout/header";
import Card from "@/components/ui/card";
import Checkbox from "@/components/ui/inputs/checkbox";
import MultiInput from "@/components/ui/inputs/multi-input";
import Select from "@/components/ui/inputs/select";
import TextField from "@/components/ui/inputs/text-field";
import { toast } from "@/components/ui/toast";
import SuccessModal from "@/components/modal/success-modal";
import Button from "@/components/ui/button";

import SuccessCard from "@/components/ui/success-card/index";
const options = [
  { label: "Option 1", value: "one" },
  { label: "Option 2", value: "two" },
  { label: "Option 3", value: "three" },
];

// after we're don using this page for testing
//  redirect to buy page if user is not logged in
//  and redirect to upgrade page if user is logged in
export default function Home() {
  const [toggleSuccessModal, setToggleSuccessModal] = useState(false);
  const [selected, setSelected] = useState("");
  const [emails, setEmails] = useState<string[]>([]);
  const isValidEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email) ? null : "Invalid email address";
  };

  return (
    <div className="m-auto w-[700px] space-y-3">
      <SuccessModal
        currModalState={toggleSuccessModal}
        toggleModal={setToggleSuccessModal}
        title="Purchase Successful"
        summary="You have successfully purchased tickets for DevFest Lagos 2025. Check your email for your ticket ID."
      />

      <Button
        onClick={() => {
          setToggleSuccessModal(true);
        }}
      >
        Open Modal
      </Button>

      <SuccessCard
        title="Purchase Successful"
        summary="You have successfully purchased tickets for DevFest Lagos 2025. Check your email for your ticket ID."
      />

      {/* <Breadcrumb breadcrumbList={breadcrumbList} activeIndex={1} handleClick={() => {}} />

      <Breadcrumb breadcrumbList={breadcrumbList} activeIndex={1} handleClick={() => {}} /> */}

      <div className="mb-12 flex w-128 flex-col gap-2">
        <TextField
          label="Label"
          name="email"
          placeholder="Enter your name"
          value=""
          onChange={() => {}}
          // error='Name must be more than 2 characters'
          helperText="We'll never share your details."
        />

        <Select
          label="Role"
          options={options}
          value={selected}
          onChange={setSelected}
          placeholder="Select your level of experience"
        />

        <button
          onClick={() => {
            toast.error(
              "Something went wrong!",
              "We couldn't complete your request right now. Please try again"
            );
          }}
        >
          show toast
        </button>

        <MultiInput
          label="Email Addresses"
          value={emails}
          onChange={setEmails}
          placeholder="Enter email addresses"
          validate={isValidEmail}
          error="This field is required"
        />
      </div>

      <Checkbox
        name="check-box"
        label="This ticket belongs to me"
        checked={false}
        onChange={() => {}}
      />

      <Header />

      <div className="max-w-[350px]">
        <Card
          numbered
          number={1}
          title="Attendee"
          subtitle="Kindly Press “Enter” key after entering each email to add it to the list."
        >
          <div></div>
        </Card>
        <Card numbered number={2} title="Ticket Details">
          <div></div>
        </Card>
        <Card number={2} title="Ticket Details">
          <div></div>
        </Card>
      </div>
    </div>
  );
}

// const breadcrumbList = [
//   {
//     name: "Home Page",
//     link: "/",
//   },
//   {
//     name: "Buy Ticket",
//     link: "/buy-ticket",
//   },
//   {
//     name: "Buyer Information",
//     link: "/buyer-information",
//   },
// ];
