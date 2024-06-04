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
    <div className="flex flex-col w-fit items-start justify-center card bg-bogoss-300/80 py-3 px-3 mx-1 [&>h4]:text-bogoss-200 gap-2 grow">
      <Icon name={title.toLowerCase()} size={25} />
      <h4 className="text-left w-full">{title}</h4>
      <p className="text-sm">{level}</p>
    </div>
  );
};

const App = () => {
  // const [activeSkills, setActiveSkills] = useState(new Array(skills.length).fill({ active: false }));
  // const skillClicked = (e: React.MouseEvent<HTMLButtonElement>) => {
  //   const index = e.currentTarget.getAttribute("data-index");
  //   setActiveSkills((prev) => {
  //     const temp = Array.from(prev).fill({ active: false });
  //     temp[parseInt(index as string)] = { active: !temp[parseInt(index as string)].active };
  //     return temp;
  //   });
  //   console.log(skills[parseInt(index as string)]);
  // };

  // console.log(activeSkills);

  return (
    <main className="p-4 container min-w-full h-full flex flex-col">
      <header className="flex items-center justify-between flex-row-reverse ">
        <ModeToggle />
      </header>
      <Hero />

      {/* PRESENTATION */}
      {/* PRESENTATION */}
      {/* PRESENTATION */}
      {/* PRESENTATION */}
      <HeadingTransition h2="A propos de moi" small="presentation" />
      <Presentation />
      {/* MES COMPETENCES */}
      {/* MES COMPETENCES */}
      {/* MES COMPETENCES */}
      {/* MES COMPETENCES */}
      {/* MES COMPETENCES */}
      {/* MES COMPETENCES */}
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
            <div className="flex">
              {skillsByType["front-end"].map((content) => {
                return <CardType key={content.id} title={content.title} level={content.level} />;
              })}
            </div>
          </Tabs.Content>
          <Tabs.Content value="back-end" className="max-w-screen">
            <div className="flex">
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

      {/* <Tabs.Content value="skills" className="max-w-screen h-full">
            <div className="h-full flex mt-5">
              <section className="w-full h-fit flex justify-start">
                <div className="inline-flex flex-wrap gap-x-1 gap-y-2 ">
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
          </Tabs.Content> */}

      {/* MES EXPERIENCES */}
      {/* MES EXPERIENCES */}
      {/* MES EXPERIENCES */}
      {/* MES EXPERIENCES */}
      {/* MES EXPERIENCES */}
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

{
  /* PROJETS */
}
{
  /* PROJETS */
}
{
  /* PROJETS */
}
{
  /* PROJETS */
}
{
  /* PROJETS */
}

{
  /* <Tabs.Content value="project" className="max-w-screen">
            <ul className="flex flex-wrap gap-x-3 gap-y-5">
              {projects.map((content) => {
                return (
                  <ListItem
                    key={content.id}
                    className="flex flex-col gap-2 bg-slate-500 overflow-hidden rounded-xl card"
                    alt={content.title}>
                    <h4 className="px-3">{content.title}</h4>
                    <p className="px-3 mb-2 max-w-[25ch]">Lorem ipsum dolor, sit amet</p>
                  </ListItem>
                );
              })}
            </ul>
          </Tabs.Content> */
}
{
  /* Contact */
}
{
  /* Contact */
}
{
  /* Contact */
}
{
  /* Contact */
}
{
  /* Contact */
}

{
  /* <Tabs.Content value="contact" className="max-w-screen">
            <form
              className="w-full px-10 py-5 gap-8 flex justify-center"
              onSubmit={(e) => {
                console.log(e);
                e.preventDefault();
              }}>
              <div className="w-[40%]">
                <div className="form__group field">
                  <input type="text" className="form__field" placeholder="Name" id="name" required />
                  <label htmlFor="name" className="form__label">
                    Name
                  </label>
                </div>
                <div className="form__group field">
                  <input type="email" className="form__field" placeholder="Email" id="email" required />
                  <label htmlFor="email" className="form__label">
                    Email
                  </label>
                </div>
              </div>
              <div className="flex flex-col w-full">
                <label htmlFor="message">Message</label>
                <textarea
                  name="message"
                  id="message"
                  placeholder="Message..."
                  className="h-32 ps-2 bg-slate-400 placeholder:text-white"></textarea>
              </div>
            </form>
          </Tabs.Content> */
}
