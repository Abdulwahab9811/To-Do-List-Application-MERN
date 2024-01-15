// //useVerification.js

// const User = require("../models/user");
// const jwt = require("jsonwebtoken");

// module.exports.userVerification = async (req, res, next) => {
//   const token = req.cookies.token;

//   if (!token) {
//     return res.json({ status: false });
//   }

//   jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
//     if (err) {
//       return res.json({ status: false });
//     } else {
//       const user = await User.findById(data.userId); // Use data.userId

//       if (user) {
//         req.authenticatedUser = user;
//         next(); // Continue to the next middleware or route handler
//       } else {
//         return res.json({ status: false });
//       }
//     }
//   });
// };
