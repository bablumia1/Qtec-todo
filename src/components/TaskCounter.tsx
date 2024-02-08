import { ITask } from "../types";

interface Props {
  tasks: ITask[];
}

const TaskCounter = ({ tasks }: Props): JSX.Element => {
  let completedTasks = 0;
  let incompleteTasks = 0;

  tasks.forEach((task) => {
    if (task.status === "Completed") {
      completedTasks++;
    } else if (task.status === "Incomplete") {
      incompleteTasks++;
    }
  });

  return (
    <nav aria-label="Progress">
      <ol
        role="list"
        className="mb-8 border border-gray-300 divide-y divide-gray-300 rounded-md md:flex md:divide-y-0"
      >
        <li className="relative items-center justify-between md:flex md:flex-1">
          <div className="flex items-center px-6 py-4 text-sm font-medium border-r">
            <span className="flex items-center justify-center flex-shrink-0 w-10 h-10 bg-green-600 border-2 border-green-600 rounded-full">
              <span className="text-xl text-white">{completedTasks}</span>
            </span>
            <span className="ml-4 text-sm font-medium ">Completed</span>
          </div>

          <div className="flex items-center px-6 py-4 text-sm font-medium border-r">
            <span className="flex items-center justify-center flex-shrink-0 w-10 h-10 text-white border-2 rounded-full border-rose-600 bg-rose-600">
              <span className="text-xl text-white-600">{incompleteTasks}</span>
            </span>
            <span className="ml-4 text-sm font-medium ">In-completed</span>
          </div>

          <div className="flex items-center px-6 py-4 text-sm font-medium">
            <span className="flex items-center justify-center flex-shrink-0 w-10 h-10 bg-indigo-600 border-2 border-indigo-600 rounded-full">
              <span className="text-xl text-white">{tasks?.length}</span>
            </span>
            <span className="ml-4 text-sm font-medium ">Total Task</span>
          </div>
        </li>
      </ol>
    </nav>
  );
};

export default TaskCounter;
