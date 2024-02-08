/* eslint-disable no-case-declarations */
import { ITask, ITaskAction } from "../types";

export const taskReducer = (state: ITask[], action: ITaskAction): ITask[] => {
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
    case "CHANGE_STATUS":
      const { id, status } = action.payload;
      return state.map((task) =>
        task.id === id ? { ...task, status: status } : task
      );

    default:
      return state;
  }
};
