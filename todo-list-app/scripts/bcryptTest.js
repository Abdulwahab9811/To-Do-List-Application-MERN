// bcryptTest.js

const bcrypt = require('bcryptjs');

const hashedPassword = '$2a$12$if8Pt14H.Xe0BZ2Wvo6A5ONvUH0iFlGrhJ.n2e4VvpzN7vuh2OLVu';
const plainPassword = 'P@ssw0rd123';

(async () => {
  const match = await bcrypt.compare(plainPassword, hashedPassword);
  console.log('Passwords match:', match);
})();
