import type { FormStatusType } from "@/hooks/useForm";
import { b64EncodeUnicode, simpleFetch } from "@/lib/utils";
import { MinimalResponse } from "@/types/types";
import type { FormEvent, FormEventHandler } from "react";
import { useState } from "react";
import Form from "../Form/Form";
import FormFooter from "../Form/FormFooter";
import InputField from "../Form/InputField";
import TextError from "../Form/TextError";
import Show from "../ui/show";

type LoginFormType = {
  username: string;
  password: string;
  hp?: string;
};

type ErrorLoginFormType = {
  username: string | false;
  password: string | false;
};

const errorinit: ErrorLoginFormType = {
  username: false,
  password: false,
};

const slidePlaceholder = (e: FormEvent<HTMLInputElement>) => {
  e.currentTarget.value.length > 0 ? e.currentTarget.classList.add("slide") : e.currentTarget.classList.remove("slide");
};

const sendLoginData = async (data: LoginFormType) => {
  const option = {
    method: "POST",
    body: JSON.stringify({ ...data, password: b64EncodeUnicode(data.password) }),
  };
  const response = await simpleFetch<MinimalResponse & { payload: { user: string; exp: number }; token: string }>(
    "http://localhost:3000/api/login",
    option
  );
  return response;
};

const Login = () => {
  const [token, setToken] = useState<string>("");
  const [errors, setErrors] = useState<ErrorLoginFormType>(errorinit);
  const [formStatus, setFormStatus] = useState<FormStatusType>("idle");

  const validate = (formData: FormData) => {
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

  const reset = () => {
    if (formStatus !== "idle") {
      setErrors(errorinit);
      setFormStatus("idle");
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("loading");
    const { hasError, data } = validate(new FormData(e.currentTarget));
    if (hasError) return;
    setFormStatus("success");
    const response = await sendLoginData(data);
    setToken(response.token);
    console.log(response);
  };

  const handleChange: FormEventHandler<HTMLInputElement> = (e) => {
    reset();
    slidePlaceholder(e);
  };

  return (
    <section className="flex items-center justify-center flex-col gap-5 mt-20 grow h-full">
      <h1 className="text-4xl font-bold">Login</h1>
      <div className={"flex flex-col items-center gap-14 min-h-[50vh] w-72"}>
        <Form onSubmit={handleSubmit} withHoney>
          <InputField id="username" label="Nom d'utilisateur" name="username" onChange={handleChange}>
            <Show when={formStatus === "error" && errors.username}>
              <TextError>{errors.username}</TextError>
            </Show>
          </InputField>
          <InputField type={"password"} id="password" label="Mot de passe" name="password" onChange={handleChange}>
            <Show when={formStatus === "error" && errors.password}>
              <TextError>{errors.password}</TextError>
            </Show>
          </InputField>
          <FormFooter formStatus={formStatus} successText="Message envoyé !" />
          <button
            type="button"
            onClick={async () => {
              const res = await fetch("http://localhost:3000/api/auth", {
                credentials: "include",
                // allowHeaders: ["Access-Control-Allow-Origin", "Authorization", "Access-Control-Allow-Credentials"],
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Access-Control-Allow-Origin": "http://localhost:5173",
                  "Access-Control-Allow-Credentials": "true",
                },
              });
              console.log(res);
              const data = await res.json();
              console.log(data);
            }}>
            .
          </button>
        </Form>
      </div>
    </section>
  );
};

export default Login;
