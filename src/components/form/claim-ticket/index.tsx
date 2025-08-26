import React from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { GenderOptions, RoleOptions, ExperienceLevelOptions } from "@/constants/options";
import ClaimTicketSchema, { ClaimTicketFormData } from "@/schemas/claim-ticket.schema";
import claimTicket from "@/services/claim-ticket.service";

import SelectField from "../../ui/inputs/select";
import TextField from "../../ui/inputs/text-field";
import { toast } from "../../ui/toast";

const defaultValues = Object.freeze({
  fullname: "",
  // email: "",
  gender: undefined,
  role: undefined,
  experience: undefined,
} as const);

const ClaimTicketForm = ({
  token,
  toggleModal,
}: {
  token: string;
  toggleModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    reset,
  } = useForm<ClaimTicketFormData>({
    resolver: zodResolver(ClaimTicketSchema),
    mode: "onTouched",
    defaultValues,
  });
  const onSubmit: SubmitHandler<ClaimTicketFormData> = async (data) => {
    try {
      const submitForm = await claimTicket({
        token,
        ...data,
      });

      if (submitForm === true) {
        toggleModal(true);
        reset(defaultValues);
      } else {
        toast.error(
          "Something went wrong!",
          submitForm ?? "We couldn't complete your request right now. Please try again"
        );
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(
          "Something went wrong!",
          error.message ?? "We couldn't complete your request right now. Please try again"
        );
        return;
      }
      toast.error(
        "Something went wrong!",
        "We couldn't complete your request right now. Please try again"
      );
    }
  };

  return (
    <form
      className="mt-6 space-y-6 rounded-[0.5rem] border border-solid border-(--stroke-soft-200) bg-(--static-white) p-5 md:mt-9"
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextField
        id="fullname"
        label="Full name"
        placeholder="Enter full name"
        error={errors.fullname?.message}
        {...register("fullname")}
      />
      {/* <TextField
        id="emailaddress"
        label="Email address"
        placeholder="Enter email address"
        type="email"
        error={errors.email?.message}
        {...register("email")}
      /> */}
      <Controller
        name="gender"
        control={control}
        render={({ field }) => (
          <SelectField
            id="gender"
            label="Gender"
            placeholder="Select"
            options={GenderOptions}
            error={errors.gender?.message}
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />
      <Controller
        name="role"
        control={control}
        render={({ field }) => (
          <SelectField
            id="role"
            label="Role"
            placeholder="Select your role"
            options={RoleOptions}
            error={errors.role?.message}
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />
      <Controller
        name="experience"
        control={control}
        render={({ field }) => (
          <SelectField
            id="experience"
            label="Experience level"
            placeholder="select your level of experience"
            options={ExperienceLevelOptions}
            error={errors.experience?.message}
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />

      <button
        className="h-12 w-full rounded-[2.25rem] bg-(--away-base) text-center align-middle font-[inter] text-lg leading-6 font-bold tracking-tight text-(--bg-white-0) disabled:bg-(--bg-soft-200) md:h-15"
        type="submit"
        disabled={!isValid || isSubmitting}
      >
        {isSubmitting ? "Claiming..." : "Claim ticket"}
      </button>
    </form>
  );
};

export default ClaimTicketForm;
