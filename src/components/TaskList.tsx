import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { ITask } from "../types";
import { useTask } from "../hooks/useTask";
import { toast } from "react-toastify";
import { getBorderColor } from "../utils";
import TaskToggle from "./TaskToggle";

interface Props {
  task: ITask;
}

const TaskList = ({ task }: Props): JSX.Element => {
  const { deleteTask, getTaskById } = useTask();

  const handleDelete = (id: string) => {
    deleteTask(id);
    toast.success("Taks deleted");
  };

  return (
    <li
      className={`col-span-1 divide-y rounded-md bg-white border shadow ${getBorderColor(
        task.priority
      )}`}
    >
      <div className="flex items-center justify-between p-6 space-x-6 w-80">
        <div className="flex-1 truncate ">
          <div className="flex items-center justify-between space-x-3">
            <h3 className="text-sm font-medium text-gray-900 truncate">
              {task.title}
            </h3>
            <span
              className={`inline-flex flex-shrink-0 items-center rounded-full ${
                task.status === "Completed"
                  ? "bg-green-50 text-green-700 ring-green-600/20"
                  : "bg-rose-50 text-rose-700 ring-rose-600/20"
              } px-1.5 py-0.5 text-xs font-medium  ring-1 ring-inset `}
            >
              {task.status}
            </span>
          </div>
          <p className="mt-1 text-sm text-gray-500 truncate">
            {task.description}
          </p>
        </div>
      </div>
      <div>
        <div className="flex -mt-px divide-x divide-gray-200">
          <div className="flex items-center justify-center flex-1 w-0">
            <TaskToggle task={task} />
          </div>
          <div className="flex flex-1 w-0">
            <button
              onClick={() => getTaskById(task.id)}
              className="relative inline-flex items-center justify-center flex-1 w-0 py-2 -mr-px text-sm font-semibold text-gray-900 border border-transparent rounded-bl-lg gap-x-3"
            >
              <PencilIcon
                className="w-5 h-5 text-gray-400"
                aria-hidden="true"
              />
              Edit
            </button>
          </div>

          <div className="flex flex-1 w-0 -ml-px">
            <button
              onClick={() => handleDelete(task.id)}
              className="relative inline-flex items-center justify-center flex-1 w-0 py-2 text-sm font-semibold text-gray-900 border border-transparent rounded-br-lg gap-x-3"
            >
              <TrashIcon className="w-5 h-5 text-rose-400" aria-hidden="true" />
              Delete
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default TaskList;
