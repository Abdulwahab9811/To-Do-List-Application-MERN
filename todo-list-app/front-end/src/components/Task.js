//component/task.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import moment from 'moment';
import '../CSS/Task.css';

const Task = () => {
  const { token } = useAuth();
  console.log('AuthContext values:', { token });

  const API_BASE_URL = 'http://localhost:5000/api/tasks';
  const [tasks, setTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTask, setEditingTask] = useState({ taskName: '', description: '', dueDate: '' });
  const [error, setError] = useState(null);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(API_BASE_URL, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Token:', token);
      console.log(response.data, 'tasks');

      // Assuming the tasks are directly returned as an array
      setTasks(response.data.tasks || []);
    } catch (error) {
      // Set the error state to handle it in the component
      setError(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [token, API_BASE_URL]);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    console.log('Handling create task...');
    console.log('New task:', editingTask);
    console.log('Token:', token); // Logging the token for verification

    const newTaskObj = {
      taskName: editingTask.taskName,
      description: editingTask.description,
      dueDate: editingTask.dueDate,
    };

    try {
      const config = {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      console.log('Request Config:', config); // Logging the request config

      // Make the POST request with the token directly
      const response = await axios.post(API_BASE_URL, newTaskObj, config);

      // Update the local state correctly
      setTasks((prevTasks) => {
        if (response.data && response.data.tasks) {
          // If the response has a "tasks" property, use that
          return response.data.tasks;
        } else if (Array.isArray(prevTasks)) {
          // If prevTasks is an array, append the new task
          return [...prevTasks, newTaskObj];
        } else {
          // If prevTasks is neither an array nor an object, default to an empty array
          return [newTaskObj];
        }
      });

      setEditingTask({ taskName: '', description: '', dueDate: '' });
    } catch (error) {
      console.error('Error creating task:', error);
      // Display a user-friendly error message, if needed
    }
  };

  
  const handleDeleteTask = async (taskId) => {
    try {
      const config = {
        withCredentials: true,
      };

      await axios.delete(`${API_BASE_URL}/${taskId}`, config);
      setTasks((prevTasks) => {
        // Ensure prevTasks is an array before calling filter
        const tasksArray = Array.isArray(prevTasks) ? prevTasks : [];
        return tasksArray.filter((task) => task._id !== taskId);
      }); fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
      // Display a user-friendly error message, if needed
    }
  };

 

  const handleEditTask = (task) => {
    setEditingTaskId(task._id);
    setEditingTask({ taskName: task.taskName, description: task.description, dueDate: task.dueDate });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (editingTaskId) {
      // Update an existing task
      const updatedTask = {
        taskName: editingTask.taskName,
        description: editingTask.description,
        dueDate: editingTask.dueDate,
        completed: true,
      };
  
      try {
        const config = {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
  
        await axios.put(`${API_BASE_URL}/${editingTaskId}`, updatedTask, config);
  
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === editingTaskId ? { ...task, ...updatedTask } : task
          )
        );
  
        setEditingTaskId(null);
        setEditingTask({ taskName: '', description: '', dueDate: '' });
      } catch (error) {
        console.error('Error updating task:', error);
        // Display a user-friendly error message, if needed
      }
    } else {
      // Create a new task
      try {
        const newTaskObj = {
          taskName: editingTask.taskName,
          description: editingTask.description,
          dueDate: editingTask.dueDate,
        };
  
        const config = {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
  
        const response = await axios.post(API_BASE_URL, newTaskObj, config);
  
        setTasks((prevTasks) => {
          if (response.data && response.data.tasks) {
            return response.data.tasks;
          } else if (Array.isArray(prevTasks)) {
            return [...prevTasks, newTaskObj];
          } else {
            return [newTaskObj];
          }
        });
  
        setEditingTask({ taskName: '', description: '', dueDate: '' });
        fetchTasks();
      } catch (error) {
        console.error('Error creating task:', error);
        // Display a user-friendly error message, if needed
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  return (
    <div className="task-container">
      
      <div className="task-form-container">
      <h1 className="text-3xl font-semibold mb-4">Add Task</h1>
        <form onSubmit={handleFormSubmit} className="flex flex-col gap-4 mb-4">
          <div className="form-group">
            <label htmlFor="title" className="form-label">
              Task Name:
            </label>
            <input
              type="text"
              id="title"
              name="taskName"
              value={editingTask.taskName}
              onChange={handleInputChange}
              placeholder="Enter task name"
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description" className="form-label">
              Task Description:
            </label>
            <textarea
              id="description"
              name="description"
              value={editingTask.description}
              onChange={handleInputChange}
              placeholder="Enter task description"
              rows="3"
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="dueDate" className="form-label">
              Due Date:
            </label>
            <input
              type="datetime-local"
              id="dueDate"
              name="dueDate"
              value={editingTask.dueDate}
              onChange={handleInputChange}
              className="form-input"
              required
            />
          </div>
  
          <button type="submit" className="form-button">
            {editingTaskId ? 'Update Task' : 'Add Task'}
          </button>
        </form>
      </div>
  
      
  
      <div className="task-list-container">
        {tasks.map((task) => (
            <div key={task._id} className="task-card">
            <div className="task-info">
              <h4 className="task-title">{task.taskName}</h4>
              <p className="task-description">{task.description}</p>
              <div className="task-meta">
                {task.dueDate && (
                  <p className="task-due-date">{`Due: ${moment(task.dueDate).format('MMMM D, YYYY h:mm A')}`}</p>
                )}
              </div>
            </div>
            <div className="task-actions">
              <DeleteIcon
                onClick={() => handleDeleteTask(task._id)}
                className="task-action-icon delete-task-btn"
              />
  
              <EditIcon
                onClick={() => handleEditTask(task)}
                className="task-action-icon edit-task-btn"
              />
            </div>
          </div>
        ))}
        <Link className='notifications' to="/notifications">Notifications</Link>
      </div>
    </div>
  );
};


export default Task;