// simple portfolio
import HeadingTransition from "./components/HeadingTransition";
import Hero from "./components/Hero";
import { ModeToggle } from "./components/ModeToggle";
import Presentation from "./components/Presentation";
import { projects, skills } from "./components/Skills/data.json" assert { type: "json" };
import Icon from "./components/ui/icons/Icon";
import Slider from "./components/ui/tabs/Slider";
import Tabs from "./components/ui/tabs/Tabs";

const groupedByType = <T extends { type: string[] }>(data: T[]) => {
  const grouped = {} as Record<string, T[]>;
  data.forEach((item) => {
    console.log(item);
    item.type.forEach((type) => {
      if (!grouped[type]) {
        grouped[type] = [];
      }
      grouped[type].push(item);
    });
  });
  return grouped;
};

const skillsByType = groupedByType(skills);
const projectsByType = groupedByType(projects);

const CardType = ({ title, level }: { title: string; level: string }) => {
  return (
    <div className="flex flex-col w-fit items-start justify-center rounded-lg bg-bogoss-300/80 py-3 px-3 mx-1 [&>h4]:text-bogoss-200 gap-2 grow">
      <Icon name={title.toLowerCase()} size={25} />
      <h4 className="text-left w-full">{title}</h4>
      <p className="text-sm">{level}</p>
    </div>
  );
};

const App = () => {
  return (
    <main className="p-4 container min-w-full h-full flex flex-col">
      <header className="flex items-center justify-between flex-row-reverse ">
        <ModeToggle />
      </header>
      <Hero />
      <HeadingTransition h2="A propos de moi" small="presentation" />
      <Presentation />
      <HeadingTransition h2="Mes compétences" small="skills" className="my-20" />
      <div>
        <Tabs.Root>
          <Tabs.Nav className="h-[10vh] gap-7 py-0 mb-5 justify-evenly">
            <Slider className={"bg-bogoss-600 rounded-md"} />
            <Tabs.Trigger value="front-end" className="group h-full active:ring-bogoss-700 active:scale-110">
              <h2 className="text-xl group-data-[selected=true]:text-bogoss-400 ">Front-end</h2>
            </Tabs.Trigger>
            <Tabs.Trigger value="back-end" className="group h-full active:ring-bogoss-700 active:scale-110">
              <h2 className="text-xl group-data-[selected=true]:text-bogoss-400 ">Back-end</h2>
            </Tabs.Trigger>
            <Tabs.Trigger value="soft" className="group h-full active:ring-bogoss-700 active:scale-110">
              <h2 className="text-xl group-data-[selected=true]:text-bogoss-400 ">Soft</h2>
            </Tabs.Trigger>
          </Tabs.Nav>
          <Tabs.Content value="front-end" className="max-w-screen h-full">
            <div className="flex my-20">
              {skillsByType["front-end"].map((content) => {
                return <CardType key={content.id} title={content.title} level={content.level} />;
              })}
            </div>
          </Tabs.Content>
          <Tabs.Content value="back-end" className="max-w-screen">
            <div className="flex my-20">
              {skillsByType["back-end"].map((content) => {
                return <CardType key={content.id} title={content.title} level={content.level} />;
              })}
            </div>
          </Tabs.Content>
          <Tabs.Content value="soft" className="max-w-screen">
            Soft
          </Tabs.Content>
        </Tabs.Root>
      </div>

      <HeadingTransition h2="Mes expériences" small="mon parcours" className="my-20" />

      <div>
        <Tabs.Root>
          <Tabs.Nav className="h-[10vh] gap-7 bg-slate-900 py-0 mb-5 justify-evenly">
            <Slider className={"bg-slate-800 rounded-md"} />
            <Tabs.Trigger value="tous" className="group h-full active:ring-slate-800 active:scale-110">
              <h2 className="text-xl group-data-[selected=true]:text-slate-500 ">Tous</h2>
            </Tabs.Trigger>
            <Tabs.Trigger value="pro" className="group h-full active:ring-slate-800 active:scale-110">
              <h2 className="text-xl group-data-[selected=true]:text-slate-500 ">Pro</h2>
            </Tabs.Trigger>
            <Tabs.Trigger value="formation" className="group h-full active:ring-slate-800 active:scale-110">
              <h2 className="text-xl group-data-[selected=true]:text-slate-500 ">Formation</h2>
            </Tabs.Trigger>
          </Tabs.Nav>
          <Tabs.Content value="tous">tous</Tabs.Content>
          <Tabs.Content value="pro">pro</Tabs.Content>
          <Tabs.Content value="formation">formation</Tabs.Content>
        </Tabs.Root>

        <HeadingTransition h2="Mes projets" small="portfolio" className="my-20" />

        <Tabs.Root>
          <Tabs.Nav className="h-[10vh] gap-7 bg-slate-900 py-0 mb-5 justify-evenly">
            <Slider className={"bg-slate-800 rounded-md"} />
            <Tabs.Trigger value="tous" className="group h-full active:ring-slate-800 active:scale-110">
              <h2 className="text-xl group-data-[selected=true]:text-slate-500 ">Tous</h2>
            </Tabs.Trigger>
            <Tabs.Trigger value="web" className="group h-full active:ring-slate-800 active:scale-110">
              <h2 className="text-xl group-data-[selected=true]:text-slate-500 ">Web</h2>
            </Tabs.Trigger>
            <Tabs.Trigger value="outil" className="group h-full active:ring-slate-800 active:scale-110">
              <h2 className="text-xl group-data-[selected=true]:text-slate-500 ">Outils</h2>
            </Tabs.Trigger>
          </Tabs.Nav>
          <Tabs.Content value="tous">tous</Tabs.Content>
          <Tabs.Content value="pro">pro</Tabs.Content>
          <Tabs.Content value="outil">outils</Tabs.Content>
        </Tabs.Root>
      </div>
      <div className="h-screen">Contactez-moi</div>
    </main>
  );
};
export default App;
