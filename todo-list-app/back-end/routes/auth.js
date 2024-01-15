const { Signup , Signin } = require("../controllers/authController");
const router = require("express").Router();

router.post("/signup", Signup);
router.post('/signin', Signin)

module.exports = router;