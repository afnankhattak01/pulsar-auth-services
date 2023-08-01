const { signValidationSchema } = require("../authschemas/signupvalidation");

const ValidationFunction = async (body) => {
  let credentials = null;

  const value = await signValidationSchema.validateAsync(body, {
    abortEarly: false,
  });
  credentials = value;
  return credentials;
};

module.exports = { ValidationFunction };
