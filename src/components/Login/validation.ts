import { FormStatusType } from "@/hooks/useForm";
import type { ErrorLoginFormType, LoginFormType } from "@/types";

export const validate = (
  formData: FormData,
  setFormStatus: (status: FormStatusType) => void,
  setErrors: (errors: ErrorLoginFormType) => void
) => {
  const data = Object.fromEntries(formData.entries()) as LoginFormType;

  if (data.hp) {
    window.location.href = "https://www.google.com";
    return { hasError: true, data };
  }

  const newErrors: ErrorLoginFormType = {
    username: !data.username && "Nom d'utilisateur requis",
    password: !data.password && "Mot de passe requis",
  };

  setErrors(newErrors);

  if (!newErrors.username && !newErrors.password) {
    setFormStatus("success");
    return { hasError: false, data };
  }

  setFormStatus("error");

  return { hasError: true, data };
};
