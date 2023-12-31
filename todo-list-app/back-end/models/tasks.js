// models/task.js
const { ObjectId } = require('mongodb');

class Task {
  constructor(database) {
    this.collection = database.collection('Tasks');
  }

  async getAllTasks() {
    return await this.collection.find().toArray();
  }

  async createTask({ title, description }) {
    const newTask = {
      title,
      description,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const result = await this.collection.insertOne(newTask);
    return result.ops[0];
  }

  async updateTask(id, updates) {
    const result = await this.collection.updateOne({ _id: ObjectId(id) }, { $set: updates });
    return result.modifiedCount > 0;
  }

  async deleteTask(id) {
    const result = await this.collection.deleteOne({ _id: ObjectId(id) });
    return result.deletedCount > 0;
  }
}

module.exports = Task;
