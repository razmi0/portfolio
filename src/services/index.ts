import type { MinimalResponse } from "@/types";
const baseUrl = import.meta.env.DEV ? "http://localhost:3000/api" : "https://portfolio-api-mu-five.vercel.app/api";

export const apiPaths = {
  login: `${baseUrl}/login`,
  auth: `${baseUrl}/auth`,
  agent: `${baseUrl}/agent`,
  contact: `${baseUrl}/contact`,
  data: {
    errors: `${baseUrl}/auth/errors`,
    msgs: `${baseUrl}/auth/msgs`,
    users: `${baseUrl}/auth/users`,
    agents: `${baseUrl}/auth/agents`,
  },
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

const isIPhone = (userAgent: string) => {
  return /iPhone/.test(userAgent);
};

const isAndroid = (userAgent: string) => {
  return /Android/.test(userAgent);
};

export const sendAgentData = async () => {
  const noValue = "unknown";
  const platform = isIPhone(navigator.userAgent)
    ? "iPhone"
    : isAndroid(navigator.userAgent)
    ? "Android"
    : // @ts-ignore
      navigator?.userAgentData?.platform ?? noValue;

  const fetchOptions = {
    method: "POST",
    body: JSON.stringify({ platform }),
    signal: AbortSignal.timeout(5000),
  };
  await simpleFetch<MinimalResponse>(apiPaths.agent, fetchOptions);
};
