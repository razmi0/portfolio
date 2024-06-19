import { ProjectType } from "@/types/types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useState } from "react";

const Carousel = ({ content }: { content: ProjectType }) => {
  const [activeImage, setActiveImage] = useState<number>(0);

  const imgSize = content.src?.length || 0;

  const handleNextImage = useCallback(() => {
    const newActiveImage = (activeImage + 1) % imgSize;
    setActiveImage(newActiveImage);
  }, [activeImage, imgSize]);

  const handlePrevImage = useCallback(() => {
    const newActiveImage = (activeImage - 1 + imgSize) % imgSize;
    setActiveImage(newActiveImage);
  }, [activeImage, imgSize]);

  return (
    <div className={"flex flex-col items-center justify-center gap-5 w-full"} key={content.id}>
      <figure className="relative z-0 flex flex-col gap-3 justify-between [&>h3]:text-belgoss-500">
        <h3 className="text-center text-2xl">{content.title}</h3>
        {"src" in content &&
          (content.src as string[]).map((path, i) => {
            const hidden = i === activeImage ? "" : "hidden";
            return (
              <div className={`relative grid place-content-center -z-10 ${hidden}`} key={path}>
                <img src={path} alt={content.title} key={path} className="object-cover place-self-center" />
                <div className="absolute bottom-0 right-0 translate-y-full text-sm inline-flex items-center gap-2">
                  <p className="font-semibold">{activeImage}</p>
                  <p>/ {imgSize}</p>
                </div>
              </div>
            );
          })}
      </figure>

      <ButtonsCarousel prev={handlePrevImage} next={handleNextImage} />
    </div>
  );
};

const ButtonsCarousel = ({ prev, next }: { prev: () => void; next: () => void }) => {
  return (
    <div>
      <button onClick={prev}>
        <ChevronLeft size={38} className="hover:text-belgoss-500" />
      </button>
      <button onClick={next}>
        <ChevronRight size={38} className="hover:text-belgoss-500" />
      </button>
    </div>
  );
};

export default Carousel;
