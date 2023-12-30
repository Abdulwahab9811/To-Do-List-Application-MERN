// Updated Task component

import React, { useState,useEffect, useRef } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RestoreIcon from '@mui/icons-material/Restore';
import moment from 'moment';
import '../CSS/Task.css';

const Task = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '', dueDate: '' });

  const formRef = useRef(null);

  const handleAddTask = (e) => {
    e.preventDefault();
    setTasks((prevTasks) => [...prevTasks, { ...newTask, _id: Date.now().toString(), completed: false }]);
    setNewTask({ title: '', description: '', dueDate: '' });
  };

  
 
  useEffect(() => {
    // Scroll to the top when tasks change
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Apply fadeIn and scaleIn animations to the form when the component mounts
    formRef.current.style.animation = 'fadeIn 0.5s ease, scaleIn 0.5s ease';
    formRef.current.style.opacity = '1';
    formRef.current.style.transform = 'scale(1)';

    // Clean up animations after they finish
    const animationEndHandler = () => {
      formRef.current.style.animation = '';
      formRef.current.removeEventListener('animationend', animationEndHandler);
    };

    formRef.current.addEventListener('animationend', animationEndHandler);

    // Specify the dependencies to avoid eslint warnings
  }, [tasks]);
  

  const handleDelete = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
  };

  const handleComplete = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleRetrieve = (taskId) => {
    // Implement your retrieve logic here
    // You can update the tasks state accordingly
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
