export type Prority = "low" | "medium" | "high";
export type Status = "Completed" | "Incomplete";

export interface ITask {
  id: string;
  title: string;
  description: string;
  priority: Prority;
  status: Status;
}

export interface ITaskContextState {
  tasks: ITask[];
  addTask: (task: ITask) => void;
  deleteTask: (taskId: string) => void;
  updateTask: (taskId: string, updatedTask: ITask) => void;
}

export type ITaskAction =
  | { type: "ADD_TASK"; payload: ITask }
  | { type: "DELETE_TASK"; payload: string }
  | { type: "UPDATE_TASK"; payload: { id: string; updatedTask: ITask } };
