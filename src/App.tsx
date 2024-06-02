// simple portfolio
import { useState } from "react";
import Hero from "./components/Hero";
import { ModeToggle } from "./components/ModeToggle";
import { skills } from "./components/Skills/data.json" assert { type: "json" };
import { Button } from "./components/ui/button";
import Icon from "./components/ui/icons/Icon";
import Slider from "./components/ui/tabs/Slider";
import Tabs from "./components/ui/tabs/Tabs";
import { cn } from "./lib/utils";

const sliderStyle = "bg-cyan-800 rounded-md ring-1 ring-inset ring-neutral-900/80 border border-neutral-100/20";

const App = () => {
  const [activeSkills, setActiveSkills] = useState(new Array(skills.length).fill({ active: false }));
  const skillClicked = (e: React.MouseEvent<HTMLButtonElement>) => {
    const index = e.currentTarget.getAttribute("data-index");
    setActiveSkills((prev) => {
      const temp = Array.from(prev).fill({ active: false });
      temp[parseInt(index as string)] = { active: !temp[parseInt(index as string)].active };
      return temp;
    });
    console.log(skills[parseInt(index as string)]);
  };

  return (
    <main className="p-4 gap-3 container min-w-full h-full max-h-screen flex flex-col">
      <header className="flex items-center justify-between flex-row-reverse h-[10%]">
        <ModeToggle />
      </header>
      <Tabs.Root>
        <Tabs.Nav className="h-[10%] absolute">
          <Slider className={sliderStyle} />
          <Tabs.Trigger value="hero" className="group">
            <h2 className="text-xl group-data-[selected=true]:text-cyan-500">Hero</h2>
          </Tabs.Trigger>
          <Tabs.Trigger value="skills" className="group">
            <h2 className="text-xl group-data-[selected=true]:text-cyan-500">Skills</h2>
          </Tabs.Trigger>
          <Tabs.Trigger value="project" className="group">
            <h2 className="text-xl group-data-[selected=true]:text-cyan-500">Projects</h2>
          </Tabs.Trigger>
        </Tabs.Nav>

        <Tabs.Content value="hero" className="max-w-screen">
          <Hero />
        </Tabs.Content>

        <Tabs.Content value="skills" className="max-w-screen h-full">
          <section className="w-full h-full grid place-content-center grid-cols-2">
            <div className="container inline-flex flex-wrap gap-x-1 gap-y-2">
              {skills.map((content, i) => {
                return (
                  <Button
                    key={content.id}
                    data-index={i}
                    variant="outline"
                    className="flex gap-5 flex-wrap items-center"
                    onClick={skillClicked}>
                    <h4>{content.title}</h4>
                    <small>{content.level}</small>
                  </Button>
                );
              })}
            </div>
            <div>
              <ul className="h-full">
                {skills.map((content, i) => {
                  return (
                    <li
                      key={content.id}
                      className={cn(activeSkills[i].active ? "flex" : "hidden", "justify-start flex-col h-full")}>
                      <h4 className="sr-only">{content.title}</h4>
                      <Icon name={content.title.toLowerCase()} size={30} />
                      <p className="mt-5">{content.content}</p>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>
        </Tabs.Content>
        <Tabs.Content value="project" className="max-w-screen">
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
        </Tabs.Content>
      </Tabs.Root>
    </main>
  );
};
export default App;
