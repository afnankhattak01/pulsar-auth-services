const JWT = require("jsonwebtoken");

const CreateToken = (_id) => {
  const token = JWT.sign({ _id }, process.env.SECRET, { expiresIn:"1h" });
  return token;
};

module.exports = { CreateToken };
