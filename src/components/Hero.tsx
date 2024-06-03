import { Button } from "./ui/button";

const Hero = () => {
  return (
    <div className="flex items-center justify-between w-full h-[50vh]">
      <div className="text-left text-balance grid place-content-center gap-5">
        <div>
          <h2 className="text-xl">Hello there, </h2>
          <h1 className="text-3xl">I'm Thomas</h1>
          <h2 className="text-xl">I'm web developer</h2>
        </div>
        <p className="mt-2 max-w-[40ch]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit ratione eaque nemo non, voluptates cum minus
          corporis nam dolorum, ipsum aut tempore perspiciatis asperiores expedita nihil rerum molestiae sunt hic. Lorem
        </p>

        <div className="flex items-center justify-start gap-5">
          <Button variant="solid" className="dark:bg-blue-900 bg-blue-700 text-black dark:text-white">
            Telecharger mon CV
          </Button>
          <Button variant="outline" className=" ring-2 border-0 ring-blue-800 text-black dark:text-white">
            En savoir plus
          </Button>
        </div>
      </div>
      <div className="grow"></div>
      <img src="/pp_2024.png" className="max-h-[200px] card" alt="profile picture" />
    </div>
  );
};

export default Hero;
