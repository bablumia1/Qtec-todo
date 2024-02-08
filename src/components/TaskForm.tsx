const TaskForm = () => {
  return (
    <div>
      <form className="space-y-6" action="#" method="POST">
        <div>
          <label htmlFor="title" className="input-label">
            Title
          </label>
          <div className="mt-2">
            <input
              id="title"
              name="title"
              type="text"
              autoComplete="off"
              required
              className="form-input"
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
              rows={3}
              autoComplete="off"
              required
              className="form-input"
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
              required
              className="form-input"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>

        <div>
          <button type="submit" className="btn-blue">
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
