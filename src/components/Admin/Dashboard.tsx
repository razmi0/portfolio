import { useAuth } from "@/hooks/useAuth";
import { uppercase } from "@/lib/utils";
import { apiPaths, simpleFetch } from "@/services";
import type { ContentType, DataType } from "@/types";
import { useState } from "react";
import Show from "../ui/show";
import Tab from "../ui/tabs";

const dataType = ["errors", "msgs", "users", "agents"] as readonly DataType[];
const timeout = 7000;
const expireIn = 1000 * 60;

const buildPayload = (type: DataType, payload: any) => {
  console.log(type, payload);
  return JSON.stringify({
    lastRefresh: Date.now(),
    exp: Date.now() + expireIn,
    data: payload,
  });
};

const isObsolete = (type: DataType) => {
  const payload = JSON.parse(localStorage.getItem(type) as string);
  if (!payload) return true;
  return Date.now() - payload.lastRefresh > expireIn;
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
    if (!isObsolete(type)) return;
    const data = await simpleFetch(apiPaths.data[type], authOptions, timeout);
    localStorage.setItem(type, buildPayload(type, data));
    setData((prev) => ({ ...prev, [type]: data }));
  };

  return (
    <>
      <div className="w-full grid place-content-center mt-12">
        <section className="flex items-center gap-3 px-2 py-1 rounded-lg bg-bogoss-600 size-fit">
          {dataType.map((value) => {
            return (
              <Tab
                onClick={() => {
                  handleData(value);
                  toggleTab(value);
                }}
                label={uppercase(value)}
                open={opens[value]}
                key={value}
              />
            );
          })}
        </section>
      </div>
      <section>
        <Show when={opens.errors}>
          {data.errors.map((error) => {
            const cols = Object.keys(error);
            const values = Object.values(error);

            console.log(cols, values);

            return <></>;
          })}
        </Show>
      </section>
    </>
  );
};

export default Dashboard;

// {data[value as keyof ContentType].map((content, i) => {
//   if (!content) return null;
//   return (
//     <div key={content.ID + i}>
//       {Object.entries(content).map(([key, value]) => (
//         <p key={key}>
//         {key}: {value}
//         </p>
//       ))}
//     </div>
//   );
// })}
