"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import ClaimTicketForm from "@/components/form/claim-ticket.form";
import SuccessCard from "@/components/ui/success-card";
import Modal from "@/components/modal/modal-overlay";

export default function ClaimPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();

  const [ticketToken, setTicketToken] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [closeModalCb, setCloseModalCb] = useState<() => void>(() => () => {});

  useEffect(() => {
    const closeModal = () => {
      setShowModal(false);
    };

    setCloseModalCb(() => closeModal);
  }, []);

  useEffect(() => {
    if (!token) {
      router.push("/");
      return;
    }

    setTicketToken(token);
  }, [token, router]);

  if (!token) return null;

  const openModalAndWait = () => {
    return new Promise<void>((resolve) => {
      setShowModal(true);

      const closeModal = () => {
        setShowModal(false);
        resolve();
      };

      setCloseModalCb(() => closeModal);
    });
  };

  return (
    <div className="relative mx-auto mt-7 w-full max-w-[450px] pb-[15.813rem] md:mt-18 md:pb-18">
      <h1 className="text-center font-[inter] text-[2rem] leading-tight font-medium tracking-tight">
        Finish your registration to claim your ticket
      </h1>

      <ClaimTicketForm token={ticketToken} formCallbackFn={openModalAndWait} />

      <Modal isOpen={showModal}>
        <SuccessCard
          title="Registration Successful"
          summary="You have successfully registered for Devfest Lagos 2025. Check your email for your Ticket ID"
          onClose={closeModalCb}
        />
      </Modal>
    </div>
  );
}
