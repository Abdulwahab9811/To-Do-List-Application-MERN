//component/task.js

import React, { useState, useEffect, useRef } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RestoreIcon from '@mui/icons-material/Restore';
import axios from 'axios';
import moment from 'moment';
import '../CSS/Task.css';


const Task = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '', dueDate: '' });
 
 
  const formRef = useRef();
  const handleAddTask = async (e) => {
     e.preventDefault();
     const taskId = Math.floor(Math.random() * 10000);
     const newTaskObj = { ...newTask, _id: taskId };
 
     try {
       await axios.post('http://localhost:5000/tasks/create', newTaskObj);
       setTasks((prevTasks) => [...prevTasks, newTaskObj]);
       setNewTask({ title: '', description: '', dueDate: '' });
     } catch (error) {
       console.error('Error adding task:', error);
     }
  };
 
  useEffect(() => {
     const fetchTasks = async () => {
       try {
         const response = await axios.get('http://localhost:5000/tasks');
         setTasks(response.data);
       } catch (error) {
         console.error('Error fetching tasks:', error);
       }
     };
 
     fetchTasks();
  }, []);
 
  const handleDelete = async (taskId) => {
     try {
       await axios.delete(`http://localhost:5000/tasks/${taskId}`);
       setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
     } catch (error) {
       console.error('Error deleting task:', error);
     }
  };
 
  const handleComplete = async (taskId) => {
     try {
       await axios.put(`http://localhost:5000/tasks/${taskId}`, { completed: true });
       setTasks((prevTasks) =>
         prevTasks.map((task) =>
           task._id === taskId ? { ...task, completed: true } : task
         )
       );
     } catch (error) {
       console.error('Error completing task:', error);
     }
  };
 
  const handleRetrieve = async (taskId) => {
     try {
       const response = await axios.get(`http://localhost:5000/tasks/${taskId}`);
       console.log('Task retrieved:', response.data);
     } catch (error) {
       console.error('Error retrieving task:', error);
     }
  };

  return (
    <div className="task-container">
      <h1 className="text-3xl font-semibold mb-4">Add Task</h1>
      <form ref={formRef}  onSubmit={handleAddTask} className="flex flex-col gap-4 mb-4">
        <div className="form-group">
          <label htmlFor="title" className="form-label">Task Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={newTask.title}
            onChange={(e) => setNewTask((prevTask) => ({ ...prevTask, title: e.target.value }))}
            placeholder="Enter task title"
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
              onClick={() => handleDelete(task._id)}
              className="task-action-icon delete-task-btn"
            />
            {!task.completed && (
              <CheckCircleIcon
                onClick={() => handleComplete(task._id)}
                className="task-action-icon complete-task-btn"
              />
            )}
            {task.completed && (
              <RestoreIcon
                onClick={() => handleRetrieve(task._id)}
                className="task-action-icon retrieve-task-btn"
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
  
};

export default Task;