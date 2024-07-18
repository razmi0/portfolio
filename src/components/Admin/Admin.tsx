import { useAuth } from "@/hooks/useAuth";
import { uppercase } from "@/lib/utils";
import { apiPaths, simpleFetch } from "@/services";
import type { AgentType, PostType, UserType, ValidationErrorType } from "@/types";
import { useState } from "react";

type DataType = "error" | "msg" | "user" | "agent";

type ContentType = {
  errors: ValidationErrorType[];
  msgs: PostType[];
  users: UserType[];
  agents: AgentType[];
};

const Admin = () => {
  const { authOptions } = useAuth();
  const [data, setData] = useState<ContentType>({
    errors: [],
    msgs: [],
    users: [],
    agents: [],
  });

  const handleData = async (type: DataType) => {
    console.log(`[${type}] : `);
    switch (type) {
      case "error":
        const errors = (await simpleFetch(apiPaths.data.errors, authOptions)) as ValidationErrorType[];
        setData((prev) => ({ ...prev, errors }));
        break;
      case "msg":
        const msgs = (await simpleFetch(apiPaths.data.msgs, authOptions)) as PostType[];
        setData((prev) => ({ ...prev, msgs }));
        break;
      case "user":
        const users = (await simpleFetch(apiPaths.data.users, authOptions)) as UserType[];
        setData((prev) => ({ ...prev, users }));
        break;
      case "agent":
        const agents = (await simpleFetch(apiPaths.data.agents, authOptions)) as AgentType[];
        setData((prev) => ({ ...prev, agents }));
        break;
    }
  };

  return (
    <section className="grid grid-cols-2 grid-rows-2 items-center justify-items-center gap-5 mt-20 grow h-full [&>div]:bg-bogoss-300 [&>div]:px-2 [&>div]:py-[1px] text-sm font-medium">
      {["error", "msg", "user", "agent"].map((value) => {
        const handler = () => handleData(value as DataType);
        return (
          <>
            <div key={value}>
              <button onClick={handler}>{uppercase(value) + "s"}</button>
            </div>
            <section>
              {data[value as keyof ContentType].map((content, i) => {
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
            </section>
          </>
        );
      })}
    </section>
  );
};

export default Admin;
