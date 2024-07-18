import { cn } from "@/lib/utils";
import { ArrowBigRight, SquareX } from "lucide-react";
import { useEffect, useRef, type ReactNode } from "react";
import Show from "./show";

const Dialog = ({
  children,
  className,
  close,
  externalTrigger = false,
  open = false,
  onClose,
}: {
  children: ReactNode;
  className?: string;
  close?: ReactNode;
  externalTrigger?: ReactNode;
  open?: boolean;
  onClose?: () => void;
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const openModal = () => (dialogRef.current as HTMLDialogElement).showModal();
  const closeModal = () => (dialogRef.current as HTMLDialogElement).close();

  useEffect(() => {
    if (externalTrigger) {
      open ? openModal() : closeModal();
    }
  }, [open]);

  return (
    <>
      {!externalTrigger && (
        <button type="button" onClick={openModal} className="flex items-center justify-center gap-1 text-sm group">
          <p className="text-center w-full text-[15px] font-medium">Voir plus</p>
          <ArrowBigRight size={24} className="group-hover:translate-x-2 transition-transform translate-y-[2px]" />
        </button>
      )}
      <dialog
        ref={dialogRef}
        className={cn(
          "min-h-64 min-w-96 dark:backdrop:bg-bogoss-600/50 dark:bg-bogoss-700 dark:text-bogoss-200 rounded-md",
          className
        )}>
        <div className="relative size-full flex flex-col p-3">
          <>
            {children}
            <Show when={!close} fallback={close}>
              <Close
                close={() => {
                  closeModal();
                  onClose && onClose();
                }}
              />
            </Show>
          </>
        </div>
      </dialog>
    </>
  );
};

const Close = ({ close }: { close: () => void }) => {
  return (
    <button
      className="absolute right-0 top-0 hover:text-bogoss-500 text-bogoss-300 p-2 grid place-content-center"
      autoFocus
      type="button"
      onClick={close}>
      <SquareX />
    </button>
  );
};

export default Dialog;
