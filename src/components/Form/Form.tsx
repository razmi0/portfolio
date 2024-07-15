import type { FormEvent, ReactNode } from "react";
import HoneyPot from "./HoneyPot";

const Form = ({
  children,
  onSubmit,
  withHoney,
  title,
}: {
  children: ReactNode;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  withHoney?: boolean;
  title?: string;
}) => {
  return (
    <form onSubmit={onSubmit} className="flex flex-col items-center justify-center my-5 w-full">
      {title && <h3 className="!text-belgoss-500 text-center text-lg mb-10">{title}</h3>}
      {withHoney && <HoneyPot />}
      {children}
    </form>
  );
};

export default Form;
