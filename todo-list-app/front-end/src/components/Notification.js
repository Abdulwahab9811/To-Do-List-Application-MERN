// Notification.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom'; 
import '../CSS/Notifications.css'

const Notification = () => {
  const { token } = useAuth();
  const API_BASE_URL = 'http://localhost:5000/api/tasks';
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(API_BASE_URL, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(response.data.tasks || []);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [token, API_BASE_URL]);

  const handleCompleteTask = async (taskId) => {
    try {
      // Update task as completed
      const config = {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.put(`${API_BASE_URL}/${taskId}`, { completed: true }, config);

      // Show success toast
      toast.success('Task completed successfully', { position: 'top-right' });

      // Refetch tasks to update the UI
      fetchTasks();
    } catch (error) {
      console.error('Error completing task:', error);
      // Display an error toast if needed
      toast.error('Error completing task', { position: 'top-right' });
    }
  };

  const handleUndoCompleteTask = async (taskId) => {
    try {
      // Update task as not completed
      const config = {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.put(`${API_BASE_URL}/${taskId}`, { completed: false }, config);

      // Show undo success toast
      toast.info('Task completion undone', { position: 'top-right' });

      // Refetch tasks to update the UI
      fetchTasks();
    } catch (error) {
      console.error('Error undoing task completion:', error);
      // Display an error toast if needed
      toast.error('Error undoing task completion', { position: 'top-right' });
    }
  };

  return (
    <div className="notification-container">
      <h1>Notifications</h1>
      <Link to="/tasks">Go Back to Tasks</Link>
      {tasks.map((task) => (
        <div key={task._id} className={`task-card ${task.completed ? 'completed' : ''}`}>
          <div className="task-info">
            <p>{task.taskName}</p>
            <p>{task.description}</p>
            <p>Due Date: {task.dueDate}</p>
            {task.completed ? (
              <p>Task Completed</p>
            ) : (
              <div className="task-actions">
                <span
                  className="complete-task-btn"
                  onClick={() => handleCompleteTask(task._id)}
                >
                  &#10003; {/* Checkmark icon */}
                </span>
              </div>
            )}
            {/* Check if due date is less than 24 hours away */}
            {new Date(task.dueDate).getTime() - Date.now() < 24 * 60 * 60 * 1000 && (
              <p>Due date is coming soon. Please complete it!</p>
            )}
          </div>
          {!task.completed && (
            <div className="task-actions">
              <span
                className="undo-task-btn"
                onClick={() => handleUndoCompleteTask(task._id)}
              >
                &#8634; {/* Undo icon */}
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
    
  
  export default Notification;
  
