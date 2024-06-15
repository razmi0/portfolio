import Project from "@/components/Cards/Project";
import Experience from "@/components/Cards/Experience";
import { useState, type HTMLAttributes } from "react";
import Carousel from "./components/Carousel";
import Contact from "./components/Contact";
import HeadingTransition from "./components/HeadingTransition";
import Hero from "./components/Hero";
import { ModeToggle } from "./components/ModeToggle";
import Presentation from "./components/Presentation";
import Skills from "./components/Skills/Skills";
import { formation, projects, skills, xp } from "./components/Skills/data.json";
import { useTheme } from "./components/theme-provider";
import { NavButton } from "./components/ui/button";
import useFilters from "./hooks/useFilter";
import useTitle from "./hooks/useTitle";
import { cn, uppercase } from "./lib/utils";
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

  return (
    <main className="relative min-w-full h-full flex flex-col" style={{ viewTransitionName: "none" }}>
      <header className="flex items-center justify-between flex-row-reverse absolute top-0 left-0 w-full mt-5">
        <ModeToggle />
      </header>
      <Hero id={titles.hero.selector} />

      <HeadingTransition h2="A propos de moi" small="présentation" className="mb-20" />
      <Presentation id={titles.presentation.selector} />
      {/* SKILLS */}
      {/* SKILLS */}
      {/* SKILLS */}
      {/* SKILLS */}
      <HeadingTransition
        h2="Mes compétences"
        small="skills"
        className="my-20 [&_h2]:text-4xl sm:[&_h2]:text-5xl"></HeadingTransition>
      <Skills.Root id={titles.skills.selector}>
        <Skills.Grid setter={setSkillsHovered} skills={skills.data} />
        <Skills.Article skills={skills.data} skillHovered={skillsHovered} />
      </Skills.Root>

      {/* Experience */}
      {/* Experience */}
      {/* Experience */}
      {/* Experience */}

      <HeadingTransition h2="Mes expériences" small="mon parcours" className="my-20" />
      <Flex id={titles.xp.selector}>
        <ButtonSection>
          {values.xp.map((value) => {
            const handler = () => handleFilterChange("xp", value);
            return (
              <NavButton match={filters.xp === value} key={value} onClick={handler}>
                {uppercase(value)}
              </NavButton>
            );
          })}
        </ButtonSection>
        <Experience.Root>
          {[...xp, ...formation].map((content, i) => {
            const is = `${content.type === "pro" ? "pro" : "formation"}-${content.id}` as const;
            const folder = theme === "dark" ? `dark/` : "";
            return (
              <Experience.Card
                key={content.id}
                className={filters.xp === "tous" || content.type.includes(filters.xp) ? "" : "hidden"}
                src={`cards-bg/${folder}${i + 1}.png`}
                is={is}>
                <Experience.Content content={content} />
              </Experience.Card>
            );
          })}
        </Experience.Root>
      </Flex>

      {/* PROJECT */}
      {/* PROJECT */}
      {/* PROJECT */}
      {/* PROJECT */}
      {/* PROJECT */}

      <HeadingTransition h2="Mes projets" small="portfolio" className="my-20" />

      <Flex id={titles.projects.selector}>
        <ButtonSection className={"flex-wrap gap-5 sm:gap-12"}>
          {/* {values.projects.map((value) => {
            return (
              <Button
                key={value}
                className={cn(
                  "whitespace-nowrap ",
                  filters.projects === value ? "text-belgoss-500 ring-belgoss-500" : ""
                )}
                variant={"outline"}
                onClick={() => handleFilterChange("projects", value)}>
                <span className="text-xl">{value}</span>
              </Button>
            );
          })} */}
          {values.projects.map((value) => {
            const handler = () => handleFilterChange("projects", value);
            return (
              <NavButton match={filters.projects === value} key={value} onClick={handler}>
                {uppercase(value)}
              </NavButton>
            );
          })}
        </ButtonSection>
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

      {/* CONTACT */}
      {/* CONTACT */}
      {/* CONTACT */}
      {/* CONTACT */}
      {/* CONTACT */}

      <HeadingTransition h2="Contactez-moi" small="me joindre" className="my-44" />

      <Flex className="mb-44" id={titles.contact.selector}>
        <Contact />
      </Flex>
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

const ButtonSection = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <section className={cn(`flex mb-5 justify-start gap-12`, className)}>{children}</section>
);
export default App;
