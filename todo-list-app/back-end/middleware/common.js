// const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
// const cors = require('cors');
// const express = require('express');
// const jwt = require('jsonwebtoken');
// const morgan = require('morgan');
// const session = require('express-session');

// const authenticateJWT = (req, res, next) => {
//  const token = req.header('x-auth-token');

//  if (!token) {
//     return res.status(401).json({ error: 'Unauthorized' });
//  }

//  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//     if (err) {
//       if (err.name === 'TokenExpiredError') {
//         return res.status(401).json({ error: 'Token has expired' });
//       }

//       return res.status(401).json({ error: 'Token is not valid' });
//     }

//     req.userId = decoded.userId;
//     next();
//  });
// };

// const app = express();

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// app.use(morgan('dev'));

// app.use(
//  cors({
//     origin: ["http://localhost:3000"],
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//  })
// );

// app.use(express.json());

// app.use(cookieParser());

// app.use(session({
//  secret: process.env.SESSION_SECRET || '5301e97645b8c3e1d956a3f06e117213cc7a30a75e0b54298f830fd264e56b6a',
//  resave: true,
//  saveUninitialized: true,
// }));

// app.use('/auth', authenticateJWT, authRoutes);

// app.use('/tasks', require('./routes/task'));

// // Error handling middleware
// app.use((err, req, res, next) => {
//  console.error(err.stack);
//  res.status(500).send({ error: err.toString() });
// });

// const uri = process.env.MONGO_URI;
// const client = new MongoClient(uri);

// const startServer = async () => {
//  try {
//     await connectToDatabase();
//     await client.connect();

//     app.listen(port, () => {
//       console.log(`Server is running on port ${port}`);
//     });
//  } catch (error) {
//     console.error('Error connecting to MongoDB:', error);
//     process.exit(1);
//  }
// };

// startServer();