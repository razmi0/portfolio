import CardGrid from "@/components/Cards/CardGrid";
import CardProject from "@/components/Cards/CardProject";
import CardXp from "@/components/Cards/CardXp";
import { useState, type HTMLAttributes } from "react";
import Contact from "./components/Contact";
import HeadingTransition from "./components/HeadingTransition";
import Hero from "./components/Hero";
import { ModeToggle } from "./components/ModeToggle";
import Presentation from "./components/Presentation";
import Skills from "./components/Skills/Skills";
import { formation, projects, skills, xp } from "./components/Skills/data.json";
import { Button } from "./components/ui/button";
import useFilters from "./hooks/useFilter";
import useTitle from "./hooks/useTitle";
import { cn } from "./lib/utils";

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
  const [projectsSelected, setProjectSelected] = useState<boolean[]>(initStates.projects);
  const { filters, handleFilterChange, values } = useFilters();
  const { titles } = useTitle();

  return (
    <main className="relative min-w-full h-full flex flex-col" style={{ viewTransitionName: "none" }}>
      <header className="flex items-center justify-between flex-row-reverse absolute top-0 left-0 w-full mt-5">
        <ModeToggle />
      </header>
      <Hero id={titles.hero.selector} />
      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}

      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
      <HeadingTransition h2="A propos de moi" small="présentation" className="mb-20" />
      <Presentation id={titles.presentation.selector} />
      {/* SKILLS */}
      {/* SKILLS */}
      {/* SKILLS */}
      {/* SKILLS */}
      <HeadingTransition h2="Mes compétences" small="skills" className="my-20">
        <p className="w-full text-center text-bogoss-200">
          Je m'accomode de toutes les technologies, voici les technologies qui me sont les plus familières
        </p>
      </HeadingTransition>
      <Skills.Root id={titles.skills.selector}>
        <Skills.TechGrid setter={setSkillsHovered} skills={skills.data} />
        <Skills.TechArticle skills={skills.data} skillHovered={skillsHovered} />
      </Skills.Root>

      {/* XP FORMATION */}
      {/* XP FORMATION */}
      {/* XP FORMATION */}
      {/* XP FORMATION */}

      <HeadingTransition h2="Mes expériences" small="mon parcours" className="my-20" />

      <Flex id={titles.xp.selector}>
        <ButtonSection>
          {values.xp.map((value) => {
            return (
              <Button
                className={cn("whitespace-nowrap", filters.xp === value ? "text-belgoss-500 ring-belgoss-500" : "")}
                variant={"outline"}
                key={value}
                onClick={() => handleFilterChange("xp", value)}>
                <span className="text-xl">{value}</span>
              </Button>
            );
          })}
        </ButtonSection>
        <CardGrid>
          {[...xp, ...formation].map((content, i) => {
            return (
              <CardXp
                index={i}
                key={content.id}
                content={content}
                className={filters.xp === "tous" || content.type.includes(filters.xp) ? "" : "hidden"}
              />
            );
          })}
        </CardGrid>
      </Flex>

      {/* PROJECT */}
      {/* PROJECT */}
      {/* PROJECT */}
      {/* PROJECT */}
      {/* PROJECT */}

      <HeadingTransition h2="Mes projets" small="portfolio" className="my-20" />

      <Flex id={titles.projects.selector}>
        <ButtonSection>
          {values.projects.map((value) => {
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
          })}
        </ButtonSection>
        <section className="flex gap-2 mt-10 w-full h-[580px]">
          <article className="w-7/12">
            <CardProject.Grid>
              {projects.map((content, i) => {
                const hidden = filters.projects === "tous" || content.type.includes(filters.projects) ? "" : "hidden";
                return (
                  <CardProject.Card
                    key={content.id}
                    content={content}
                    index={i}
                    selected={projectsSelected[i]}
                    setSelected={setProjectSelected}
                    className={hidden + " p-0"}
                  />
                );
              })}
            </CardProject.Grid>
          </article>
          <article>
            {projects.map((content, i) => {
              return <CardProject.Carousel content={content} key={i} selected={projectsSelected[i]} />;
            })}
          </article>
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

const ButtonSection = ({ children }: { children: React.ReactNode }) => (
  <section className="flex mb-5 justify-start gap-12">{children}</section>
);

const Flex = ({
  children,
  className,
  ...rest
}: { children: React.ReactNode; className?: string } & HTMLAttributes<HTMLDivElement>) => (
  <div {...rest} className={cn("flex flex-col items-center gap-14 min-h-[50vh]", className)}>
    {children}
  </div>
);

export default App;
