import CardGrid from "@/components/Cards/CardGrid";
import CardProject from "@/components/Cards/CardProject";
import CardXp from "@/components/Cards/CardXp";
import { useState } from "react";
import HeadingTransition from "./components/HeadingTransition";
import Hero from "./components/Hero";
import { ModeToggle } from "./components/ModeToggle";
import Presentation from "./components/Presentation";
import Skills from "./components/Skills/Skills";
import { formation, projects, skills, xp } from "./components/Skills/data.json";
import { Button } from "./components/ui/button";
import useFilters from "./hooks/useFilter";
import { cn } from "./lib/utils";

// const initImgs = projects.map((project) => {
//   return { id: project.id, src: project.src };
// });

const App = () => {
  const [skillsHovered, setSkillsHovered] = useState<boolean[]>(Array(skills.data.length).fill(false));
  const [projectsSelected, setProjectSelected] = useState<boolean[]>(Array(projects.length).fill(false));
  const { filters, handleFilterChange, values } = useFilters();

  return (
    <main className="p-4 container min-w-full h-full flex flex-col" style={{ viewTransitionName: "none" }}>
      <header className="flex items-center justify-between flex-row-reverse">
        <ModeToggle />
      </header>
      <Hero />
      <HeadingTransition h2="A propos de moi" small="presentation" />
      <Presentation />
      {/* SKILLS */}
      {/* SKILLS */}
      {/* SKILLS */}
      {/* SKILLS */}
      <HeadingTransition h2="Mes compétences" small="skills" className="my-20">
        <p className="w-full text-center text-bogoss-200">
          Je m'accomode de toutes les technologies, voici les technologies qui me sont les plus familières
        </p>
      </HeadingTransition>
      <Skills.Root>
        <Skills.TechGrid setter={setSkillsHovered} skills={skills.data} />
        <Skills.TechArticle skills={skills.data} skillHovered={skillsHovered} />
      </Skills.Root>

      {/* XP FORMATION */}
      {/* XP FORMATION */}
      {/* XP FORMATION */}
      {/* XP FORMATION */}

      <HeadingTransition h2="Mes expériences" small="mon parcours" className="my-20" />

      <Flex>
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

      <Flex>
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
        <section className="grid grid-cols-2 gap-2 mt-10 w-full [&>article]:size-full h-[580px]">
          <article>
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
      <div className="h-screen">Contactez-moi</div>
    </main>
  );
};

const ButtonSection = ({ children }: { children: React.ReactNode }) => (
  <section className="flex mb-5 justify-start gap-12">{children}</section>
);

const Flex = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col items-center gap-14 min-h-[50vh]">{children}</div>
);

export default App;
