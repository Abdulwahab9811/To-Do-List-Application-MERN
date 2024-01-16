//batchimport.js
const { MongoClient,ObjectId  } = require('mongodb');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer'); 
require('dotenv').config();

const uri = process.env.MONGO_URI;



const emailService = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'abdulcodes24@gmail.com',
    pass: 'Tamana2312!',
  },
});

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function importData() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const database = client.db('Database');

    // Import data into the "users" collection
    const hashedPassword1 = await bcrypt.hash('password1', 12);
    const hashedPassword2 = await bcrypt.hash('password2', 12);

    const users = await database.collection('Users').insertMany([
      { _id: ObjectId(), username: 'john_doe', email: 'user1@example.com', password: hashedPassword1 },
      { _id: ObjectId(), username: 'john_doe2', email: 'user2@example.com', password: hashedPassword2 },
    ]);

    // Import data into the "tasks" collection
    await database.collection('Tasks').insertMany([
      {
        taskName: 'Task 1',
        description: 'Description 1',
        userId: users[0]._id,
        dueDate: new Date('2024-01-15T12:00:00Z'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        taskName: 'Task 2',
        description: 'Description 2',
        userId: users[1]._id,
        dueDate: new Date('2024-01-20T12:00:00Z'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    // Import data into the "notifications" collection and send notifications
    // Import data into the "tasks" collection and send task-added notifications
for (const user of users) {
  const addedTask = {
    taskName: 'New Task',
    description: 'Description of the new task',
    userId: user._id,
    dueDate: new Date('2024-01-25T12:00:00Z'), // Set a due date for the new task
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  await database.collection('Tasks').insertOne(addedTask);

  const mailOptions = {
    from: 'abdulcodes24@gmail.com',
    to: user.email,
    subject: 'Task Added',
    text: `A new task has been added: ${addedTask.taskName}`,
  };

  emailService.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
}


    console.log('Data imported successfully');
  } finally {
    await client.close();
  }
}

// Run the importData function
importData();