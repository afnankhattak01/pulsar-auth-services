const JWT = require("jsonwebtoken");

const CreateToken = (_id) => {
  const token = JWT.sign({ _id }, process.env.SECRET, { expiresIn: "1*60*60" });
  return token;
};

module.exports = { CreateToken };
