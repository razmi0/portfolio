// simple portfolio
import { forwardRef, useState } from "react";
import Hero from "./components/Hero";
import { ModeToggle } from "./components/ModeToggle";
import { projects, skills } from "./components/Skills/data.json" assert { type: "json" };
import Separator from "./components/ui/Separator";
import { Button } from "./components/ui/button";
import Icon from "./components/ui/icons/Icon";
import Slider from "./components/ui/tabs/Slider";
import Tabs from "./components/ui/tabs/Tabs";
import { cn } from "./lib/utils";

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

  console.log(activeSkills);

  const ListItem = forwardRef<HTMLLIElement, { children: React.ReactNode; className: string }>(
    ({ children, ...props }: { children: React.ReactNode }, ref) => (
      <li ref={ref} {...props}>
        <Icon name="chevron-right" size={20} />
        {children}
      </li>
    )
  );

  return (
    <main className="p-4 gap-36 container min-w-full h-full flex flex-col">
      <header className="flex items-center justify-between flex-row-reverse h-24 max-h-24 min-h-24">
        <ModeToggle />
      </header>
      <Hero />

      <div className="h-[75vh]">
        <Tabs.Root>
          <div className="h-3 w-3 bg-red-500">
            <button onClick={() => console.log("yes")}>
              <Icon name="tailwind"></Icon>
            </button>
          </div>
          <Tabs.Nav className="h-[10vh] gap-7 bg-blue-900 py-0 mb-5">
            <Slider className={"bg-blue-800"} />
            {/* <Tabs.Trigger value="hero" className="group">
              <h2 className="text-xl group-data-[selected=true]:text-blue-500">Hero</h2>
            </Tabs.Trigger> */}
            <Tabs.Trigger value="skills" className="group h-full active:ring-blue-800 active:scale-110">
              {/* data-[selected=true]:bg-blue-700 */}
              <h2 className="text-xl group-data-[selected=true]:text-blue-500 ">Skills</h2>
            </Tabs.Trigger>

            <Tabs.Trigger value="project" className="group h-full active:ring-blue-800 active:scale-110">
              {/* data-[selected=true]:bg-blue-700 */}
              <h2 className="text-xl group-data-[selected=true]:text-blue-500 ">Projects</h2>
            </Tabs.Trigger>
            <Tabs.Trigger value="contact" className="group h-full active:ring-blue-800 active:scale-110">
              {/* data-[selected=true]:bg-blue-700 */}
              <h2 className="text-xl group-data-[selected=true]:text-blue-500 ">Contact</h2>
            </Tabs.Trigger>
            <Tabs.Trigger value="contact" className="group h-full active:ring-blue-800 active:scale-110">
              {/* data-[selected=true]:bg-blue-700 */}
              <h2 className="text-xl group-data-[selected=true]:text-blue-500 ">Lab</h2>
            </Tabs.Trigger>
          </Tabs.Nav>
          <Tabs.Content value="skills" className="max-w-screen h-full">
            <div className="h-full flex mt-5">
              <section className="w-full h-fit flex justify-start">
                <div className="fol inline-flex flex-wrap gap-x-1 gap-y-2 ">
                  {skills.map((content, i) => {
                    return (
                      <>
                        <Button
                          key={content.id}
                          data-index={i}
                          variant="outline"
                          className="flex flex-wrap items-center flex-col"
                          onClick={skillClicked}>
                          <h4>{content.title}</h4>
                          <small className="text-neutral-300">{content.level}</small>
                        </Button>
                      </>
                    );
                  })}
                </div>
                <Separator dir="r" />
                <ul className="h-full grid place-content-center w-full">
                  {skills.map((content, i) => {
                    return (
                      <li
                        key={content.id}
                        className={cn(activeSkills[i].active ? "flex" : "hidden", "items-start flex-col h-full")}>
                        <h4 className="sr-only">{content.title}</h4>
                        <Icon name={content.title.toLowerCase()} size={30} />
                        <p className="mt-5 text-balance max-w-[50ch]">{content.content}</p>
                      </li>
                    );
                  })}
                </ul>
              </section>
            </div>
          </Tabs.Content>
          <Tabs.Content value="project" className="max-w-screen">
            <ul className="flex flex-wrap gap-x-3 gap-y-5">
              {projects.map((content) => {
                const sizes = {
                  v: ["75", "100", "125", "150", "175", "200"],
                  rand: function () {
                    return this.v[Math.floor(Math.random() * this.v.length)];
                  },
                };
                const s = [sizes.rand(), sizes.rand()];
                return (
                  <>
                    <ListItem key={content.id} className="flex flex-col gap-2 bg-blue-900">
                      <img
                        className="object-cover w-full max-h-[200px]"
                        src={`https://placehold.co/${s[1]}x${s[0]}`}
                        height={s[0]}
                        alt={content.title}
                      />
                      <h4 className="px-3">{content.title}</h4>
                      <p className="px-3 mb-2 max-w-[25ch]">Lorem ipsum dolor, sit amet</p>
                    </ListItem>
                  </>
                );
              })}
            </ul>
          </Tabs.Content>
          <Tabs.Content value="contact" className="max-w-screen"></Tabs.Content>
        </Tabs.Root>
      </div>
      <div className="ring-1 ring-blue-800 h-screen"></div>
    </main>
  );
};
export default App;
