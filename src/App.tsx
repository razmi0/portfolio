// simple portfolio
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "./components/ui/button";

const accordionContent = [
  {
    title: "HTML",
    content:
      "HTML is the standard markup language for creating Web pages. Even if HTML is not a programming language, it is the squeleton of a webpage. It is a well underrated language. A lot of tags have usefull attributes that can be used to make a website more accessible or are just unknown.",
  },
  {
    title: "CSS",
    content:
      "CSS is the language used to style the HTML elements. It is a powerfull language with a lot of properties. CSS in 2024 is lot more powerfull than before. A lot of Javascript can be replaced by CSS today.",
  },
  {
    title: "JavaScript",
    content:
      "JavaScript is a programming language that is used to make a website interactive. It is the only language that can be executed in the browser. It is a language that is evolving quickly. I personnally only use Typescript, a super set of Javascript for more robust code.",
  },
  {
    title: "React",
    content:
      "React is a library to build user interfaces. It is a powerfull library that is used by a lot of companies. It is a library that is easy to learn but hard to master. React is my main framework.",
  },
  {
    title: "Node.js",
    content:
      "Node.js is a runtime environment that allows to run Javascript outside of the browser. It is used to build server side applications. It is a powerfull tool that can be used to build a lot of things. The event loop is a powerfull principle that can be used to easily resolve in a better way some develpement problems.",
  },
  {
    title: "Express",
    content:
      "Express is a web application framework for Node.js. It is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. It is a powerfull tool that can be used to build a lot of things. Express is now a little bit outdated but still reliable. Other tools like Fastify or Hono are more recent.",
  },
  {
    title: "Tailwind",
    content: "Tailwind is my main CSS framework.",
  },
  {
    title: "Typescript",
    content:
      "Typescript is a super set of Javascript. It is a language that is more robust than Javascript. Building types makes team work easier. I always use Typescript in my project.",
  },
  {
    title: "SolidJs",
    content:
      "Solidjs is a declarative Javascript library for building user interfaces like React. It uses signal driven states instead of a virtual dom. SolidJs is a very performant way to build very interactive web application. If your application need a fast javascript framework, SolidJs is the way to go.",
  },
  {
    title: "PHP",
    content:
      "PHP is my first web language. It is a language that is easy to learn and that is very powerfull. 80% of websites on the web are powered by PHP. Laravel or Symfony are known fullstack frameworks that let you build very complex application with all the features you need.",
  },
  {
    title: "NextJs",
    content: "Next is my main React framework server side. I worked with Next in my last job.",
  },
  {
    title: "SQL",
    content: "Sql is mature and reliable. I build a lot of blogs with SQL and Doctrine ORM.",
  },
  {
    title: "Docker",
    content:
      "Docker is a french developer tool. Application are containerized in a coherent and independent manner allowing your application to works out of the box in all environement. In my last job, I used Docker with my boss to setup a local environement.",
  },
];

function App() {
  return (
    <main className="p-4 gap-3 container grid place-content-center w-full max-w-5xl">
      <div className="flex items-center justify-between w-full h-screen">
        <div className="text-left text-balance grid place-content-center gap-5">
          <div>
            <h2 className="text-xl">Hello there, </h2>
            <h1 className="text-3xl">I'm Thomas</h1>
            <h2 className="text-xl">I'm web developer</h2>
          </div>
          <p className="mt-2 max-w-[60ch]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit ratione eaque nemo non, voluptates cum minus
            corporis nam dolorum, ipsum aut tempore perspiciatis asperiores expedita nihil rerum molestiae sunt hic.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit ratione eaque nemo non, voluptates cum minus
            corporis nam dolorum, ipsum aut tempore perspiciatis asperiores expedita nihil rerum molestiae sunt hic.
          </p>
          <p className="mt-2 max-w-[60ch]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit ratione eaque nemo non, voluptates cum minus
            corporis nam dolorum, ipsum aut tempore perspiciatis asperiores expedita nihil rerum molestiae sunt hic.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit ratione eaque nemo non, voluptates cum minus
            corporis nam dolorum, ipsum aut tempore perspiciatis asperiores expedita nihil rerum molestiae sunt hic.
          </p>
          <div className="flex items-center justify-start gap-5">
            <Button variant="solid">Telecharger mon CV</Button>
            <Button variant="outline">En savoir plus</Button>
          </div>
        </div>
        <div className="grow"></div>
        <img src="/pp_2024.png" className="max-h-[200px] card" alt="profile picture" />
      </div>

      <div className="card bg-cyan-950/10 px-3 py-2">
        <h2 className="text-xl mb-2">About me</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit ratione eaque nemo non, voluptates cum minus
          corporis nam dolorum, ipsum aut tempore perspiciatis asperiores expedita nihil rerum molestiae sunt hic.
        </p>
      </div>

      <div className="card bg-cyan-950/10 px-3 py-2 max-w-[75vw]">
        <h2 className="text-xl mb-2 text-cyan-600">Skills</h2>
        <Accordion type="single" collapsible>
          {accordionContent.map((content) => (
            <AccordionItem key={content.title} value={content.title}>
              <AccordionTrigger>{content.title}</AccordionTrigger>
              <AccordionContent>{content.content}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      <div className="card bg-cyan-950/10 px-3 py-2 h-full w-full">
        <h2 className="text-xl mb-2">Project</h2>
        <ul>
          <li>A l'abord d'arbre</li>
          <li>PokeStable</li>
          <li>WalchCook</li>
          <li>Game of Life</li>
          <li>Data visualisation Spotify</li>
          <li>Tranlation Fun</li>
          <li>Smallworld helper</li>
          <li>RazCli</li>
          <li>Accessibility guidelines</li>
          <li>Dossier de reflexion MDS</li>
        </ul>
      </div>
    </main>
  );
}
export default App;
