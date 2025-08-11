"use client";

import React, { useEffect } from "react";
import { useForm, useController } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import TextField from "@/components/ui/inputs/text-field";
import Card from "@/components/ui/card";
import SelectField from "@/components/ui/inputs/select";
import { profileSchema } from "@/schemas/profileSchema";

type FormData = z.infer<typeof profileSchema>;

interface ProfileRegistrationProps {
  initialData?: {
    fullName: string;
    email: string;
  };
  readonlyFields?: string[];
}

// Gender options
const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "non-binary", label: "Non-binary" },
  { value: "prefer-not-to-say", label: "Prefer not to say" },
];

// Role options
const roleOptions = [
  { value: "developer", label: "Developer" },
  { value: "designer", label: "Designer" },
  { value: "product-manager", label: "Product Manager" },
  { value: "data-scientist", label: "Data Scientist" },
  { value: "devops", label: "DevOps Engineer" },
  { value: "qa", label: "QA Engineer" },
  { value: "student", label: "Student" },
  { value: "entrepreneur", label: "Entrepreneur" },
  { value: "consultant", label: "Consultant" },
  { value: "other", label: "Other" },
];

// Experience level options
const experienceLevelOptions = [
  { value: "beginner", label: "Beginner - 0-1 year experience, just starting out" },
  { value: "intermediate", label: "Mid-level - 1-4 years experience, comfortable with most tools" },
  { value: "advanced", label: "Senior - 4+ years, possibly leading projects or mentoring others" },
];

const ProfileRegistration: React.FC<ProfileRegistrationProps> = ({
  initialData,
  readonlyFields = [],
}) => {
  const { control, handleSubmit, setValue } = useForm<FormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: "",
      email: "",
      gender: "",
      role: "",
      experienceLevel: "",
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

  const {
    field: genderField,
    fieldState: { error: genderError },
  } = useController({
    name: "gender",
    control,
  });

  const {
    field: roleField,
    fieldState: { error: roleError },
  } = useController({
    name: "role",
    control,
  });

  const {
    field: experienceLevelField,
    fieldState: { error: experienceLevelError },
  } = useController({
    name: "experienceLevel",
    control,
  });

  // Update form values when initialData changes
  useEffect(() => {
    if (initialData) {
      setValue("fullName", initialData.fullName);
      setValue("email", initialData.email);
    }
  }, [initialData, setValue]);

  const isFieldReadonly = (fieldName: string) => readonlyFields.includes(fieldName);

  return (
    <Card title='Register Your Profile' numbered={true} number={4}>
      <form onSubmit={handleSubmit(() => {})}>
        <div className='space-y-4 px-5 py-7'>
          <TextField
            id='fullName'
            label='Full Name'
            name='fullName'
            placeholder='Enter full name'
            value={fullNameField.value}
            onChange={isFieldReadonly("fullName") ? () => {} : fullNameField.onChange}
            onBlur={fullNameField.onBlur}
            error={fullNameError?.message}
            disabled={isFieldReadonly("fullName")}
          />

          <TextField
            id='email'
            label='Email address'
            name='email'
            type='email'
            placeholder='Enter email address'
            value={emailField.value}
            onChange={isFieldReadonly("email") ? () => {} : emailField.onChange}
            onBlur={emailField.onBlur}
            error={emailError?.message}
            disabled={isFieldReadonly("email")}
          />

          <SelectField
            id='gender'
            label='Gender'
            options={genderOptions}
            placeholder='Select gender'
            value={genderField.value}
            onChange={
              isFieldReadonly("gender")
                ? () => {}
                : (value) => {
                    genderField.onChange(value);
                  }
            }
            error={genderError?.message}
            disabled={isFieldReadonly("gender")}
          />

          <SelectField
            id='role'
            label='Role'
            options={roleOptions}
            placeholder='Select role'
            value={roleField.value}
            onChange={
              isFieldReadonly("role")
                ? () => {}
                : (value) => {
                    roleField.onChange(value);
                  }
            }
            error={roleError?.message}
            disabled={isFieldReadonly("role")}
          />

          <SelectField
            id='experienceLevel'
            label='Experience Level'
            options={experienceLevelOptions}
            placeholder='Select experience level'
            value={experienceLevelField.value}
            onChange={
              isFieldReadonly("experienceLevel")
                ? () => {}
                : (value) => {
                    experienceLevelField.onChange(value);
                  }
            }
            error={experienceLevelError?.message}
            disabled={isFieldReadonly("experienceLevel")}
          />
        </div>
      </form>
    </Card>
  );
};

export default ProfileRegistration;
