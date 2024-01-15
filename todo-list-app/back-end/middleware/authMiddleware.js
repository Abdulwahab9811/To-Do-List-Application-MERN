// const jwt = require('jsonwebtoken');

// const authenticateJWT = (req, res, next) => {
//   const token = req.header('x-auth-token');

//   if (!token) {
//     return res.status(401).json({ error: 'Unauthorized' });
//   }

//   jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//     if (err) {
//       if (err.name === 'TokenExpiredError') {
//         return res.status(401).json({ error: 'Token has expired' });
//       }

//       return res.status(401).json({ error: 'Token is not valid' });
//     }

//     req.userId = decoded.userId;
//     next();
//   });
// };

// module.exports = authenticateJWT;