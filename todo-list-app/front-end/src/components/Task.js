// Updated Task component

import React, { useState,useEffect, useRef } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RestoreIcon from '@mui/icons-material/Restore';
import EditIcon from '@mui/icons-material/Edit';
import moment from 'moment';
import '../CSS/Task.css';


const Task = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '', dueDate: '' });
  const [editTask, setEditTask] = useState(null); // To track the task being edited

  const formRef = useRef(null);

  const sendRequest = async (url, options = {}) => {
    try {
      const response = await fetch(url, options);
  
      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error('API Request Error:', error);
      throw error; // Re-throw the error to allow the calling code to handle it
    }
  };
  

  const handleAddTask = async (e) => {
    e.preventDefault();

    try {
      const response = await sendRequest('http://localhost:5000/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      });

      const data = await response.json();

      setTasks((prevTasks) => [...prevTasks, data]);
      setNewTask({ title: '', description: '', dueDate: '' });
      // Provide feedback to the user (e.g., toast notification)
      alert('Task added successfully!');
    } catch (error) {
      console.error('Error adding task:', error);
      // Provide feedback to the user (e.g., toast notification)
      alert('Error adding task. Please try again.');
    }
  };

  const handleEditTask = (task) => {
    setEditTask(task);
    setNewTask({ title: task.title, description: task.description, dueDate: task.dueDate });
  };

  const handleUpdateTask = async () => {
    try {
      const response = await sendRequest(`http://localhost:5000/tasks/${editTask._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      });

      const data = await response.json();

      setTasks((prevTasks) =>
        prevTasks.map((task) => (task._id === editTask._id ? data : task))
      );
      setEditTask(null);
      setNewTask({ title: '', description: '', dueDate: '' });
      // Provide feedback to the user (e.g., toast notification)
      alert('Task updated successfully!');
    } catch (error) {
      console.error('Error updating task:', error);
      // Provide feedback to the user (e.g., toast notification)
      alert('Error updating task. Please try again.');
    }
  };

  const handleCancelEdit = () => {
    setEditTask(null);
    setNewTask({ title: '', description: '', dueDate: '' });
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await sendRequest('http://localhost:5000/tasks',{

        credentials: 'include',
       });

        if (!response.ok) {
          // Handle non-successful responses (e.g., unauthorized)
          throw new Error('Failed to fetch tasks');
        }
  
        const data = await response.json();


        if (Array.isArray(data)) {
          setTasks(data);
        } else {
          console.error('Unexpected data format:', data);
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
        
      }
    };

    fetchTasks();
  }, []); 

  const handleDelete = async (taskId) => {
    try {
      await sendRequest(`http://localhost:5000/tasks/${taskId}`, {
        method: 'DELETE',
      });

      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
      // Provide feedback to the user (e.g., toast notification)
      alert('Task deleted successfully!');
    } catch (error) {
      console.error('Error deleting task:', error);
      // Provide feedback to the user (e.g., toast notification)
      alert('Error deleting task. Please try again.');
    }
  };

  const handleComplete = async (taskId) => {
    try {
      const response = await sendRequest(`http://localhost:5000/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed: true }),
      });

      const data = await response.json();

      setTasks((prevTasks) =>
        prevTasks.map((task) => (task._id === taskId ? data : task))
      );
      // Provide feedback to the user (e.g., toast notification)
      alert('Task marked as completed!');
    } catch (error) {
      console.error('Error completing task:', error);
      // Provide feedback to the user (e.g., toast notification)
      alert('Error completing task. Please try again.');
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
        <div key={task._id} className={`task-card ${task.completed ? 'completed' : ''}`}>
          <div className="task-info">
            {editTask === task ? (
              <div className="edit-task-form">
                <input
                  type="text"
                  value={newTask.title}
                  onChange={(e) => setNewTask((prevTask) => ({ ...prevTask, title: e.target.value }))}
                />
                <textarea
                  value={newTask.description}
                  onChange={(e) => setNewTask((prevTask) => ({ ...prevTask, description: e.target.value }))}
                />
                <input
                  type="datetime-local"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask((prevTask) => ({ ...prevTask, dueDate: e.target.value }))}
                />
                <button onClick={handleUpdateTask}>Update Task</button>
                <button onClick={handleCancelEdit}>Cancel</button>
              </div>
            ) : (
              <>
                <h4 className="task-title">{task.title}</h4>
                <p className="task-description">{task.description}</p>
                <div className='task-meta'>
                  {task.dueDate && (
                    <p className='task-due-date'>{`Due: ${moment(task.dueDate).format('MMMM D, YYYY h:mm A')}`}</p>
                  )}
                </div>
              </>
            )}
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
            {!task.completed && (
              <EditIcon
                onClick={() => handleEditTask(task)}
                className="task-action-icon edit-task-btn"
              />
            )}
            {task.completed && (
              <RestoreIcon
                // Add necessary logic for task restoration
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
