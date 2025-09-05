import { useContext } from "react";
import { TaskContext } from "./TaskContext";

export function useTasks() {
  const context = useContext(TaskContext);
  if (context === undefined)
    throw new Error('Context was used outside its provider.');
  return context;
}
