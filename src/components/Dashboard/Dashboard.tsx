import { useAuth } from "@/hooks/useAuth";
import { uppercase } from "@/lib/utils";
import { apiPaths, simpleFetch } from "@/services";
import type { ContentType, DataType } from "@/types";
import { ReactNode, useEffect, useState } from "react";
import Tab from "../ui/tabs";
import RefreshButton from "./RefreshButton";
import Table from "./Table";
const dataType = ["errors", "msgs", "users", "agents"] as readonly DataType[];
const timeout = 7000;
const expireIn = 1000 * 60 * 60; // 1 hour

const buildPayload = (type: DataType, payload: any) => {
  console.log("buildPayload : ", type, payload);
  return JSON.stringify({
    lastRefresh: Date.now(),
    exp: Date.now() + expireIn,
    data: payload,
  });
};

const isObsolete = (type: DataType) => {
  const payload = JSON.parse(localStorage.getItem(type) as string);
  if (!payload) return true;
  const isOld = Date.now() - payload.exp > expireIn;
  if (isOld) {
    console.log("isObsolete : ", type, isOld);
  }
  return isOld;
};

const Dashboard = () => {
  const [opens, setOpens] = useState<Record<DataType, boolean>>({
    errors: false,
    msgs: false,
    users: false,
    agents: false,
  });
  const [data, setData] = useState<ContentType>({
    errors: [],
    msgs: [],
    users: [],
    agents: [],
  });
  const { authOptions } = useAuth();

  const toggleTab = (type: DataType) => {
    setOpens((prev) => {
      const newOpens = { ...prev };
      for (const key in newOpens) newOpens[key as DataType] = key === type ? !newOpens[key] : false;
      return newOpens;
    });
  };

  const handleData = async (type: DataType) => {
    console.log("handleData : ", type);
    if (!isObsolete(type)) return;
    const data = await simpleFetch(apiPaths.data[type], authOptions, timeout);
    if (!data) {
      console.error("No data found for ", type, " in handleData");
      return;
    }
    localStorage.setItem(type, buildPayload(type, data));
    setData((prev) => ({ ...prev, [type]: data }));
  };

  const manualRefresh = async () => {
    const openType = Object.keys(opens).find((key) => opens[key as DataType]) as DataType;
    if (!openType) return;
    localStorage.removeItem(openType);
    handleData(openType);
  };

  const onMount = () => {
    for (const type of dataType) {
      console.log("onMount : ", type);
      const data = localStorage.getItem(type);
      if (!data) continue;
      const payload = JSON.parse(data);
      if (isObsolete(type)) {
        setData((prev) => ({ ...prev, [type]: payload.data }));
        continue;
      }
      console.log("onMount : ", type, " is obsolete");
    }
  };

  // const handleTab = async (type: DataType) => {
  //   if (!opens[type]) await handleData(type);
  //   toggleTab(type);
  // };

  useEffect(onMount, []);

  return (
    <>
      <div className="w-full grid place-content-center mt-12">
        <DashboardHeader>
          {dataType.map((type) => (
            <Tab
              onClick={() => {
                if (!opens[type]) handleData(type);
                toggleTab(type);
              }}
              label={uppercase(type)}
              open={opens[type]}
              key={type}
            />
          ))}
          <RefreshButton refresh={manualRefresh} />
        </DashboardHeader>
      </div>
      {dataType.map((type) => (
        <Table show={opens[type] && data[type][0]} data={data[type]} key={type} />
      ))}
    </>
  );
};

const DashboardHeader = ({ children }: { children: ReactNode }) => (
  <section className="flex items-center gap-3 px-2 py-1 rounded-lg bg-bogoss-600 size-fit">{children}</section>
);

export default Dashboard;
