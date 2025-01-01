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

export async function simpleFetch<ResponseType = unknown>(
    url: RequestInfo,
    options: RequestInit = {},
    timeout?: number,
    onNotOk?: (response: Response) => void,
    onErr?: (error: unknown) => void
): Promise<ResponseType | void> {
    const buildOptions = () => {
        if (!timeout) return options;
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), timeout);
        controller.signal.addEventListener("abort", () => clearTimeout(id));
        return { ...options, signal: controller.signal };
    };

    try {
        const response = await fetch(url, buildOptions());
        if (!response.ok) {
            onNotOk?.(response);
            return;
        }
        return (await response.json()) as ResponseType;
    } catch (error: unknown) {
        onErr?.(error);
        return;
    }
}

const isIPhone = (userAgent: string) => {
    return /iPhone/.test(userAgent);
};

const isAndroid = (userAgent: string) => {
    return /Android/.test(userAgent);
};

const timeBetweenTwoRequests = 1000 * 60 * 60; // 1 hours
const isReadyForAgent = () => {
    const lastVisit = localStorage.getItem("last-visit");
    if (lastVisit) {
        const diff = Date.now() - Number(lastVisit);
        if (diff < timeBetweenTwoRequests) return false;
    }
    localStorage.setItem("last-visit", String(Date.now()));
    return true;
};

const noValue = "unknown";
const signalTimeout = 5000;
export const sendAgentData = async () => {
    if (!isReadyForAgent()) return;

    const platform = isIPhone(navigator.userAgent)
        ? "iPhone"
        : isAndroid(navigator.userAgent)
        ? "Android"
        : // @ts-expect-error lib.dom seems to not be complete
          navigator?.userAgentData?.platform ?? noValue;

    const fetchOptions = {
        method: "POST",
        body: JSON.stringify({ platform }),
        signal: AbortSignal.timeout(signalTimeout),
    };
    await simpleFetch<MinimalResponse>(apiPaths.agent, fetchOptions);
};
