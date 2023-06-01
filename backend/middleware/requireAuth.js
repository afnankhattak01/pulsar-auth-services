const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res
      .status(401)
      .json({ message: "Not authorized for this request!", success: false });
  }

  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.SECRET);

    req.user = await userModel.findOne({ _id }).select("_id");
    next();
  } catch (error) {
    console.log(error);

    res
      .status(401)
      .json({ message: "Not authorized for this request!", success: false });
  }
};

module.exports = { requireAuth };
