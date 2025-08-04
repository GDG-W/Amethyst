import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import ClaimTicketSchema, { ClaimTicketFormData } from "@/schemas/claim-ticket.schema";

import TextField from "../ui/inputs/text-field";

const ClaimTicketForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    reset,
    watch,
    trigger,
  } = useForm<ClaimTicketFormData>({
    resolver: zodResolver(ClaimTicketSchema),
    mode: "onTouched",
  });
  const onSubmit: SubmitHandler<ClaimTicketFormData> = async (data) => {
    try {
      console.log("Form Data:", data);
      await new Promise((res) => setTimeout(res, 1000));
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      className='mt-6 space-y-6 rounded-[0.5rem] border border-solid border-(--stroke-soft-200) bg-(--static-white) p-5 md:mt-9'
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextField
        id='fullname'
        label='Full name'
        placeholder='Enter full name'
        error={errors.fullName?.message}
        {...register("fullName")}
      />
      <TextField
        id='emailaddress'
        label='Email address'
        placeholder='Enter email address'
        type='email'
        error={errors.email?.message}
        {...register("email")}
      />
      <TextField
        id='gender'
        label='Gender'
        placeholder='Select'
        error={errors.gender?.message}
        {...register("gender")}
      />
      <TextField
        id='role'
        label='role'
        placeholder='Select your role'
        error={errors.role?.message}
        {...register("role")}
      />
      <TextField
        id='experienceLevel'
        label='Experience level'
        placeholder='select your level of experience'
        error={errors.experienceLevel?.message}
        {...register("experienceLevel")}
      />
      <button
        className='h-12 w-full rounded-[2.25rem] bg-(--away-base) text-center align-middle font-[inter] text-lg leading-6 font-bold tracking-tight text-(--bg-white-0) disabled:bg-(--bg-soft-200) md:h-15'
        type='submit'
        disabled={!isValid || isSubmitting}
      >
        {isSubmitting ? "Claiming..." : "Claim ticket"}
      </button>
    </form>
  );
};

export default ClaimTicketForm;
