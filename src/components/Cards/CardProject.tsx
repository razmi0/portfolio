import type { ProjectType } from "@/types/types";
import CardWrapper from "./CardWrapper";

const CardProject = ({ content, className }: { content: ProjectType; className?: string }) => {
  const { title, type, href, id /*src*/ } = content;

  const handle = () => {
    console.log("HI", id);
  };

  return (
    <CardWrapper className={className} is={`project-${id}`} onClick={handle} as={"button"}>
      {/* <figure>
          <img src={src[3]} alt={title} className="w-full h-40 object-contain rounded-xl" />
        </figure> */}
      <h4 className="text-center w-full">{title}</h4>
      <p className="text-sm">{type}</p>
      <a href={href} className="text-sm hover:underline hover:text-bogoss-200 text-bogoss-200">
        Voir le projet
      </a>
    </CardWrapper>
  );
};

export default CardProject;
