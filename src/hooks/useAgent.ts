import { UserAgentInfo } from "@/types/types";
import { useEffect, useState } from "react";

const apiPath = import.meta.env.DEV
  ? "http://localhost:3000/api/agent"
  : "https://portfolio-api-mu-five.vercel.app/api/agent";

const userAgentInit: UserAgentInfo = {
  userAgent: "",
  platform: "",
  locale: "",
  connection: "",
  hardware: "",
};

const sendAgentData = async (data: UserAgentInfo) => {
  try {
    const fetchOptions = {
      method: "POST",
      body: JSON.stringify(data),
    };
    const res = await fetch(apiPath, fetchOptions);
    if (res.ok) {
      console.log("agentdata sent successfully");
    }
  } catch (err) {
    console.error("agent error while sending data", err);
  }
};

const isValuableAgentData = (data: UserAgentInfo) => {
  let c = 0;
  for (const key in data)
    if (data[key as keyof UserAgentInfo].includes(noValue) || data[key as keyof UserAgentInfo] === "") c++;
  return c < 5;
};

const agent = window.navigator;
const noValue = "unknown";

const useAgent = () => {
  const [navInfo, setNavInfo] = useState<UserAgentInfo>(userAgentInit);

  const getNavigatorInfo = () => {
    setNavInfo((prev) => ({
      ...prev,
      userAgent: agent?.userAgent ?? noValue,
      //@ts-ignore
      platform: agent?.userAgentData?.platform ?? noValue,
      //@ts-ignore
      hardware: `th:-${agent?.hardwareConcurrency ?? noValue}-${agent?.deviceMemory ?? noValue}`,
      locale: agent?.language ?? noValue,
      //@ts-ignore
      connection: `${agent?.connection?.effectiveType ?? noValue}-${agent?.connection?.downlink ?? noValue}-MB/s`,
    }));
  };

  useEffect(() => getNavigatorInfo(), []);

  useEffect(() => {
    if (isValuableAgentData(navInfo)) sendAgentData(navInfo);
  }, [navInfo]);
};

export default useAgent;
