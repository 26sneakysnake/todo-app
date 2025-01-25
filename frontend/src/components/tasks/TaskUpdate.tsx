import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTask, updateTask } from "../../services/api";
import { Task } from "../../models/Task";

const TaskUpdate: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get task ID from URL params
  const [task, setTask] = useState<Task | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      if (id) {
        try {
          const fetchedTask = await getTask(parseInt(id));
          setTask(fetchedTask);
          setTitle(fetchedTask.title);
          setDescription(fetchedTask.description || "");
          setPriority(fetchedTask.priority || "");
          setStatus(fetchedTask.status);
          setCategory(fetchedTask.category || "");
        } catch (error) {
          console.error("Error fetching task:", error);
          setError("Error fetching task");
        }
      }
    };

    fetchTask();
  }, [id]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!task) return;

    const updatedTask: Task = {
      ...task,
      title,
      description,
      priority,
      status,
      category,
    };

    try {
      await updateTask(task.id, updatedTask);
      navigate("/");
      console.log("Task updated successfully!");
    } catch (error) {
      console.error("Error updating task:", error);
      setError("Error updating task");
    }
  };

  if (!task) {
    return <div>Loading task...</div>;
  }

  return (
    <div>
      <h2>Update Task</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="priority">Priority:</label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="">Select</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
        <div>
          <label htmlFor="status">Status:</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Blocked">Blocked</option>
          </select>
        </div>
        <div>
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default TaskUpdate;