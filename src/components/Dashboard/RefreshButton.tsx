import { RefreshCcw } from "lucide-react";

const RefreshButton = ({ refresh }: { refresh: () => void }) => {
  return (
    <button type="button" onClick={refresh}>
      <RefreshCcw className="size-4" />
    </button>
  );
};

export default RefreshButton;
