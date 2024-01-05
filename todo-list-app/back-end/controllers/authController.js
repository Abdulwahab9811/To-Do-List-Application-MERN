//controller/authController.js

const bcrypt = require('bcrypt');
const { insertUser, findUserByEmail , findUserByUsername } = require('../models/user');

const authController = {
  register: async (req, res) => {
    try {
      const { username, email, password } = req.body;

      const existingUser = await findUserByEmail(email);
      const existingUsername = await findUserByUsername(username);


      if (existingUser) {
        console.log('Email already in use:', email);
        return res.status(400).json({ error: 'Email already in use' });
      }

      if (existingUsername) {
        console.log('Usernme already in use:' , email);
        return res.status(400).json({ error: 'Username already in use' });
      }

      // Hash the password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      
      const userId = await insertUser({ username, email, password: hashedPassword });
      req.session.userId = userId;

      // Log newUser after it's created (you can remove this line)
      console.log('User saved:', { _id: userId, username, email });

      

      

      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Error in user registration:', error);
      res.status(500).json({ error: 'Internal server error' });
    } 
  },



  login: async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Find the user by email
      const user = await findUserByUsername(username) ;
  
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      // Compare the entered password with the hashed password
      const isPasswordMatch = await bcrypt.compare(password, user.password);
  
      if (!isPasswordMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      
      req.session.userId = user._id;
  
      
      res.status(200).json({
        message: 'Login successful',
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
        },
      });
    } catch (error) {
      console.error('Error in user login:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
  
};

module.exports = authController;
