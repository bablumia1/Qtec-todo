import {
  createContext,
  useReducer,
  useEffect,
  FC,
  PropsWithChildren,
} from "react";
import { ITask, ITaskAction, ITaskContextState } from "../types";

const initialState: ITask[] = JSON.parse(localStorage.getItem("tasks") || "[]");

// Create Context
export const TaskContext = createContext<ITaskContextState | undefined>(
  undefined
);

// Reducer function
const taskReducer = (state: ITask[], action: ITaskAction): ITask[] => {
  switch (action.type) {
    case "ADD_TASK":
      return [...state, action.payload];
    case "DELETE_TASK":
      return state.filter((task) => task.id !== action.payload.toString());
    case "UPDATE_TASK":
      return state.map((task) =>
        task.id === action.payload.id.toString()
          ? action.payload.updatedTask
          : task
      );
    default:
      return state;
  }
};

export const TaskProvider: FC<PropsWithChildren> = ({ children }) => {
  const [tasks, dispatch] = useReducer(taskReducer, initialState);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task: ITask) => {
    dispatch({ type: "ADD_TASK", payload: task });
  };

  const deleteTask = (taskId: number) => {
    dispatch({ type: "DELETE_TASK", payload: taskId });
  };

  const updateTask = (taskId: number, updatedTask: ITask) => {
    dispatch({ type: "UPDATE_TASK", payload: { id: taskId, updatedTask } });
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, deleteTask, updateTask }}>
      {children}
    </TaskContext.Provider>
  );
};
