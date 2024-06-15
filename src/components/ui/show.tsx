import type { ReactNode } from "react";

const Show = ({ when, fallback = <></>, children }: { when: unknown; fallback?: ReactNode; children: ReactNode }) => {
  return when ? children : fallback;
};

export default Show;
