import { useState } from "react";
import { Button } from "./ui/button";

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
const userIsReachable = (tel: string, email: string) => isValidEmail(email) || isValidTel(tel);

const Contact = () => {
  const [errors, setErrors] = useState<{
    email: string | boolean;
    tel: string | boolean;
    msg: string | boolean;
    reachable: string | boolean;
  }>({
    email: false,
    tel: false,
    msg: false,
    reachable: false,
  });

  console.log(errors);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries()) as ContactFormType;

    if (data.hp) {
      window.location.href = "https://www.google.com";
      return;
    }

    setErrors({
      email: !isValidEmail(data.email) && "Email invalide ",
      tel: !isValidTel(data.tel) && "Telephone invalide ",
      msg: !hasLength(data.msg) && "Message invalide ",
      reachable: !userIsReachable(data.tel, data.email) && "Au moins un moyen de contact valide est requis",
    });

    if (Object.values(errors).some((e) => e)) return;

    try {
      const fetchOptions = {
        method: "POST",
        body: JSON.stringify({ email: data.email, tel: data.tel, msg: data.msg }),
      };
      const res = await fetch("https://portfolio-api-mu-five.vercel.app/api/contact", fetchOptions);
      const json = await res.json();
      console.log(json);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="w-full grid grid-cols-2">
      <article>{/* <HyperActions /> */}</article>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center gap-10 my-5 w-full [&>*:not(button)]:w-[75%]">
        <h3 className="!text-bogoss-300 text-center">Pour en savoir plus ou me proposer une mission ?</h3>
        <HoneyPot />
        <Telephone />
        <Email />
        <Textarea />
        <Button type="submit" className="w-fit">
          Envoyer
        </Button>
      </form>
    </section>
  );
};

export default Contact;

const slidePlaceholder = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  e.currentTarget.value.length > 0 ? e.currentTarget.classList.add("slide") : e.currentTarget.classList.remove("slide");
};

const HoneyPot = () => {
  return <input type="text" name="hp" tabIndex={-1} autoComplete="off" className="hidden" />;
};

const Telephone = () => {
  return (
    <div className="input-group max-w-[50%]">
      <input id="tel" type="text" name="tel" className="input" onChange={slidePlaceholder} />
      <label className="user-label font-semibold" htmlFor="tel">
        Téléphone
      </label>
    </div>
  );
};

const Email = () => {
  return (
    <div className="input-group max-w-[50%]">
      <input id="email" type="text" name="email" className="input" onChange={slidePlaceholder} />
      <label className="user-label font-semibold" htmlFor="email">
        Email
      </label>
    </div>
  );
};

const Textarea = () => {
  return (
    <div className="input-group max-w-[50%]">
      <textarea name="msg" minLength={1} className="input" id="message" onChange={slidePlaceholder} />
      <label className="user-label" htmlFor="message">
        Message
      </label>
    </div>
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
