import type { ReactNode } from "react";
import Show from "../ui/show";

type TableProps = {
  show: unknown;
  data: Record<string, unknown>[];
};

const Table = ({ show, data }: TableProps) => {
  const cols = Object.keys(data[0] || { "No Data": "" });
  return (
    <Show when={show}>
      <section className="mt-10 text-sm" role="grid">
        <Columns arr={cols} />
        {data.map((row) => (
          <Row row={Object.values(row)} key={row.id as string} />
        ))}
      </section>
    </Show>
  );
};

const Row = ({ row }: { row: any[] }) => {
  return (
    <div
      role="row"
      className="grid grid-flow-col auto-cols-fr place-content-center hover:bg-bogoss-400 [&>div]:whitespace-nowrap [&>div]:overflow-x-scroll [&>div]:text-center w-full bg-bogoss-300/50 divide-x-2 divide-bogoss-300">
      {row.map((cell) => (
        <Cell key={cell}>{cell}</Cell>
      ))}
    </div>
  );
};

const Cell = ({ children }: { children: ReactNode }) => {
  return (
    <div role="gridcell" className="raz-scrollbar dashboard-cell-scrollbar p-2">
      {children}
    </div>
  );
};

const Columns = ({ arr }: { arr: any[] }) => {
  return (
    <div
      role="columnheader"
      className="grid grid-flow-col auto-cols-fr place-content-center [&>div]:text-center w-full bg-bogoss-500 divide-x-2 divide-bogoss-300 mb-1">
      {arr.map((key: string) => (
        <div className="p-1" key={`col-${key}`} role="gridcell">
          {key.toUpperCase()}
        </div>
      ))}
    </div>
  );
};

export default Table;
