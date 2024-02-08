import { useTask } from "../hooks/useTask";
import TaskList from "./TaskList";

const TaskArea = () => {
  const { tasks } = useTask();
  return (
    <div>
      <ul
        role="list"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 "
      >
        {tasks.map((task) => (
          <TaskList key={task.id} task={task} />
        ))}
      </ul>
    </div>
  );
};

export default TaskArea;
