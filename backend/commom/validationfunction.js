const { signValidationSchema } = require("../authschemas/signupvalidation");

const ValidationFunction = async (body) => {
  let credentials = null;

  try {
    const value = await signValidationSchema.validateAsync(body, {
      abortEarly: false,
    });
    credentials = value;
    return credentials;
  } catch (err) {
    console.log("err", err);
  }
  return credentials;
};

module.exports = { ValidationFunction };
