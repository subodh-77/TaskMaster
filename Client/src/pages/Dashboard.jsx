import { useState, useEffect } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css"; // Ensure path is correct

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await API.get("/tasks");
        setTasks(res.data);
      } catch (err) { console.error("Failed to fetch tasks"); }
    };
    fetchTasks();
  }, []);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;
    try {
      const res = await API.post("/tasks", { title: taskTitle });
      setTasks([...tasks, res.data]);
      setTaskTitle("");
    } catch (err) { alert("Error creating task"); }
  };

  const handleUpdateTask = async (id) => {
    try {
      const res = await API.put(`/tasks/${id}`, { title: editText });
      setTasks(tasks.map((t) => (t._id === id ? res.data : t)));
      setEditingId(null);
    } catch (err) { alert("Update failed"); }
  };

  const handleDeleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      setTasks(tasks.filter((t) => t._id !== id));
    } catch (err) { alert("Delete failed"); }
  };

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-container">
        
        <header className="dashboard-header">
          <h1>My Tasks</h1>
          <button className="btn btn-logout" onClick={handleLogout}>Logout</button>
        </header>

        <section className="task-form-container">
          <form className="task-form" onSubmit={handleCreateTask}>
            <input 
              className="task-input"
              value={taskTitle} 
              onChange={(e) => setTaskTitle(e.target.value)} 
              placeholder="What's your next goal?" 
            />
            <button className="btn btn-add" type="submit">Add Task</button>
          </form>
        </section>

        <ul className="task-list">
          {tasks.map(task => (
            <li key={task._id} className="task-card">
              {editingId === task._id ? (
                <div className="task-form" style={{width: '100%'}}>
                  <input className="task-input" value={editText} onChange={(e) => setEditText(e.target.value)} />
                  <button className="btn btn-add" onClick={() => handleUpdateTask(task._id)}>Save</button>
                  <button className="btn btn-logout" onClick={() => setEditingId(null)}>Cancel</button>
                </div>
              ) : (
                <>
                  <div className="task-info">
                    <span className="task-title">{task.title}</span>
                    <span className="task-date">
                      Created: {new Date(task.createdAt).toLocaleDateString()} 
                      {task.updatedAt !== task.createdAt && " • Edited"}
                    </span>
                  </div>
                  <div className="task-actions">
                    <button className="btn btn-edit" onClick={() => { setEditingId(task._id); setEditText(task.title); }}>Edit</button>
                    <button className="btn btn-delete" onClick={() => handleDeleteTask(task._id)}>Delete</button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}