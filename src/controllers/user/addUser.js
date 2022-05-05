const User = require("../../models/User");
require("dotenv").config();

module.exports = async (req, res) => {
  try {
    const { name, age } = req.body;

    const newUser = await new User({
      name,
      age,
    });

    const user = await newUser.save();
    if (user._id) {
      return res.status(201).json({
        message: `User created successfully`,
        data: { name: user.name, age: user.age },
      });
    }
  } catch (error) {
    console.error({ error });
    return res.status(500).json({
      error: error.message,
    });
  }
};
