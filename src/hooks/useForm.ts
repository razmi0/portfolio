import { useState } from "react";

const apiPath = import.meta.env.DEV
  ? "http://localhost:3000/api/contact"
  : "https://portfolio-api-mu-five.vercel.app/api/contact";
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

type FormStatusType = "idle" | "loading" | "success" | "error";

const useForm = () => {
  const [errors, setErrors] = useState<ErrorsType>(errorsInit);
  const [formStatus, setFormStatus] = useState<FormStatusType>("idle");

  const validate = (formData: FormData) => {
    setFormStatus("loading");
    const data = Object.fromEntries(formData.entries()) as ContactFormType;

    if (data.hp) {
      window.location.href = "https://www.google.com";
      return { hasError: true, data };
    }

    let reachabilityError = false;
    let emailError = !isValidEmail(data.email);
    let telError = !isValidTel(data.tel);
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
      };
      const res = await fetch(apiPath, fetchOptions);
      const { success } = (await res.json()) as { success: boolean; authorized: boolean };
      success && setFormStatus("success");
    } catch (error) {
      console.error(error);
      setFormStatus("error");
      return;
    }
  };

  return { errors, formStatus, setErrors, setFormStatus, validate, send, reset };
};

export default useForm;
