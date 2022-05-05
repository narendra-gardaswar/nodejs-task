const Joi = require("joi");

const userSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `Name is required`,
  }),
  age: Joi.number().required().messages({
    "any.required": `Age is required`,
  }),
});

module.exports = (req, res, next) => {
  const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true, // remove unknown props
  };
  try {
    const { error } = userSchema.validate(req.body, options);
    if (error) {
      return res
        .status(400)
        .json({ status: 400, response: error.details[0].message });
    } else {
      next();
    }
  } catch (error) {
    logger.error(error.stack);
    return res.status(500).json({
      status: 500,
      response: "Internal Server Error",
    });
  }
};
