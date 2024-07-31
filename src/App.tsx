import Experience from "@/components/Home/Cards/Experience";
import { ProjectCard } from "@/components/Home/Cards/Project";
import { useState, type HTMLAttributes } from "react";
import Dashboard from "./components/Dashboard/Dashboard";
import Contact from "./components/Home/Contact";
import HeadingTransition from "./components/Home/HeadingTransition";
import Hero from "./components/Home/Hero";
import Skills from "./components/Home/Skills";
import Login from "./components/Login/Login";
import Nav from "./components/Nav/Nav";
import { RisingStars } from "./components/RisingStars/RisingStars";
import { NavButton } from "./components/ui/button";
import Show from "./components/ui/show";
// import { education, projects, skills, xp } from "./data.json";
import { useData } from "./hooks/useData";
import useFilters from "./hooks/useFilter";
import useTitle from "./hooks/useTitle";
import { cn, uppercase } from "./lib/utils";
import { useRouter } from "./provider/routes-provider";
import { sendAgentData } from "./services";

// --

sendAgentData();
// --

const App = () => {
  const { projects, xp, education, skills } = useData();
  const [skillsHovered, setSkillsHovered] = useState<boolean[]>(
    Array(skills.data.length)
      .fill(false)
      .map((_, i) => i === 0)
  );

  const { filters, handleFilterChange, values } = useFilters();
  const { titles } = useTitle();
  const { route } = useRouter();

  return (
    <main className="relative min-w-full min-h-screen flex flex-col">
      <Nav />
      <Show when={route === "login"}>
        <Login />
      </Show>
      <Show when={route === "dashboard"}>
        <Dashboard />
      </Show>
      <RisingStars />
      <Show when={route === "index"}>
        <Hero id={titles.hero.selector} />

        <HeadingTransition
          h2="My hard skills"
          small="skills highlights"
          className="my-20 mt-44 [&_h2]:text-4xl sm:[&_h2]:text-5xl"
          id={titles.skills.selector}></HeadingTransition>
        <Skills.Root>
          <Skills.Grid setter={setSkillsHovered} skills={skills.data} />
          <Skills.Article skills={skills.data} skillHovered={skillsHovered} />
        </Skills.Root>

        <HeadingTransition h2="My experiences" small="my journey" className="my-20" id={titles.xp.selector} />
        <Flex className="mb-20">
          <NavSection>
            {values.xp.map((value) => {
              const handler = () => handleFilterChange("xp", value);
              return (
                <NavButton match={filters.xp === value} key={value} onClick={handler} ariaLabel={`discover ${value}`}>
                  {uppercase(value)}
                </NavButton>
              );
            })}
          </NavSection>
          <Experience experiences={[...xp, ...education]} filtered={filters.xp} />
        </Flex>

        <HeadingTransition h2="My projects" small="portfolio" className="mb-20 mt-44" id={titles.projects.selector} />
        <Flex>
          <NavSection>
            {values.projects.map((value) => {
              const handler = () => handleFilterChange("projects", value);
              return (
                <NavButton
                  match={filters.projects === value}
                  key={value}
                  onClick={handler}
                  ariaLabel={`discover ${value}`}>
                  {uppercase(value)}
                </NavButton>
              );
            })}
          </NavSection>
          <section className="flex place-content-center gap-2 mt-10 w-full">
            <ProjectCard projects={projects} filtered={filters.projects} />
          </section>
        </Flex>

        <HeadingTransition
          h2="Contact me"
          small="get in touch"
          className="my-44 h-[5vh]"
          id={titles.contact.selector}
        />
        <Flex className="mb-44">
          <Contact />
        </Flex>
        <RisingStars />
      </Show>
    </main>
  );
};

const Flex = ({
  children,
  className,
  ...rest
}: { children: React.ReactNode; className?: string } & HTMLAttributes<HTMLDivElement>) => (
  <div {...rest} className={cn("flex flex-col items-center gap-14 min-h-[50vh]", className)}>
    {children}
  </div>
);

const NavSection = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <section className={cn(`flex mb-5 justify-center flex-wrap gap-5 sm:gap-12`, className)}>{children}</section>
);

export default App;
