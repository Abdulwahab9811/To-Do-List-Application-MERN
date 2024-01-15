const crypto = require('crypto');
const tokenKey = crypto.randomBytes(32).toString('hex');
console.log(tokenKey);
