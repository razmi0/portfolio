import type { HandleIntersectionOptions, SetupObserverProps } from "@/types";
import { useEffect } from "react";

const titles = {
  hero: { selector: "hero", title: "Bienvenue", icon: "hero.ico" },
  presentation: { selector: "presentation", title: "Présentation", icon: "presentation.ico" },
  skills: { selector: "skills", title: "Compétences", icon: "skills.ico" },
  xp: { selector: "xp", title: "Experiences", icon: "xp.ico" },
  projects: { selector: "projects", title: "Projets", icon: "projects.ico" },
  contact: { selector: "contact", title: "Contact", icon: "contact.ico" },
};

const faviconTag = document.querySelector("link[rel='shortcut icon']") as HTMLLinkElement;

const handleIntersection = (entries: IntersectionObserverEntry[], options: HandleIntersectionOptions) => {
  const { onIntersect, onDisappear } = options;
  entries.forEach((entry) => (entry.isIntersecting ? onIntersect() : onDisappear()));
};

const voidCb = () => {};
const setupIntersectionObserver = (
  element: HTMLElement,
  { threshold = 0.9, onIntersect = voidCb, onDisappear = voidCb }: SetupObserverProps
) => {
  const options = { onIntersect, onDisappear };
  const observer = new IntersectionObserver((entry) => handleIntersection(entry, options), {
    threshold: threshold,
  });

  observer.observe(element);
};

const docTitle = document.querySelector("#title") as HTMLElement;

const useTitle = () => {
  useEffect(() => {
    Object.values(titles).forEach((title) => {
      const element = document.querySelector(`#${title.selector}`) as HTMLElement;
      if (!element) return;
      const options = {
        onIntersect: () => {
          docTitle.textContent = `ThomasDev -/- ${title.title}`;
          faviconTag.href = `/favicons/${title.icon}`;
        },
      };
      setupIntersectionObserver(element, options);
    });
  }, []);

  return { titles };
};

export default useTitle;
