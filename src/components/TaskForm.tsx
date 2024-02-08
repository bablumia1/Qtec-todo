import { ChangeEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useTask } from "../hooks/useTask";
import { ITask, Prority, Status } from "../types";
import { generateUUID } from "../utils";

const TaskForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Prority>("low");
  const [status, setStatus] = useState<Status>("Incomplete");
  const {
    addTask,
    taskForUpdate,
    updateTask,
    needToUpdate,
    clearNeedToUpdate,
  } = useTask();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (taskForUpdate && needToUpdate) {
      setTitle(taskForUpdate.title || "");
      setDescription(taskForUpdate.description || "");
      setPriority(taskForUpdate.priority || "low");
      setStatus(taskForUpdate.status || "Incomplete");
    }
  }, [taskForUpdate, needToUpdate]);

  const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    if (!title || !description || !priority) {
      toast.error("All fields are required.");
      return;
    }
    const task: ITask = {
      id: generateUUID(),
      title: title,
      description: description,
      priority: priority,
      status: status,
    };

    if (taskForUpdate && needToUpdate) {
      updateTask(taskForUpdate.id, task);
      toast.success("Task updated successfully");
      setLoading(false);
      clearNeedToUpdate();
    } else {
      addTask(task);
      toast.success("Task created successfully");
      setLoading(false);
    }
    setTitle("");
    setDescription("");
    setPriority("low");
  };

  return (
    <div>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title" className="input-label">
            Title
          </label>
          <div className="mt-2">
            <input
              id="title"
              name="title"
              value={title}
              type="text"
              autoComplete="off"
              className="form-input"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label htmlFor="description" className="input-label">
            Description
          </label>
          <div className="mt-2">
            <textarea
              id="description"
              name="description"
              value={description}
              rows={3}
              autoComplete="off"
              className="form-input"
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
        </div>

        <div>
          <label htmlFor="priority" className="input-label">
            Priority
          </label>
          <div className="mt-2">
            <select
              id="priority"
              name="priority"
              autoComplete="off"
              value={priority}
              className="form-input"
              onChange={(e) => setPriority(e.target.value as Prority)}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>

        <div>
          <button disabled={loading} type="submit" className="btn-blue">
            {loading ? "Loading..." : needToUpdate ? "Update Task" : "Add Task"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
