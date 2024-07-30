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
  const colorAndText = () => {
    switch (formStatus) {
      case "success":
        return { color: "green", text: successText };
      case "error":
        return { color: "red", text: failText };
      case "loading":
        return { color: "orange", text: "Envoi en cours.." };
      default:
        return { color: "", text: "" };
    }
  };

  const { color, text } = colorAndText();

  return (
    <div className="flex justify-end items-center input-group gap-5">
      <Show when={formStatus === "success"}>
        <p
          className={`${color} gap-3 inline-flex justify-center slide-from-bottom slide-from-active`}
          style={{ color }}>
          <Check />
          {text}
        </p>
      </Show>
      <SubmitButton formStatus={formStatus} loadingText="Envoi en cours..">
        Envoyer
      </SubmitButton>
    </div>
  );
};

export default FormFooter;
