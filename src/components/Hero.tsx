import { Button } from "./ui/button";

const Hero = () => {
  return (
    <div className="flex items-center justify-between w-full h-screen">
      <div className="text-left text-balance grid place-content-center gap-5">
        <div>
          <h2 className="text-xl">Hello there, </h2>
          <h1 className="text-3xl">I'm Thomas</h1>
          <h2 className="text-xl">I'm web developer</h2>
        </div>
        <p className="mt-2 max-w-[60ch]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit ratione eaque nemo non, voluptates cum minus
          corporis nam dolorum, ipsum aut tempore perspiciatis asperiores expedita nihil rerum molestiae sunt hic. Lorem
          ipsum dolor sit amet consectetur adipisicing elit. Odit ratione eaque nemo non, voluptates cum minus corporis
          nam dolorum, ipsum aut tempore perspiciatis asperiores expedita nihil rerum molestiae sunt hic.
        </p>
        <p className="mt-2 max-w-[60ch]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit ratione eaque nemo non, voluptates cum minus
          corporis nam dolorum, ipsum aut tempore perspiciatis asperiores expedita nihil rerum molestiae sunt hic. Lorem
          ipsum dolor sit amet consectetur adipisicing elit. Odit ratione eaque nemo non, voluptates cum minus corporis
          nam dolorum, ipsum aut tempore perspiciatis asperiores expedita nihil rerum molestiae sunt hic.
        </p>
        <div className="flex items-center justify-start gap-5">
          <Button variant="solid" className="dark:bg-cyan-900 bg-cyan-700">
            Telecharger mon CV
          </Button>
          <Button variant="outline">En savoir plus</Button>
        </div>
      </div>
      <div className="grow"></div>
      <img src="/pp_2024.png" className="max-h-[200px] card" alt="profile picture" />
    </div>
  );
};

export default Hero;
