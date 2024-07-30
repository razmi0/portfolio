import { apiPaths, simpleFetch } from "@/services";
import type { MinimalResponse } from "@/types";
import { FormEvent, useState } from "react";

type ContactFormType = {
  tel: string;
  email: string;
  msg: string;
  hp?: string;
};

const REGEXP = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  tel: /^\d{10}$/,
};

const hasLength = (str: string) => str.length > 0;
const isValidEmail = (email: string) => hasLength(email) && REGEXP.email.test(email);
const isValidTel = (tel: string) => hasLength(tel) && REGEXP.tel.test(tel);

type ErrorsType = {
  email: boolean | string;
  tel: boolean | string;
  msg: boolean | string;
  reachable: boolean | string;
};

const errorsInit = {
  email: false,
  tel: false,
  msg: false,
  reachable: false,
};

export type FormStatusType = "idle" | "loading" | "success" | "error";

const useForm = () => {
  const [errors, setErrors] = useState<ErrorsType>(errorsInit);
  const [infoText, setInfoText] = useState("Au moins un moyen de contact est requis");
  const [formStatus, setFormStatus] = useState<FormStatusType>("idle");

  const validate = (formData: FormData) => {
    setFormStatus("loading");
    const data = Object.fromEntries(formData.entries()) as ContactFormType;

    if (data.hp) {
      window.location.href = "https://www.google.com";
      return { hasError: true, data };
    }

    let reachabilityError = false;
    const emailError = !isValidEmail(data.email);
    const telError = !isValidTel(data.tel);
    if (emailError && telError) reachabilityError = true;

    const newErrors: ErrorsType = {
      email: emailError && "Email invalide",
      tel: telError && "Téléphone invalide",
      msg: !hasLength(data.msg) && "Message requis",
      reachable: reachabilityError && "Au moins un moyen de contact valide est requis",
    };

    if (!newErrors.reachable) {
      newErrors.email = false;
      newErrors.tel = false;
    }

    setErrors(newErrors);

    if (Object.values(newErrors).some((err) => typeof err === "string")) {
      setFormStatus("error");
      return { hasError: true, data };
    }
    return { hasError: false, data };
  };

  const reset = (field: "email" | "tel" | "msg") => {
    if (formStatus !== "idle") {
      setErrors({ ...errors, [field]: false });
      setFormStatus("idle");
    }
  };

  const send = async (data: ContactFormType) => {
    try {
      const fetchOptions = {
        method: "POST",
        body: JSON.stringify({ email: data.email, tel: data.tel, msg: data.msg }),
        signal: AbortSignal.timeout(7000),
      };
      const res = await simpleFetch<MinimalResponse>(apiPaths.contact, fetchOptions);
      res.success ? setFormStatus("success") : setFormStatus("error");
      console.error(res);
    } catch (error) {
      console.error(error);
      setFormStatus("error");
      return;
    }
  };

  const requiredHandler = (e: FormEvent<HTMLInputElement>) => {
    let reachabilityInfo = "";
    let msgInfo = "";

    const form = e.currentTarget.parentElement?.parentElement as HTMLFormElement;
    const tel = form?.querySelector<HTMLInputElement>("#tel") as HTMLInputElement;
    const email = form?.querySelector<HTMLInputElement>("#email") as HTMLInputElement;
    const msg = form?.querySelector<HTMLInputElement>("#message") as HTMLInputElement;

    if (msg.value.length > msg.minLength) {
      msg.removeAttribute("required");
      msgInfo = "";
    } else {
      msg.setAttribute("required", "");
      msgInfo = "Le message doit contenir entre 20 et 500 caractères";
    }

    if (tel.value.length > 0 || email.value.length > 0) {
      tel.removeAttribute("required");
      email.removeAttribute("required");
      reachabilityInfo = "";
    } else {
      tel.setAttribute("required", "");
      email.setAttribute("required", "");
      reachabilityInfo = "Au moins un moyen de contact est requis";
    }
    setInfoText(reachabilityInfo || msgInfo);
  };

  return { errors, formStatus, setErrors, setFormStatus, validate, send, reset, requiredHandler, infoText };
};

export default useForm;
