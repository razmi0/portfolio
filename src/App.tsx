import Cards from "./components/Cards";
import HeadingTransition from "./components/HeadingTransition";
import Hero from "./components/Hero";
import { ModeToggle } from "./components/ModeToggle";
import Presentation from "./components/Presentation";
import { projects, skills, xp } from "./components/Skills/data.json" assert { type: "json" };
import { Button } from "./components/ui/button";
import useFilters from "./hooks/useFilter";

const App = () => {
  const { filters, handleFilterChange, values } = useFilters();

  return (
    <main className="p-4 container min-w-full h-full flex flex-col" style={{ viewTransitionName: "none" }}>
      <header className="flex items-center justify-between flex-row-reverse">
        <ModeToggle />
      </header>
      <Hero />
      <HeadingTransition h2="A propos de moi" small="presentation" />
      <Presentation />

      <HeadingTransition h2="Mes compétences" small="skills" className="my-20" />

      <Flex>
        <ButtonSection>
          {values.skills.map((value) => {
            return (
              <Button variant={"outline"} key={value} onClick={() => handleFilterChange("skills", value)}>
                <h2 className="text-xl">{value}</h2>
              </Button>
            );
          })}
        </ButtonSection>
        <Cards.Container>
          {skills.map((content) => {
            const hidden = filters.skills === "tous" || content.type.includes(filters.skills) ? "" : "hidden";
            return <Cards.Skill key={content.id} content={content} className={hidden} />;
          })}
        </Cards.Container>
      </Flex>

      <HeadingTransition h2="Mes expériences" small="mon parcours" className="my-20" />

      <Flex>
        <ButtonSection>
          {values.xp.map((value) => {
            return (
              <Button variant={"outline"} key={value} onClick={() => handleFilterChange("xp", value)}>
                <h2 className="text-xl">{value}</h2>
              </Button>
            );
          })}
        </ButtonSection>
        <Cards.Container>
          {xp.map((content) => {
            const hidden = filters.xp === "tous" || content.type.includes(filters.xp) ? "" : "hidden";
            return <Cards.Xp key={content.id} content={content} className={hidden} />;
          })}
        </Cards.Container>
      </Flex>

      <HeadingTransition h2="Mes projets" small="portfolio" className="my-20" />

      <Flex>
        <ButtonSection>
          {values.projects.map((value) => {
            return (
              <Button variant={"outline"} onClick={() => handleFilterChange("projects", value)}>
                <h2 className="text-xl">{value}</h2>
              </Button>
            );
          })}
        </ButtonSection>
        <Cards.Container>
          {projects.map((content) => {
            const hidden = filters.projects === "tous" || content.type.includes(filters.projects) ? "" : "hidden";
            return <Cards.Project key={content.id} content={content} className={hidden} />;
          })}
        </Cards.Container>
      </Flex>
      <div className="h-screen">Contactez-moi</div>
    </main>
  );
};

const ButtonSection = ({ children }: { children: React.ReactNode }) => (
  <section className="flex flex-col mb-5 justify-between">{children}</section>
);

const Flex = ({ children }: { children: React.ReactNode }) => <div className="flex">{children}</div>;

export default App;
