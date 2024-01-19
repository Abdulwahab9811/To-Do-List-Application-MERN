// authMiddleware.js
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.cookies.token; // Adjust the cookie name if needed

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized', success: false });
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    console.log('Decoded Token:', decoded);
    req.user = decoded;
    console.log('req.user:', req.user); // Log the attached user information
    next();
  } catch (error) {
    console.error('Token Verification Error:', error);
    return res.status(401).json({ message: 'Unauthorized', success: false });
  }
};
