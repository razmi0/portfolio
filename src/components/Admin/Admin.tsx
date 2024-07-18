import { useAuth } from "@/hooks/useAuth";
import { uppercase } from "@/lib/utils";
import { apiPaths, simpleFetch } from "@/services";

type DataType = "error" | "msg" | "user" | "agent";

const Admin = () => {
  const { authOptions } = useAuth();

  const handleData = async (type: DataType) => {
    console.log(`[${type}] : `);
    let data = null;

    switch (type) {
      case "error":
        data = await simpleFetch(apiPaths.data.errors, authOptions);
        break;
      case "msg":
        data = await simpleFetch(apiPaths.data.msgs, authOptions);
        break;
      case "user":
        data = await simpleFetch(apiPaths.data.users, authOptions);
        break;
      case "agent":
        data = await simpleFetch(apiPaths.data.agents, authOptions);
        break;
    }

    console.log(data);
  };

  return (
    <section className="grid grid-cols-2 grid-rows-2 items-center justify-items-center gap-5 mt-20 grow h-full [&>div]:bg-bogoss-300 [&>div]:px-2 [&>div]:py-[1px] text-sm font-medium">
      {["error", "msg", "user", "agent"].map((value) => {
        const handler = () => handleData(value as DataType);
        return (
          <div key={value}>
            <button onClick={handler}>{uppercase(value) + "s"}</button>
          </div>
        );
      })}
    </section>
  );
};

export default Admin;
