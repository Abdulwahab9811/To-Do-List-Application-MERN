require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.createSecretToken = (id) => {
  try {
    const token = jwt.sign({ id }, process.env.TOKEN_KEY, {
      expiresIn: 3 * 24 * 60 * 60,
    });
    return token;
  } catch (error) {
    console.error("Error creating token:", error);
    return null;
  }
};
