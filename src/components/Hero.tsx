import { GithubIcon, LinkedinIcon } from "lucide-react";
import VerticalText from "./VerticalText";
import { Button } from "./ui/button";

const Hero = () => {
  return (
    <div className="flex flex-col items-center justify-evenly h-screen w-full">
      <div className="text-center [&>h2]:text-bogoss-700 [&>h2]:dark:text-bogoss-200  ">
        <h2 className="text-lg ">Hello there, </h2>
        <h1 className="text-3xl !text-belgoss-500">I'm Thomas</h1>
        <h2 className="text-lg mb-4">I'm web developer</h2>
        <div className="flex items-center justify-start gap-4">
          <Button variant="solid">Telecharger mon CV</Button>
          <Button variant="outline">En savoir plus</Button>
        </div>
      </div>
      <div className="relative w-full grid place-content-center">
        <div className="absolute left-0 bottom-0 space-y-3 text-bogoss-400">
          <LinkedinIcon />
          <GithubIcon />
        </div>
        <img src="/pp_large.png" className="h-[300px]  brightness-90 contrast-125 " alt="profile picture" />
        <VerticalText text="Présentation" />
      </div>
    </div>
  );
};

export default Hero;
