const baseUrl = import.meta.env.DEV ? "http://localhost:3000/api" : "https://portfolio-api-mu-five.vercel.app/api";

export const apiPaths = {
  login: `${baseUrl}/login`,
  auth: `${baseUrl}/auth`,
  agent: `${baseUrl}/agent`,
  contact: `${baseUrl}/contact`,
  base: baseUrl,
} as const;

class HTTPError extends Error {
  constructor(response: Response) {
    super(`HTTP Error: ${response.status} ${response.statusText}`);
  }
}

export async function simpleFetch<ResponseType = any>(
  url: RequestInfo,
  options: RequestInit = {},
  timeout?: number
): Promise<ResponseType> {
  const buildOptions = () => {
    if (!timeout) return options;
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    controller.signal.addEventListener("abort", () => clearTimeout(id));
    return { ...options, signal: controller.signal };
  };

  const result = await fetch(url, buildOptions());
  if (!result.ok) {
    throw new HTTPError(result);
  }
  return (await result.json()) as ResponseType;
}
