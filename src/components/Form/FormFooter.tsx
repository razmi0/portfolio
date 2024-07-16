import type { FormStatusType } from "@/hooks/useForm";
import { Check } from "lucide-react";
import Show from "../ui/show";
import SubmitButton from "./SubmitButton";

type FormFooterType = {
  formStatus: FormStatusType;
  successText: string;
  failText: string;
};

const FormFooter = ({ formStatus, successText, failText }: FormFooterType) => {
  const Status = () => {
    const color = formStatus === "success" ? "green" : "red";
    const text = formStatus === "success" ? successText : failText;
    return (
      <Show when={formStatus}>
        <p className={`${color} gap-3 inline-flex justify-center slide-from-bottom slide-from-active`}>
          <Check />
          {text}
        </p>
      </Show>
    );
  };

  return (
    <div className="flex justify-end items-center input-group gap-5">
      <Status />
      <SubmitButton formStatus={formStatus} loadingText="Envoi en cours..">
        Envoyer
      </SubmitButton>
    </div>
  );
};

export default FormFooter;
