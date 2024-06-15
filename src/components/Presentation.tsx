import { ChefHat, PocketKnife, Rocket } from "lucide-react";
import type { HTMLAttributes, ReactNode } from "react";

const ListItem = ({ children }: { children: ReactNode }) => {
  return <li className="bg-gradient-to-t from-bogoss-500 to-bogoss-400 max-w-52">{children}</li>;
};

const Presentation = ({ ...rest }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <section
      {...rest}
      className="w-full text-center xl:text-left flex flex-col xl:flex-row gap-12 items-center justify-center">
      <img
        src="/pp_large.png"
        alt="profile picture"
        className="rounded-full hover:scale-95 transition-all brightness-90 contrast-125 aspect-square h-[300px] sm:h-[500px] mx-auto object-cover my-10"
      />
      <div className="space-y-7">
        <ul className="flex flex-wrap w-full justify-evenly xl:justify-start gap-5 [&>li]:bg-bogoss-400 [&>li]:text-bogoss-200 [&>li]:p-5 [&>li]:grow [&>li]:rounded-lg [&>li]:grid [&>li]:place-content-center [&_p]:font-semibold">
          <ListItem>
            <div className="grid place-content-center">
              <Rocket />
            </div>
            <p>Creatif</p>
          </ListItem>
          <ListItem>
            <div className="grid place-content-center">
              <PocketKnife />
            </div>
            <p>Polyvalent</p>
          </ListItem>
          <ListItem>
            <div className="grid place-content-center">
              <ChefHat />
            </div>
            <p>Autonome</p>
          </ListItem>
        </ul>
        <p className="text-balance text-bogoss-700 dark:text-bogoss-200 font-normal">
          Je suis Thomas, 30 ans, passionné par le développement web et la programmation en général. À la rentrée 2024,
          j'intègre le Bachelor développement web de MyDigitalSchool. En 2023, j'ai eu l'opportunité de rejoindre
          l'équipe de SlashBin pour une immersion de sept mois, où j'ai participé à deux projets novateurs. Sur un site
          de recherche de freelance, j'ai contribué en développant des fonctionnalités pour améliorer l'expérience
          utilisateur. Dans le cadre d'un projet de cryptominage, j'ai géré des tâches telles que l'internationalisation
          et l'implémentation des politiques de cookies.{" "}
        </p>
        <p className="text-balance text-bogoss-700 dark:text-bogoss-200 font-normal">
          Travailler en équipe avec les différents acteurs de la création d'un site est pour moi une perspective
          stimulante et enrichissante. Mon expérience pro chez SlashBin et mon esprit d’équipe m’ont enseigné que la
          collaboration est la clé du succès dans le développement web. Je suis à la recherche d'une alternance pour la
          rentrée 2024, avec l'enthousiasme et la détermination nécessaires pour relever de nouveaux défis et explorer
          de nouvelles perspectives.
        </p>
      </div>
    </section>
  );
};

export default Presentation;
