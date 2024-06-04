import { cn } from "@/lib/utils";

const HeadingTransition = ({ h2, small, className }: { h2: string; small: string; className?: string }) => {
  return (
    <div className={cn("h-[10vh] w-full text-center my-0 space-y-2", className)}>
      <small className="dark:text-bogoss-200 text-bogoss-700 font-semibold">{small}</small>
      <h2 className="text-5xl uppercase">{h2}</h2>
    </div>
  );
};

export default HeadingTransition;
