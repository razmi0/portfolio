import { SimpleFetchError } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function uppercase(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

class HTTPError extends Error {
  public response: Response;
  constructor(response: Response) {
    super(`HTTP Error: ${response.status} ${response.statusText}`);
    this.response = response;
  }

  getResponse = () => {
    return this.response;
  };

  format = () => {
    if (this.response.status === 401) {
      return "Unauthorized";
    } else if (this.response.status === 403) {
      return "Forbidden";
    }
    return "An error occurred";
  };
}
// export type SimpleFetchError = {
//   error: true;
//   message: string;
// };
export async function simpleFetch<ResponseType = any>(
  url: RequestInfo,
  options: RequestInit = {}
): Promise<ResponseType | SimpleFetchError> {
  const result = await fetch(url, options);
  if (!result.ok) {
    const error = new HTTPError(result);
    console.error("simpleFetch : ", new HTTPError(result));
    return { error: true, message: error.format() };
  }
  return (await result.json()) as ResponseType;
}

export const b64EncodeUnicode = (str: string) => btoa(encodeURIComponent(str));
