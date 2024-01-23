//component/task.js

import React, { useState, useEffect} from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RestoreIcon from '@mui/icons-material/Restore';

import moment from 'moment';
import '../CSS/Task.css';


const Task = () => {
  const { user, token, userId } = useAuth();
  console.log('AuthContext values:', { user, token, userId });

  const API_BASE_URL = 'http://localhost:5000/api/tasks';
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ taskName: '', description: '', dueDate: '' });
  const [ setError] = useState(null);


  
  
    useEffect(() => {
      const fetchTasks = async () => {
        try {
          const response = await axios.get(API_BASE_URL, { withCredentials: true , 
            headers: {
              Authorization: {token,},
            },
          });
          console.log('Token:', token);
          console.log(response.data , 'tasks')
  
          setTasks(response.data);
        } catch (error) {
          // Set the error state to handle it in the component
          setError(error);
        }
      };
  
      fetchTasks();
    }, [token, API_BASE_URL]);
  
   

  const handleCreateTask = async (e) => {
    e.preventDefault();
    console.log('Handling create task...');
    console.log('New task:', newTask);
    console.log('Token:', token); // Logging the token for verification
  
    const newTaskObj = {
      taskName: newTask.taskName,  // Update property name to taskName
      description: newTask.description,
      dueDate: newTask.dueDate,
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
      await axios.post(`${API_BASE_URL}`, newTaskObj, config);
  
      // Update the local state
      setTasks((prevTasks) => [...prevTasks, newTaskObj]);
      setNewTask({ taskName: '', description: '', dueDate: '' });
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
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
      // Display a user-friendly error message, if needed
    }
  };
  
  const handleUpdateTask = async (taskId) => {
    try {
      const updatedTaskObj = { completed: true };
    const config = {
      withCredentials: true,
    };
      await axios.put(`${API_BASE_URL}/${taskId}`, updatedTaskObj,config);
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
      <div className="form-group">
          <label htmlFor="title" className="form-label">Task Name:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={newTask.taskName}
            onChange={(e) => setNewTask((prevTask) => ({ ...prevTask, taskName: e.target.value }))}
            placeholder="Enter task name"
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description" className="form-label">Task Description:</label>
          <textarea
            id="description"
            name="description"
            value={newTask.description}
            onChange={(e) => setNewTask((prevTask) => ({ ...prevTask, description: e.target.value }))}
            placeholder="Enter task description"
            rows="3"
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="dueDate" className="form-label">Due Date:</label>
          <input
            type="datetime-local"
            id="dueDate"
            name="dueDate"
            value={newTask.dueDate}
            onChange={(e) => setNewTask((prevTask) => ({ ...prevTask, dueDate: e.target.value }))}
            className="form-input"
            required
          />
        </div>

        <button type="submit" className="form-button">
          Add Task
        </button>
      </form>


  
      {tasks.tasks && tasks.tasks.map((task) => (
        <div key={task._id} className="task-card">
          <div className="task-info">
            <h4 className="task-title">{task.taskName}</h4>
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