import { useState } from "react";
import Cards from "./components/Cards";
import HeadingTransition from "./components/HeadingTransition";
import Hero from "./components/Hero";
import { ModeToggle } from "./components/ModeToggle";
import Presentation from "./components/Presentation";
import Skills from "./components/Skills/Skills";
import { formation, projects, skills, xp } from "./components/Skills/data.json";
import { Button } from "./components/ui/button";
import useFilters from "./hooks/useFilter";
import { SkillType } from "./types/types";

const [front, back] = skills.data.reduce(
  (acc, cur) => {
    if (!cur.type.some((type) => skills.types.includes(type))) {
      acc[2].push(cur);
    } else {
      if (cur.type.includes("front-end")) acc[0].push(cur);
      if (cur.type.includes("back-end")) acc[1].push(cur);
    }
    return acc;
  },
  [[], [], []] as SkillType[][]
);

const App = () => {
  const [skillsHovered, setSkillsHovered] = useState<boolean[]>(Array(skills.data.length).fill(false));
  const { filters, handleFilterChange, values } = useFilters();

  return (
    <main className="p-4 container min-w-full h-full flex flex-col" style={{ viewTransitionName: "none" }}>
      <header className="flex items-center justify-between flex-row-reverse">
        <ModeToggle />
      </header>
      <Hero />
      <HeadingTransition h2="A propos de moi" small="presentation" />
      <Presentation />

      <HeadingTransition h2="Mes compétences" small="skills" className="my-20">
        <p className="w-full text-center text-bogoss-200">
          Je m'accomode de toutes les technologies, voici les technologies qui me sont les plus familières
        </p>
      </HeadingTransition>
      <Skills.Root>
        <Skills.TechGrid setter={setSkillsHovered} skills={skills.data} />
        <Skills.TechArticle skills={skills.data} skillHovered={skillsHovered} />
      </Skills.Root>

      <HeadingTransition h2="Mes expériences" small="mon parcours" className="my-20" />

      <Flex>
        <ButtonSection>
          {values.xp.map((value) => {
            return (
              <Button
                className="whitespace-nowrap"
                variant={"outline"}
                key={value}
                onClick={() => handleFilterChange("xp", value)}>
                <span className="text-xl">{value}</span>
              </Button>
            );
          })}
        </ButtonSection>
        <Cards.Grid>
          {[...xp, ...formation].map((content) => {
            const hidden = filters.xp === "tous" || content.type.includes(filters.xp) ? "" : "hidden";
            return <Cards.Xp key={content.id} content={content} className={hidden} />;
          })}
        </Cards.Grid>
      </Flex>

      <HeadingTransition h2="Mes projets" small="portfolio" className="my-20" />

      <Flex>
        <ButtonSection>
          {values.projects.map((value) => {
            return (
              <Button
                className="whitespace-nowrap"
                variant={"outline"}
                onClick={() => handleFilterChange("projects", value)}>
                <span className="text-xl">{value}</span>
              </Button>
            );
          })}
        </ButtonSection>
        <Cards.Grid>
          {projects.map((content) => {
            const hidden = filters.projects === "tous" || content.type.includes(filters.projects) ? "" : "hidden";
            return <Cards.Project key={content.id} content={content} className={hidden} />;
          })}
        </Cards.Grid>
      </Flex>
      <div className="h-screen">Contactez-moi</div>
    </main>
  );
};

const ButtonSection = ({ children }: { children: React.ReactNode }) => (
  <section className="flex mb-5 justify-start gap-12">{children}</section>
);

const Flex = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col items-center justify-evenly min-h-[50vh]">{children}</div>
);

export default App;
