import {
  createContext,
  useReducer,
  useEffect,
  FC,
  PropsWithChildren,
  useState,
} from "react";
import { ITask, ITaskContextState, Status } from "../types";
import { taskReducer } from "./taskReducer";

const initialState: ITask[] = JSON.parse(localStorage.getItem("tasks") || "[]");

// Create Context
export const TaskContext = createContext<ITaskContextState | undefined>(
  undefined
);

export const TaskProvider: FC<PropsWithChildren> = ({ children }) => {
  const [tasks, dispatch] = useReducer(taskReducer, initialState);
  const [taskForUpdate, setTaskForUpdate] = useState<ITask | null>(null);
  const [needToUpdate, setNeedToUpdate] = useState(false);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task: ITask) => {
    dispatch({ type: "ADD_TASK", payload: task });
  };

  const deleteTask = (taskId: string) => {
    dispatch({ type: "DELETE_TASK", payload: taskId });
  };

  const updateTask = (taskId: string, updatedTask: ITask) => {
    dispatch({ type: "UPDATE_TASK", payload: { id: taskId, updatedTask } });
  };

  const changeStatus = (taskId: string, status: Status) => {
    dispatch({
      type: "CHANGE_STATUS",
      payload: { id: taskId, status: status },
    });
  };

  const getTaskById = (taskId: string) => {
    const singleTask = tasks.find((task) => task.id === taskId);
    if (singleTask) {
      setTaskForUpdate(singleTask);
      setNeedToUpdate(true);
    }
  };

  const clearNeedToUpdate = () => setNeedToUpdate(false);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        deleteTask,
        updateTask,
        getTaskById,
        taskForUpdate,
        needToUpdate,
        changeStatus,
        clearNeedToUpdate,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
