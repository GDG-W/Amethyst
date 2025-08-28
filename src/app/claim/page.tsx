"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import ClaimTicketForm from "@/components/form/claim-ticket";
import SuccessModal from "@/components/modal/success-modal";

export default function ClaimPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();

  const [toggleSuccessModal, setToggleSuccessModal] = useState<boolean>(false);

  useEffect(() => {
    if (!token) {
      router.push("/");
      return;
    }
  }, [token, router]);

  return (
    <div className="relative mx-auto mt-7 w-full max-w-[450px] pb-[15.813rem] md:mt-18 md:pb-18">
      <h1 className="text-center font-[inter] text-[2rem] leading-tight font-medium tracking-tight">
        Finish your registration to claim your ticket
      </h1>

      <ClaimTicketForm token={token!} toggleModal={setToggleSuccessModal} />

      <SuccessModal
        currModalState={toggleSuccessModal}
        toggleModal={setToggleSuccessModal}
        title="Registration Successful"
        summary="You have successfully registered for Devfest Lagos 2025. Check your email for your Ticket ID"
      />
    </div>
  );
}
