const router = require("express").Router();

const addUser = require("../controllers/user/addUser");
const filterUsers = require("../controllers/user/filterUsers");
const listAllUsers = require("../controllers/user/listAllUsers");
const userValidation = require("../middlewares/userValidation");

/* Routes */
router.post("/add", userValidation, addUser);
router.get("/filter", filterUsers);
router.get("/list", listAllUsers);

module.exports = router;
