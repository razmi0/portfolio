import type { FormStatusType } from "@/hooks/useForm";
import { Check } from "lucide-react";
import Show from "../ui/show";
import SubmitButton from "./SubmitButton";

type FormFooterType = {
    formStatus: FormStatusType;
    successText: string;
    failText: string;
    infoText: string;
};

const FormFooter = ({ formStatus, successText, failText, infoText }: FormFooterType) => {
    const colorAndText = () => {
        switch (formStatus) {
            case "success":
                return { color: "green", text: successText };
            case "error":
                return { color: "red", text: failText };
            case "loading":
                return { color: "orange", text: "Envoi in progress.." };
            default:
                return { color: "", text: "" };
        }
    };

    console.log(formStatus);

    const { color, text } = colorAndText();

    const showInfo = () => formStatus !== "success" && formStatus !== "loading";

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
            <Show when={showInfo()}>
                <p className={`inline-flex justify-center`}>{infoText}</p>
            </Show>
            <Show when={formStatus === "error"}>
                <p className={`text-red-500`}>{text}</p>
            </Show>
            <SubmitButton formStatus={formStatus} loadingText="Envoi in progress..">
                Send
            </SubmitButton>
        </div>
    );
};

export default FormFooter;
