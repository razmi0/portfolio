import type { FormStatusType } from "@/hooks/useForm";
import { b64EncodeUnicode } from "@/lib/utils";
import { apiPaths, simpleFetch } from "@/services";
import type { ErrorLoginFormType, LoginFormType, ResponseLoginType } from "@/types";
import type { FormEvent, FormEventHandler } from "react";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useRouter } from "../../provider/routes-provider";
import Form from "../Form/Form";
import FormFooter from "../Form/FormFooter";
import InputField from "../Form/InputField";
import TextError from "../Form/TextError";
import Show from "../ui/show";
import { validate } from "./validation";

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
  const response = await simpleFetch<ResponseLoginType>(apiPaths.login, option, 7000);
  return response;
};

const Login = () => {
  const { /** isAuth , **/ signIn /** signOut  authOptions */ } = useAuth();
  const { changeRoute } = useRouter();
  const [errors, setErrors] = useState<ErrorLoginFormType>(errorinit);
  const [formStatus, setFormStatus] = useState<FormStatusType>("idle");

  const reset = () => {
    if (formStatus !== "idle") {
      setErrors(errorinit);
      setFormStatus("idle");
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { hasError, data } = validate(new FormData(e.currentTarget), setFormStatus, setErrors);
    if (hasError) return;
    const response = await signIn(() => sendLoginData(data));
    if (!response) {
      setFormStatus("error");
      return;
    }
    setFormStatus("success");
    changeRoute("dashboard");
  };

  const handleChange: FormEventHandler<HTMLInputElement> = (e) => {
    reset();
    slidePlaceholder(e);
  };

  return (
    <section className="flex items-center justify-center flex-col gap-5 mt-20 grow h-full">
      <h1 className="text-4xl font-bold">Login</h1>
      <div className={"flex flex-col items-center gap-14 min-h-[50vh] w-72"}>
        <Form
          onSubmit={async (e) => {
            setFormStatus("loading");
            await handleSubmit(e);
          }}
          withHoney>
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
          <FormFooter formStatus={formStatus} successText="Success" failText="Never" infoText="" />
        </Form>
      </div>
    </section>
  );
};

export default Login;
