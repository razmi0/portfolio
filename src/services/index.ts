const baseUrl = import.meta.env.DEV ? "http://localhost:3000/api" : "https://portfolio-api-mu-five.vercel.app/api";

export const apiPaths = {
  login: `${baseUrl}/login`,
  auth: `${baseUrl}/auth`,
  agent: `${baseUrl}/agent`,
  contact: `${baseUrl}/contact`,
  base: baseUrl,
} as const;
