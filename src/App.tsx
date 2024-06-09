// simple portfolio
import { useState } from "react";
import Cards from "./components/Cards";
import HeadingTransition from "./components/HeadingTransition";
import Hero from "./components/Hero";
import { ModeToggle } from "./components/ModeToggle";
import Presentation from "./components/Presentation";
import { projects, skills, xp } from "./components/Skills/data.json" assert { type: "json" };
import { Button } from "./components/ui/button";
// import Tabs from "./components/ui/tabs/Tabs";

// const groupedByType = <T extends { type: string[] }>(data: T[]) => {
//   const grouped = {} as Record<string, T[]>;
//   data.forEach((item) => {
//     console.log(item);
//     item.type.forEach((type) => {
//       if (!grouped[type]) {
//         grouped[type] = [];
//       }
//       grouped[type].push(item);
//     });
//   });
//   return grouped;
// };

const skillsTabs = ["tous", "front-end", "back-end", "soft"];
const experiencesTabs = ["tous", "pro", "formation"];
const projectsTabs = ["tous", "web", "outil", "documentation"];

// const skillsByType = groupedByType(skills);

const App = () => {
  const [activeSkills, setActiveSkills] = useState("tous");
  const [activeXp, setActiveXp] = useState("tous");
  const [activeProjects, setActiveProjects] = useState("tous");

  const handleActiveSkills = (value: string) => {
    setActiveSkills(value);
  };

  const handleActiveXp = (value: string) => {
    setActiveXp(value);
  };

  const handleActiveProjects = (value: string) => {
    setActiveProjects(value);
  };

  return (
    <main className="p-4 container min-w-full h-full flex flex-col">
      <header className="flex items-center justify-between flex-row-reverse">
        <ModeToggle />
      </header>
      <Hero />
      <HeadingTransition h2="A propos de moi" small="presentation" />
      <Presentation />
      <HeadingTransition h2="Mes compétences" small="skills" className="my-20" />
      <div>
        <section className="flex h-[10vh]   mb-5 justify-between">
          {skillsTabs.map((value) => {
            return (
              <Button
                variant={activeSkills === value ? "solid" : "outline"}
                key={value}
                onClick={() => handleActiveSkills(value)}>
                <h2 className="text-xl group-data-[selected=true]:text-bogoss-400 ">{value}</h2>
              </Button>
            );
          })}
        </section>
        {skillsTabs.map((value) => {
          return (
            <div key={value} className="flex my-20">
              {skills.map((content) => {
                return (
                  <Cards.Skill
                    key={content.id}
                    content={content}
                    className={activeSkills === "tous" || content.type.includes(activeSkills) ? "" : "hidden"}
                  />
                );
              })}
            </div>
          );
        })}
      </div>

      <HeadingTransition h2="Mes expériences" small="mon parcours" className="my-20" />

      <div>
        <section className="flex h-[10vh]   mb-5 justify-evenly">
          {experiencesTabs.map((value) => {
            return (
              <Button
                variant={activeXp === value ? "solid" : "outline"}
                key={value}
                onClick={() => handleActiveXp(value)}>
                <h2 className="text-xl group-data-[selected=true]:text-slate-500 ">{value}</h2>
              </Button>
            );
          })}
        </section>
        {experiencesTabs.map((value) => {
          return (
            <div key={value} className="flex my-20">
              {xp.map((content) => {
                return (
                  <Cards.Skill
                    key={content.id}
                    content={content}
                    className={activeXp === "tous" || content.type.includes(activeXp) ? "" : "hidden"}
                  />
                );
              })}
            </div>
          );
        })}
      </div>

      <HeadingTransition h2="Mes projets" small="portfolio" className="my-20" />

      <div>
        <section className="flex h-[10vh]   mb-5 justify-evenly">
          {projectsTabs.map((value) => {
            return (
              <Button
                variant={activeProjects === value ? "solid" : "outline"}
                onClick={() => handleActiveProjects(value)}>
                <h2 className="text-xl group-data-[selected=true]:text-slate-500 ">{value}</h2>
              </Button>
            );
          })}
        </section>
        {projectsTabs.map((value) => {
          return (
            <div key={value}>
              <div className="flex my-20">
                {projects.map((content) => {
                  return (
                    <Cards.Project
                      key={content.id}
                      content={content}
                      className={activeProjects === "tous" || content.type.includes(activeProjects) ? "" : "hidden"}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      <div className="h-screen">Contactez-moi</div>
    </main>
  );
};
export default App;
