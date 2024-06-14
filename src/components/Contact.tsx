import { cn } from "@/lib/utils";
import { Check, TriangleAlert } from "lucide-react";
import { ChangeEvent, FormEvent, ReactNode, useState } from "react";
import { Button } from "./ui/button";
import Loader from "./ui/loader";

const apiPath = import.meta.env.DEV
  ? "http://localhost:3000/api/contact"
  : "https://portfolio-api-mu-five.vercel.app/api/contact";

type ContactFormType = {
  tel: string;
  email: string;
  msg: string;
  hp?: string;
};

const regexp = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  tel: /^\d{10}$/,
};

const hasLength = (str: string) => str.length > 0;
const isValidEmail = (email: string) => hasLength(email) && regexp.email.test(email);
const isValidTel = (tel: string) => hasLength(tel) && regexp.tel.test(tel);
const userIsReachable = (tel: string, email: string) => {
  if (isValidEmail(email) || isValidTel(tel)) return true;
};

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

const Contact = () => {
  const [errors, setErrors] = useState<ErrorsType>(errorsInit);
  const [formStatus, setFormStatus] = useState<FormStatusType>("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("loading");
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries()) as ContactFormType;

    if (data.hp) {
      window.location.href = "https://www.google.com";
      return;
    }

    const reachability = userIsReachable(data.tel, data.email);
    console.log("reachability", reachability);

    const newErrors = {
      email: !isValidEmail(data.email) && "Email invalide",
      tel: !isValidTel(data.tel) && "Telephone invalide",
      msg: !hasLength(data.msg) && "Message requis",
      reachable: !reachability && "Au moins un moyen de contact valide est requis",
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((err) => typeof err === "string")) {
      setFormStatus("error");
      return;
    }

    try {
      console.log("sending");
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

  const handleOnChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (formStatus !== "idle") {
      setErrors({ ...errors, [e.target.name]: false });
      setFormStatus("idle");
    }
    slidePlaceholder(e);
  };

  return (
    <section className="w-full grid grid-cols-2">
      <article>{/* <HyperActions /> */}</article>
      <Form onSubmit={handleSubmit}>
        <HoneyPot />
        <Telephone onChange={handleOnChange}>
          {formStatus === "error" && errors.tel && <TextError>{errors.tel}</TextError>}
          {formStatus === "error" && errors.reachable && errors.tel && <TextError>{errors.reachable}</TextError>}
        </Telephone>
        <Email onChange={handleOnChange}>
          {formStatus === "error" && errors.email && <TextError>{errors.email}</TextError>}
          {formStatus === "error" && errors.reachable && errors.email && <TextError>{errors.reachable}</TextError>}
        </Email>
        <Textarea onChange={handleOnChange}>
          {formStatus === "error" && errors.msg && <TextError>{errors.msg}</TextError>}
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

const slidePlaceholder = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  e.currentTarget.value.length > 0 ? e.currentTarget.classList.add("slide") : e.currentTarget.classList.remove("slide");
};

const Form = ({ children, onSubmit }: { children: ReactNode; onSubmit: (e: FormEvent<HTMLFormElement>) => void }) => {
  return (
    <form onSubmit={onSubmit} className="flex flex-col items-center justify-center gap-10 my-5 w-full">
      <h3 className="!text-belgoss-500 text-center">Pour en savoir plus ou me proposer une mission ?</h3>
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
    <p className="text-red-500 text-sm font-semibold flex items-center gap-3" role="alert" aria-live="assertive">
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
