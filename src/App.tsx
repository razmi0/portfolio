import Experience from "@/components/Home/Cards/Experience";
import Project from "@/components/Home/Cards/Project";
import { useState, type HTMLAttributes } from "react";
import Dashboard from "./components/Admin/Admin";
import Carousel from "./components/Home/Carousel";
import Contact from "./components/Home/Contact";
import HeadingTransition from "./components/Home/HeadingTransition";
import Hero from "./components/Home/Hero";
import Presentation from "./components/Home/Presentation";
import Skills from "./components/Home/Skills";
import Login from "./components/Login/Login";
import Nav from "./components/Nav/Nav";
import { RisingStars } from "./components/RisingStars/RisingStars";
import { NavButton } from "./components/ui/button";
import Show from "./components/ui/show";
import { formation, projects, skills, xp } from "./data.json";
import useAgent from "./hooks/useAgent";
import useFilters from "./hooks/useFilter";
import useTitle from "./hooks/useTitle";
import { cn, uppercase } from "./lib/utils";
import { useRouter } from "./provider/routes-provider";
import { useTheme } from "./provider/theme-provider";
const initStates = {
  skills: Array(skills.data.length)
    .fill(false)
    .map((_, i) => i === 0),
  projects: Array(projects.length)
    .fill(false)
    .map((_, i) => i === 0),
};

const App = () => {
  const [skillsHovered, setSkillsHovered] = useState<boolean[]>(initStates.skills);

  const { filters, handleFilterChange, values } = useFilters();
  const { titles } = useTitle();
  const { theme } = useTheme();
  const { route } = useRouter();

  useAgent();

  console.log("route", route);

  return (
    <main className="relative min-w-full min-h-screen flex flex-col" style={{ viewTransitionName: "none" }}>
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
          h2="A propos de moi"
          small="présentation"
          className="mb-20"
          id={titles.presentation.selector}
        />
        <Presentation />
        {/* SKILLS */}
        {/* SKILLS */}
        {/* SKILLS */}
        {/* SKILLS */}
        <HeadingTransition
          h2="Mes compétences"
          small="skills"
          className="my-20 mt-44 [&_h2]:text-4xl sm:[&_h2]:text-5xl"
          id={titles.skills.selector}></HeadingTransition>
        <Skills.Root>
          <Skills.Grid setter={setSkillsHovered} skills={skills.data} />
          <Skills.Article skills={skills.data} skillHovered={skillsHovered} />
        </Skills.Root>
        <RisingStars />

        {/* Experience */}
        {/* Experience */}
        {/* Experience */}
        {/* Experience */}

        <HeadingTransition h2="Mes expériences" small="mon parcours" className="my-20" id={titles.xp.selector} />
        <Flex>
          <NavSection>
            {values.xp.map((value) => {
              const handler = () => handleFilterChange("xp", value);
              return (
                <NavButton match={filters.xp === value} key={value} onClick={handler}>
                  {uppercase(value)}
                </NavButton>
              );
            })}
          </NavSection>
          <Experience.Root>
            {[...xp, ...formation].map((content, i) => {
              const is = `${content.type === "pro" ? "pro" : "formation"}-${content.id}` as const;
              const folder = theme === "dark" ? `dark/` : "";
              return (
                <Experience.Card
                  key={content.id}
                  className={filters.xp === "tous" || content.type.includes(filters.xp) ? "" : "hidden"}
                  src={`cards-bg/${folder}${i + 1}.webp`}
                  is={is}>
                  <Experience.Content content={content} />
                </Experience.Card>
              );
            })}
          </Experience.Root>
        </Flex>
        <RisingStars />

        {/* PROJECT */}
        {/* PROJECT */}
        {/* PROJECT */}
        {/* PROJECT */}
        {/* PROJECT */}

        <HeadingTransition h2="Mes projets" small="portfolio" className="mb-20 mt-44" id={titles.projects.selector} />

        <Flex>
          <NavSection>
            {values.projects.map((value) => {
              const handler = () => handleFilterChange("projects", value);
              return (
                <NavButton match={filters.projects === value} key={value} onClick={handler}>
                  {uppercase(value)}
                </NavButton>
              );
            })}
          </NavSection>
          <section className="flex place-content-center gap-2 mt-10 w-full">
            <Project.Grid>
              {projects.map((content, i) => {
                const hidden = filters.projects === "tous" || content.type.includes(filters.projects) ? "" : "hidden";
                return (
                  <Project.Card key={content.id} content={content} className={hidden + " p-0"}>
                    <Carousel content={content} key={i} />
                  </Project.Card>
                );
              })}
            </Project.Grid>
          </section>
        </Flex>
        <RisingStars />

        {/* CONTACT */}
        {/* CONTACT */}
        {/* CONTACT */}
        {/* CONTACT */}
        {/* CONTACT */}

        <HeadingTransition
          h2="Contactez-moi"
          small="me joindre"
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
  <section className={cn(`flex mb-5 justify-start flex-wrap gap-5 sm:gap-12`, className)}>{children}</section>
);

export default App;
