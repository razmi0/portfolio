import type { FormStatusType } from "@/hooks/useForm";
import type { ReactNode } from "react";
import { Button } from "../ui/button";
import Loader from "../ui/loader";

type SubmitButtonProps = {
  formStatus: FormStatusType;
  loadingText: string;
  children: ReactNode;
};
const SubmitButton = ({ children, formStatus, loadingText }: SubmitButtonProps) => {
  return (
    <Button type="submit" className="w-fit inline-flex items-center gap-3">
      {formStatus === "loading" ? (
        <div className="slide-from-top slide-from-active">{loadingText}</div>
      ) : (
        <div className="slide-from-bottom slide-from-active">{children}</div>
      )}
      {formStatus === "loading" && <Loader />}
    </Button>
  );
};

export default SubmitButton;
