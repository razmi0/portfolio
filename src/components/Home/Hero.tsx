import { GithubIcon, LinkedinIcon } from "lucide-react";
import type { HTMLAttributes } from "react";
import VerticalText from "../ui/VerticalText";
import { Button } from "../ui/button";

const Hero = ({ ...rest }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div {...rest} className="flex flex-col items-center justify-evenly h-[95vh] w-full">
      <div className="text-center [&>h2]:text-bogoss-700 [&>h2]:dark:text-bogoss-200  ">
        <h2 className="text-lg ">Hello there,</h2>
        <h1 className="text-3xl !text-belgoss-500">I'm Thomas</h1>
        <h2 className="text-lg mb-4">I'm web developer</h2>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a href="/CUESTA_THOMAS_cv.pdf" download={"/CUESTA_THOMAS_cv.pdf"}>
            <Button variant="solid" className="whitespace-nowrap" ariaLabel="download my curriculum vitae">
              Download my CV
            </Button>
          </a>
          <a href="#projects">
            <Button
              variant="outline"
              className="whitespace-nowrap"
              ariaLabel="go directly to my projects to discover what is important">
              Learn more..
            </Button>
          </a>
        </div>
      </div>
      <div className="relative w-full grid place-content-center">
        <div className="absolute left-0 bottom-0 text-belgoss-500">
          <a
            href="https://www.linkedin.com/in/dev-web-cuesta-thomas/"
            aria-label="link to Thomas linkedin to get in touch with him">
            <LinkedinIcon className="mb-3" />
          </a>
          <a
            href="https://github.com/razmi0"
            aria-label="link to Thomas github to discover his programming skills and projects">
            <GithubIcon />
          </a>
        </div>
        <img
          src="/pp_sm.webp"
          className="h-[250px] sm:h-[300px] brightness-95 contrast-125 aspect-square object-cover"
          alt="hero picture of Thomas portfolio looking at the right side and smiling"
          loading="eager"
        />
        <VerticalText text="Presentation" className="hidden sm:block" />
      </div>
    </div>
  );
};

export default Hero;
