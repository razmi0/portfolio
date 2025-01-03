import { useMemo } from "react";
import { education, projects, skills, xp } from "../data/home.json";

export const useData = () => {
    return useMemo(() => {
        return { education, projects, skills, xp };
    }, []);
};
