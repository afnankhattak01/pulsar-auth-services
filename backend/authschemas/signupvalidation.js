const Joi = require("joi");

const signValidationSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),

  password: Joi.string().min(7).required(),
});

module.exports = { signValidationSchema };
