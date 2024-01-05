// models/tasks.js

class Task {
   constructor(database) {
      this.db = database;
   }
  
   async getAllTasks() {
      return await this.db.collection('tasks').find().toArray();
   }
  
   async createTask(task) {
      const result = await this.db.collection('tasks').insertOne(task);
      return result.ops[0];
   }
  
   async updateTask(taskId, updates) {
      const result = await this.db.collection('tasks').updateOne({ _id: new ObjectId(taskId) }, { $set: updates });
      return result.modifiedCount > 0;
   }
  
   async deleteTask(taskId) {
      const result = await this.db.collection('tasks').deleteOne({ _id: new ObjectId(taskId) });
      return result.deletedCount > 0;
   }
  }
  
  module.exports = Task;