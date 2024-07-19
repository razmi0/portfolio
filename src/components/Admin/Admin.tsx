import { useAuth } from "@/hooks/useAuth";
import { uppercase } from "@/lib/utils";
import { apiPaths, simpleFetch } from "@/services";
import type { AgentType, ContentType, PostType, UserType, ValidationErrorType, DataType } from "@/types";
import { useState } from "react";
import Tab from "../ui/tabs";

const dataType = ["errors", "msgs", "users", "agents"] as readonly DataType[];

const timeout = 7000;

type DashboardProps = {
  data: ContentType;
  setData: React.Dispatch<React.SetStateAction<ContentType>>;
};

const Dashboard = ({ data, setData }: DashboardProps) => {
  const [opens, setOpens] = useState<Record<DataType, boolean>>({
    errors: false,
    msgs: false,
    users: false,
    agents: false,
  });

  const toggleTab = (type: DataType) => {
    setOpens((prev) => {
      const newOpens = { ...prev };
      for (const key in newOpens) newOpens[key as DataType] = key === type ? !newOpens[key] : false;
      return newOpens;
    });
  };

  const { authOptions } = useAuth();

  const handleData = async (type: DataType) => {
    console.log(`[${type}] : `);
    switch (type) {
      case "errors":
        const errors = (await simpleFetch(apiPaths.data.errors, authOptions, timeout)) as ValidationErrorType[];
        setData((prev) => ({ ...prev, errors }));
        console.log("errors", errors);
        break;

      case "msgs":
        const msgs = (await simpleFetch(apiPaths.data.msgs, authOptions, timeout)) as PostType[];
        setData((prev) => ({ ...prev, msgs }));
        console.log("msgs", msgs);
        break;

      case "users":
        const users = (await simpleFetch(apiPaths.data.users, authOptions, timeout)) as UserType[];
        setData((prev) => ({ ...prev, users }));
        console.log("users", users);
        break;

      case "agents":
        const agents = (await simpleFetch(apiPaths.data.agents, authOptions, timeout)) as AgentType[];
        setData((prev) => ({ ...prev, agents }));
        console.log("agents", agents);
        break;
    }
  };

  return (
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
              key={value}>
              {data[value as keyof ContentType].map((content, i) => {
                if (!content) return null;
                return (
                  <div key={content.ID + i}>
                    {Object.entries(content).map(([key, value]) => (
                      <p key={key}>
                        {key}: {value}
                      </p>
                    ))}
                  </div>
                );
              })}
            </Tab>
          );
        })}
      </section>
    </div>
  );
};

export default Dashboard;
