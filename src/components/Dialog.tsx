import { cn } from "@/lib/utils";
import { ArrowBigRight, SquareX } from "lucide-react";
import { useRef } from "react";

const Dialog = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  return (
    <>
      <button
        type="button"
        onClick={() => dialogRef.current?.showModal()}
        className="flex items-center justify-center gap-1 text-sm group">
        <p>Voir plus</p>
        <ArrowBigRight size={18} className="group-hover:translate-x-2 transition-transform" />
      </button>
      <dialog
        ref={dialogRef}
        className={cn(
          "min-h-64 max-h-80 min-w-96 max-w-[450px] dark:backdrop:bg-bogoss-600/50 dark:bg-bogoss-700 dark:text-bogoss-200 rounded-md",
          className
        )}>
        <div className="relative size-full flex flex-col p-3">
          {children}
          <Close close={() => dialogRef.current?.close()} />
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
