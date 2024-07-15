import { Check } from "lucide-react";
import SubmitButton from "./SubmitButton";
import type { FormStatusType } from "@/hooks/useForm";

const FormFooter = ({ formStatus, successText }: { formStatus: FormStatusType; successText: string }) => {
  return (
    <div className="flex justify-end items-center input-group gap-5">
      {formStatus === "success" && (
        <p className="text-green-500 gap-3 inline-flex justify-center slide-from-bottom slide-from-active">
          <Check />
          {successText}
        </p>
      )}
      <SubmitButton formStatus={formStatus} loadingText="Envoi en cours..">
        Envoyer
      </SubmitButton>
    </div>
  );
};

export default FormFooter;
