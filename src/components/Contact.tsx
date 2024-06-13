import { Button } from "./ui/button";

const Contact = () => {
  return (
    <section className="w-full grid grid-cols-2">
      <article>{/* <HyperActions /> */}</article>
      <form className="flex flex-col items-center justify-center gap-10 my-5 w-full [&>*:not(button)]:w-[75%]">
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
  console.log(e.currentTarget.value.length > 0);
  e.currentTarget.value.length > 0 ? e.currentTarget.classList.add("slide") : e.currentTarget.classList.remove("slide");
};

const HoneyPot = () => {
  return <input type="text" name="hp" tabIndex={-1} autoComplete="off" className="hidden" />;
};

const Telephone = () => {
  return (
    <div className="input-group max-w-[50%]">
      <input id="tel" type="text" name="text" className="input" onChange={slidePlaceholder} />
      <label className="user-label font-semibold" htmlFor="tel">
        Téléphone
      </label>
    </div>
  );
};

const Email = () => {
  return (
    <div className="input-group max-w-[50%]">
      <input id="email" type="text" name="text" className="input" onChange={slidePlaceholder} />
      <label className="user-label font-semibold" htmlFor="email">
        Email
      </label>
    </div>
  );
};

const Textarea = () => {
  return (
    <div className="input-group max-w-[50%]">
      <textarea minLength={1} className="input" id="message" onChange={slidePlaceholder} />
      <label className="user-label" htmlFor="message">
        Message
      </label>
    </div>
  );
};

const HyperActions = () => {
  return (
    <>
      <div>
        {/* Icon */}
        <a href="">Email</a>
      </div>
      <div>
        {/* Icon */}
        <a href="">WhatsApp</a>
      </div>
    </>
  );
};
