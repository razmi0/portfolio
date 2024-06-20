import useForm from "@/hooks/useForm";
import { cn } from "@/lib/utils";
import { Check, TriangleAlert } from "lucide-react";
import { ChangeEvent, FormEvent, ReactNode } from "react";
import { Button } from "./ui/button";
import Loader from "./ui/loader";
import Show from "./ui/show";

const slidePlaceholder = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

  const handleOnChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    reset(e.target.name as "tel" | "email" | "msg");
    slidePlaceholder(e);
  };

  return (
    <section className="w-full grid">
      <article>{/* <HyperActions /> */}</article>
      <Form onSubmit={handleSubmit}>
        <HoneyPot />
        <Telephone onChange={handleOnChange}>
          <Show when={formStatus === "error" && errors.tel}>
            <TextError>{errors.tel}</TextError>
          </Show>
          <Show when={formStatus === "error" && errors.reachable && errors.tel}>
            <TextError>{errors.reachable}</TextError>
          </Show>
        </Telephone>
        <Email onChange={handleOnChange}>
          <Show when={formStatus === "error" && errors.email}>
            <TextError>{errors.email}</TextError>
          </Show>
          <Show when={formStatus === "error" && errors.reachable && errors.email}>
            <TextError>{errors.reachable}</TextError>
          </Show>
        </Email>
        <Textarea onChange={handleOnChange}>
          <Show when={formStatus === "error" && errors.msg}>
            <TextError>{errors.msg}</TextError>
          </Show>
        </Textarea>
        <div className="flex justify-end items-center input-group gap-5">
          {formStatus === "success" && (
            <p className="text-green-500 gap-3 inline-flex justify-center slide-from-bottom slide-from-active">
              <Check />
              Message bien reçu!
            </p>
          )}
          <Button type="submit" className="w-fit inline-flex items-center gap-3">
            {formStatus === "loading" ? (
              <div className="slide-from-top slide-from-active">Envoi en cours..</div>
            ) : (
              <div className="slide-from-bottom slide-from-active">Envoyer</div>
            )}
            {formStatus === "loading" && <Loader />}
          </Button>
        </div>
      </Form>
    </section>
  );
};

export default Contact;

const Form = ({ children, onSubmit }: { children: ReactNode; onSubmit: (e: FormEvent<HTMLFormElement>) => void }) => {
  return (
    <form onSubmit={onSubmit} className="flex flex-col items-center justify-center my-5 w-full">
      <h3 className="!text-belgoss-500 text-center text-lg mb-10">Pour en savoir plus ou me proposer une mission ?</h3>
      {children}
    </form>
  );
};

const HoneyPot = () => {
  return <input type="text" name="hp" tabIndex={-1} autoComplete="off" className="hidden" />;
};

type InputProps = {
  children: ReactNode;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  className?: string;
};

const Telephone = ({ children, onChange, className }: InputProps) => {
  return (
    <div className="input-group">
      <input id="tel" type="text" name="tel" className={cn("input", className)} onChange={onChange} />
      <label className="user-label font-semibold" htmlFor="tel">
        Téléphone
      </label>
      {children}
    </div>
  );
};

const Email = ({ children, onChange, className }: InputProps) => {
  return (
    <div className="input-group">
      <input id="email" type="text" name="email" className={cn("input", className)} onChange={onChange} />
      <label className="user-label font-semibold" htmlFor="email">
        Email
      </label>
      {children}
    </div>
  );
};

const Textarea = ({ children, onChange, className }: InputProps) => {
  return (
    <div className="input-group">
      <textarea name="msg" minLength={1} className={cn("input", className)} id="message" onChange={onChange} />
      <label className="user-label" htmlFor="message">
        Message
      </label>
      {children}
    </div>
  );
};

const TextError = ({ children }: { children: ReactNode }) => {
  return (
    <p
      className="text-red-500 text-sm font-semibold flex items-center gap-3 slide-from-bottom slide-from-active"
      role="alert"
      aria-live="assertive">
      <TriangleAlert />
      {children}
    </p>
  );
};

// const HyperActions = () => {
//   return (
//     <>
//       <div>
//         {/* Icon */}
//         <a href="">Email</a>
//       </div>
//       <div>
//         {/* Icon */}
//         <a href="">WhatsApp</a>
//       </div>
//     </>
//   );
// };
