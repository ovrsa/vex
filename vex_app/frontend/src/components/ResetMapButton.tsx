import { useClearEventData } from "@/hooks/useClearEventData";
import { Button } from "./ui/button";

export const ResetMapButton = () => {
    const clearEventData = useClearEventData();

    return (
        <div className="pb-2 pr-2">
          <Button 
          onClick={clearEventData}
          variant="outline"
          className="cursor-pointer"
          >
            Reset Map
          </Button>
        </div>
    );
}
