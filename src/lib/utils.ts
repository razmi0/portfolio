import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function uppercase(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

class HTTPError extends Error {
  constructor(response: Response) {
    super(`HTTP Error: ${response.status} ${response.statusText}`);
  }
}
// export type SimpleFetchError = {
//   error: true;
//   message: string;
// };
export async function simpleFetch<ResponseType = any>(
  url: RequestInfo,
  options: RequestInit = {}
): Promise<ResponseType> {
  const result = await fetch(url, options);
  if (!result.ok) {
    throw new HTTPError(result);
  }
  return (await result.json()) as ResponseType;
}

export const b64EncodeUnicode = (str: string) => btoa(encodeURIComponent(str));
