import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { ITask, Prority } from "../types";
import { useTask } from "../hooks/useTask";
import { toast } from "react-toastify";

interface Props {
  task: ITask;
}

const TaskList = ({ task }: Props): JSX.Element => {
  const { deleteTask } = useTask();

  const handleDelete = (id: string) => {
    deleteTask(id);
    toast.success("Taks deleted");
  };

  const getBorderColor = (priority: Prority): string => {
    switch (priority) {
      case "low":
        return "border-blue-400";
      case "medium":
        return "border-yellow-400";
      case "high":
        return "border-red-400";
      default:
        return "border-gray-400";
    }
  };

  return (
    <li
      className={`col-span-1 divide-y rounded-md bg-white border shadow ${getBorderColor(
        task.priority
      )}`}
    >
      <div className="flex w-80 items-center justify-between space-x-6 p-6">
        <div className="flex-1 truncate ">
          <div className="flex items-center justify-between space-x-3">
            <h3 className="truncate text-sm font-medium text-gray-900">
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
          <p className="mt-1 truncate  text-sm text-gray-500">
            {task.description}
          </p>
        </div>
      </div>
      <div>
        <div className="-mt-px flex divide-x divide-gray-200">
          <div className="flex w-0 flex-1">
            <button className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-2 text-sm font-semibold text-gray-900">
              <PencilIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              Edit
            </button>
          </div>
          <div className="-ml-px flex w-0 flex-1">
            <button
              onClick={() => handleDelete(task.id)}
              className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-2 text-sm font-semibold text-gray-900"
            >
              <TrashIcon className="h-5 w-5 text-rose-400" aria-hidden="true" />
              Delete
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default TaskList;
