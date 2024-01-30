// Notification.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import { FaTrash } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom'; 
import '../CSS/Notifications.css'

const Notification = () => {
  const { token } = useAuth();
  const API_BASE_URL = 'http://localhost:5000/api/tasks';
  const [tasks, setTasks] = useState([]);

  // Fetch tasks on mount or when the token changes
  useEffect(() => {
    fetchTasks();
  }, [token, API_BASE_URL]);

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

  const handleCompleteTask = async (taskId) => {
    try {
      const config = {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.put(`${API_BASE_URL}/${taskId}`, { completed: true }, config);

      // Show success toast
      toast.success('Task completed successfully', { position: 'bottom-right' });

      // Update the task in the local state
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, completed: true } : task
        )
      );
    } catch (error) {
      console.error('Error completing task:', error);
      toast.error('Error completing task', { position: 'bottom-left' });
    }
  };

  const handleUndoCompleteTask = async (taskId) => {
    try {
      const config = {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.put(`${API_BASE_URL}/${taskId}`, { completed: false }, config);

      // Show undo success toast
      toast.info('Task completion undone', { position: 'bottom-right' });

      // Update the task in the local state
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, completed: false } : task
        )
      );
    } catch (error) {
      console.error('Error undoing task completion:', error);
      toast.error('Error undoing task completion', { position: 'bottom-left' });
    }
  };
  
  const handleDeleteTask = async (taskId) => {
    try {
      const config = {
        withCredentials: true,
      };
  
      // Use react-toastify to show a confirmation dialog
      toast.info(
        <>
          <div>
            <strong>Are you sure you want to delete this task?</strong>
          </div>
          <button
            onClick={() => {
              handleConfirmDelete(taskId);
              toast.dismiss();
            }}
          >
            Yes
          </button>
          <button onClick={() => toast.dismiss()}>No</button>
        </>,
        {
          autoClose: false,
          position: 'bottom-left',
        }
      );
    } catch (error) {
      console.error('Error deleting task:', error);
      // Display a user-friendly error message, if needed
    }
  };
  
  const handleConfirmDelete = async (taskId) => {
    try {
      const config = {
        withCredentials: true,
      };
  
      await axios.delete(`${API_BASE_URL}/${taskId}`, config);
      setTasks((prevTasks) => {
        // Ensure prevTasks is an array before calling filter
        const tasksArray = Array.isArray(prevTasks) ? prevTasks : [];
        return tasksArray.filter((task) => task._id !== taskId);
      });
      fetchTasks();
  
      // Show a success message using react-toastify
      toast.success('Task deleted successfully', { position: 'bottom-right' });
    } catch (error) {
      console.error('Error deleting task:', error);
      // Display a user-friendly error message, if needed
      toast.error('Error deleting task', { position: 'bottom-left' });
    }
  };
  

 



  return (
    <div>
      <Link className='link' to="/tasks">Go Back to Tasks</Link>
      <div className="notification-container">
        <h1>Notifications</h1>
  
        {tasks.map((task) => (
          <div key={task._id} className={`task-card ${task.completed ? 'completed' : ''}`}>
            <div className="task-info">
              <p>{task.taskName}</p>
              <p>{task.description}</p>
              <p>Due Date: {task.dueDate}</p>
              {task.completed ? (
                <>
                <p className='completedTask'>Task Completed</p>
                  <FaTrash
                    onClick={() => handleDeleteTask(task._id)}
                    className="task-action-icon delete-task-btn"
                  />
                  <button onClick={() => handleUndoCompleteTask(task._id)} className="undo-btn">
                    Undo
                  </button>
                </>
              ) : (
                <div className="task-actions">
                  <FaTrash
                    onClick={() => handleDeleteTask(task._id)}
                    className="task-action-icon delete-task-btn"
                  />
                  <button onClick={() => handleCompleteTask(task._id)} className="complete-btn">
                    Complete
                  </button>

                 
                </div>
              )}
            </div>
          </div>
        ))}
        <ToastContainer />
      </div>
    </div>
  );
  
};
    
  
  export default Notification;
  
