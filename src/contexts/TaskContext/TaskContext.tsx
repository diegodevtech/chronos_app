import { createContext } from "react";
import type { TaskStateModel } from "../../models/TaskStateModel";
import type { TaskActionType } from "./taskActions";

type TaskContextProps = {
  state: TaskStateModel;
  dispatch: React.Dispatch<TaskActionType>;
};

const initialContextValue = {
  state: {} as TaskStateModel,
  dispatch: () => {},
};


export const TaskContext = createContext<TaskContextProps>(initialContextValue);