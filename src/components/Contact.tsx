import type { FormStatusType } from "@/hooks/useForm";
import useForm from "@/hooks/useForm";
import type { FormEvent, FormEventHandler } from "react";
import Form from "./Form/Form";
import FormFooter from "./Form/FormFooter";
import InputField, { type InputProps } from "./Form/InputField";
import TextError from "./Form/TextError";
import Textarea from "./Form/Textarea";
import Show from "./ui/show";

const slidePlaceholder = (e: FormEvent<HTMLInputElement>) => {
  e.currentTarget.value.length > 0 ? e.currentTarget.classList.add("slide") : e.currentTarget.classList.remove("slide");
};

const Contact = () => {
  const { validate, send, reset, errors, formStatus } = useForm();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { hasError, data } = validate(new FormData(e.currentTarget));
    if (hasError) return;
    await send(data);
  };

  const handleOnChange: FormEventHandler<HTMLInputElement> = (e) => {
    reset(e.currentTarget.name as "tel" | "email" | "msg");
    slidePlaceholder(e);
  };

  return (
    <section className="w-full grid">
      <Form onSubmit={handleSubmit} title="Pour en savoir plus ou me proposer une mission ?" withHoney>
        <Telephone
          onChange={handleOnChange}
          reachableError={errors.reachable}
          formStatus={formStatus}
          telError={errors.tel}
        />
        <Email
          onChange={handleOnChange}
          reachableError={errors.reachable}
          formStatus={formStatus}
          emailError={errors.email}
        />
        <Textarea onChange={handleOnChange}>
          <Show when={formStatus === "error" && errors.msg}>
            <TextError>{errors.msg}</TextError>
          </Show>
        </Textarea>
        <FormFooter formStatus={formStatus} successText="Message envoyé !" failText="😔 I can't contact my server" />
      </Form>
    </section>
  );
};

export default Contact;

const Telephone = (
  props: Omit<InputProps, "children"> & {
    formStatus: FormStatusType;
    reachableError: string | boolean;
    telError: string | boolean;
  }
) => {
  return (
    <InputField {...props} id="tel" name="tel" label="Téléphone">
      <Show when={props.formStatus === "error" && props.telError}>
        <TextError>{props.telError}</TextError>
      </Show>
      <Show when={props.formStatus === "error" && props.reachableError && props.telError}>
        <TextError>{props.reachableError}</TextError>
      </Show>
    </InputField>
  );
};

const Email = (
  props: Omit<InputProps, "children"> & {
    formStatus: FormStatusType;
    reachableError: string | boolean;
    emailError: string | boolean;
  }
) => {
  return (
    <InputField {...props} id="email" name="email" label="Email">
      <Show when={props.formStatus === "error" && props.emailError}>
        <TextError>{props.emailError}</TextError>
      </Show>
      <Show when={props.formStatus === "error" && props.reachableError && props.emailError}>
        <TextError>{props.reachableError}</TextError>
      </Show>
    </InputField>
  );
};
