const bcrypt = require('bcrypt');
const User = require('../models/user');

const authController = {
  register: async (req, res) => {
    try {
      const { username, email, password } = req.body;

      // Hash the password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Create a new user with the hashed password
      const newUser = new User({ username, email, password: hashedPassword });
      
      // Save the user to the database
      await newUser.save();

      // You might want to generate and send a JWT token here for immediate login after registration
      // const token = jwt.sign({ userId: newUser._id }, 'your_secret_key', { expiresIn: '1h' });

      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Error in user registration:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Find the user by email
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Compare the entered password with the hashed password
      const isPasswordMatch = await bcrypt.compare(password, user.password);

      if (!isPasswordMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      

      res.status(200).json({ message: 'Login successful' });
    } catch (error) {
      console.error('Error in user login:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
};

module.exports = authController;
