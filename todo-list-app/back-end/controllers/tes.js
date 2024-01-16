const bcrypt = require('bcrypt');

const test =  async () => {
const hashedPassword = await bcrypt.hash('P@ssw0rd1234', 12)

const result = await bcrypt.compare('P@ssw0rd1234',hashedPassword)


console.log(result);

}
test();