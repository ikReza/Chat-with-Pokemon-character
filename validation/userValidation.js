const Joi = require("@hapi/joi");

const registerValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().required().min(4),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(5),
    birthday: Joi.date(),
  });

  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().required().min(4),
    password: Joi.string().required().min(5),
  });

  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
