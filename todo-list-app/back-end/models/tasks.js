const { ObjectId } = require('mongodb');

class Task {
  constructor(database) {
    this.collection = database.collection('Tasks');
  }

  async getAllTasks() {
    try {
      const tasks = await this.collection.find().toArray();
      console.log('All tasks:', tasks);
      return tasks;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  }

  async createTask({ title, description }) {
    try {
      const newTask = {
        title,
        description,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const result = await this.collection.insertOne(newTask);
      console.log('New task created:', result.ops[0]);
      return result.ops[0];
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  }

  async updateTask(id, updates) {
    try {
      const result = await this.collection.updateOne({ _id: ObjectId(id) }, { $set: updates });
      console.log('Update task result:', result);
      return result.modifiedCount > 0;
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  }

  async deleteTask(id) {
    try {
      const result = await this.collection.deleteOne({ _id: ObjectId(id) });
      console.log('Delete task result:', result);
      return result.deletedCount > 0;
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  }
}

module.exports = Task;
