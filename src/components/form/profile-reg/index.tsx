"use client";

import React from "react";
import { z } from "zod";

import TextField from "@/components/ui/inputs/text-field";
import Card from "@/components/ui/card";
import SelectField from "@/components/ui/inputs/select";
import { useBuyFormStore } from "@/store/buy-form-store";
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
  const { buyerInfo, profileInfo, profileErrors, updateProfileField, setProfileError } =
    useBuyFormStore();

  const fullName = initialData?.fullName || buyerInfo?.fullName || "";
  const email = initialData?.email || buyerInfo?.email || "";
  const gender = profileInfo?.gender || "";
  const role = profileInfo?.role || "";
  const experienceLevel = profileInfo?.experienceLevel || "";

  const handleFieldChange = (field: "gender" | "role" | "experienceLevel", value: string) => {
    updateProfileField(field, value);
  };

  const isFieldReadonly = (fieldName: string) => readonlyFields.includes(fieldName);

  return (
    <Card title="Register Your Profile" numbered={true} number={4}>
      <div className="space-y-4 px-5 py-7">
        <TextField
          id="fullName"
          label="Full Name"
          name="fullName"
          placeholder="Enter full name"
          value={fullName}
          onChange={() => {}} // Read-only since it comes from buyer info
          disabled={true}
        />

        <TextField
          id="email"
          label="Email address"
          name="email"
          type="email"
          placeholder="Enter email address"
          value={email}
          onChange={() => {}} // Read-only since it comes from buyer info
          disabled={true}
        />

        <SelectField
          id="gender"
          label="Gender"
          options={genderOptions}
          placeholder="Select gender"
          value={gender}
          onChange={(value) => handleFieldChange("gender", value)}
          error={profileErrors.gender}
          disabled={isFieldReadonly("gender")}
        />

        <SelectField
          id="role"
          label="Role"
          options={roleOptions}
          placeholder="Select role"
          value={role}
          onChange={(value) => handleFieldChange("role", value)}
          error={profileErrors.role}
          disabled={isFieldReadonly("role")}
        />

        <SelectField
          id="experienceLevel"
          label="Experience Level"
          options={experienceLevelOptions}
          placeholder="Select experience level"
          value={experienceLevel}
          onChange={(value) => handleFieldChange("experienceLevel", value)}
          error={profileErrors.experienceLevel}
          disabled={isFieldReadonly("experienceLevel")}
        />
      </div>
    </Card>
  );
};

export default ProfileRegistration;
