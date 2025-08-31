import { useRouter } from "next/navigation";
import * as DialogPrimitive from "@radix-ui/react-dialog";

import ConfettiIcon from "@/components/icons/confetti";
import Close from "@/components/icons/close";
import Button from "@/components/ui/button";
import SuccessModalProps from "@/types/modal";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../index";

export default function SuccessModal({
  currModalState,
  title,
  links,
  summary,
  toggleModal,
}: SuccessModalProps) {
  const navigator = useRouter();
  return (
    <Dialog open={currModalState} onOpenChange={toggleModal}>
      <DialogContent className="bg-white-0 border-soft-200 flex w-full max-w-[410px] min-w-60 flex-col gap-3 rounded-md border px-7 py-10">
        <div className="flex items-start justify-between">
          <ConfettiIcon />
          {toggleModal ? (
            <DialogPrimitive.Close data-slot="dialog-close" className={`h-8 w-8 cursor-pointer`}>
              <Close className="h-full w-full" />
              <span className="sr-only">Close</span>
            </DialogPrimitive.Close>
          ) : null}
        </div>
        <DialogHeader className="space-y-3">
          <DialogTitle className="heading-5 md:heading-4 font-semibold text-black capitalize">
            {title}
          </DialogTitle>
          {summary && (
            <DialogDescription className="text-text-sub-600 label-4 md:label-3">
              {summary}
            </DialogDescription>
          )}
        </DialogHeader>
        <DialogFooter className="mt-3 flex flex-col gap-2">
          {links ? (
            links?.map((link) => {
              return (
                <Button
                  key={link.id}
                  variant={link.type}
                  onClick={() => {
                    navigator.push(link.href);
                  }}
                >
                  {link.text}
                </Button>
              );
            })
          ) : (
            <>
              <Button
                variant={"primary"}
                onClick={() => {
                  navigator.push("/buy");
                }}
              >
                Buy more tickets
              </Button>
              <Button
                variant={"secondary"}
                onClick={() => {
                  navigator.push("/dashboard");
                }}
              >
                Go to dashboard
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
