//component/task.js

import React, { useState, useEffect} from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../context/axios-config';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RestoreIcon from '@mui/icons-material/Restore';

import moment from 'moment';
import '../CSS/Task.css';


const Task = () => {
  const { userId } = useAuth();

  const API_BASE_URL = 'http://localhost:5000/api/tasks';

  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '', dueDate: '' });

  // Rest 
 
  const handleCreateTask = async (e) => {
    e.preventDefault();
    const newTaskObj = { ...newTask };
  
    try {
      await axiosInstance.post(`${API_BASE_URL}`, newTaskObj);
      setTasks((prevTasks) => [...prevTasks, newTaskObj]);
      setNewTask({ title: '', description: '', dueDate: '' });
    } catch (error) {
      console.error('Error creating task:', error);
      // Display a user-friendly error message, if needed
    }
  };
  
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axiosInstance.get(`${API_BASE_URL}`);
        setTasks(response.data.tasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
        // Display a user-friendly error message, if needed
      }
    };
  
    fetchTasks();
  }, [userId]);
  
  const handleDeleteTask = async (taskId) => {
    try {
      await axiosInstance.delete(`${API_BASE_URL}/${taskId}`);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
      // Display a user-friendly error message, if needed
    }
  };
  
  const handleUpdateTask = async (taskId) => {
    try {
      const updatedTaskObj = { completed: true };
      await axiosInstance.put(`${API_BASE_URL}/${taskId}`, updatedTaskObj);
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task._id === taskId ? { ...task, completed: true , color: 'green'} : task))
      );
    } catch (error) {
      console.error('Error updating task:', error);
      // Display a user-friendly error message, if needed
    }
  };
 

  return (
    <div className="task-container">
      <h1 className="text-3xl font-semibold mb-4">Add Task</h1>
      <form onSubmit={handleCreateTask} className="flex flex-col gap-4 mb-4">
        {/* ... (unchanged) */}
        <button type="submit" className="form-button">
          Add Task
        </button>
      </form>
  
      {tasks.map((task) => (
        <div key={task._id} className="task-card">
          <div className="task-info">
            <h4 className="task-title">{task.title}</h4>
            <p className="task-description">{task.description}</p>
            <div className='task-meta'>
              {task.dueDate && (
                <p className='task-due-date'>{`Due: ${moment(task.dueDate).format('MMMM D, YYYY h:mm A')}`}</p>
              )}
            </div>
          </div>
          <div className="task-actions">
            <DeleteIcon
              onClick={() => handleDeleteTask(task._id)}
              className="task-action-icon delete-task-btn"
            />
  
            {task.completed ? (
              <RestoreIcon
                
                className={`task-action-icon retrieve-task-btn completed-task`}
                style={{ color: task.color || 'green' }}
              />
            ) : (
              <CheckCircleIcon
                onClick={() => handleUpdateTask(task._id)}
                className="task-action-icon complete-task-btn"
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Task;