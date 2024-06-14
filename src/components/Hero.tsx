import { GithubIcon, LinkedinIcon } from "lucide-react";
import VerticalText from "./VerticalText";
import { Button } from "./ui/button";

const Hero = () => {
  return (
    <div className="flex flex-col items-center justify-evenly h-[95vh] w-full">
      <div className="text-center [&>h2]:text-bogoss-700 [&>h2]:dark:text-bogoss-200  ">
        <h2 className="text-lg ">Hello there, </h2>
        <h1 className="text-3xl !text-belgoss-500">I'm Thomas</h1>
        <h2 className="text-lg mb-4">I'm web developer</h2>
        <div className="flex items-center justify-start gap-4">
          <Button variant="solid" className="whitespace-nowrap">
            Telecharger mon CV
          </Button>
          <Button variant="outline" className="whitespace-nowrap">
            En savoir plus
          </Button>
        </div>
      </div>
      <div className="relative w-full grid place-content-center">
        <div className="absolute -left-8 sm:left-0 bottom-0 space-y-3 text-bogoss-400">
          <a
            href="https://www.linkedin.com/in/dev-web-cuesta-thomas/"
            aria-label="link to Thomas linkedin to get in touch with him">
            <LinkedinIcon />
          </a>
          <a
            href="https://github.com/razmi0"
            aria-label="link to Thomas github to discover his programming skills and projects">
            <GithubIcon />
          </a>
        </div>
        <img
          src="/pp_large.png"
          className="h-[250px] sm:h-[300px] brightness-95 contrast-125 aspect-square object-cover"
          alt="hero picture of Thomas portfolio looking at the right side and smiling"
        />
        <VerticalText text="Présentation" className="-right-14 sm:right-0" />
      </div>
    </div>
  );
};

export default Hero;
