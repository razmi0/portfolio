import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function uppercase(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const b64EncodeUnicode = (str: string) => btoa(encodeURIComponent(str));

export const withViewTransition = (cb: () => void) => {
  const cbWithTransition = () => {
    if (!document.startViewTransition) {
      cb();
      return;
    }
    document.startViewTransition(cb);
  };

  return [cbWithTransition];
};
