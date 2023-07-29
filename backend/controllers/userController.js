const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const { CreateToken } = require("../jwt/jwt");
const { ValidationFunction } = require("../commom/validationfunction");

const UserLogin = async (req, res) => {
  let isSucess = false;

  let errorMsg = "user";

  const { email, password } = req.body;
  if (email && password) {
    try {
      const isValidEmail = await userModel.findOne({ email });
      if (isValidEmail) {
        const isPasswordtrue = await bcrypt.compare(
          password,
          isValidEmail.password
        );

        if (isPasswordtrue) {
          //  success
          const token = CreateToken(isValidEmail._id);
          return res.status(200).json({
            message: "User authentucated successfully!",
            success: true,
            email: isValidEmail.email,
            token,
          });
        }

        return res.status(401).json({
          message: "wrong password , please try again!",
          success: false,
        });
      }
      return res.status(400).json({
        message: "user does not exists ! please try again!",
        success: false,
      });
    } catch (error) {
      return res.status(500).json({
        message: "error try again",
        success: false,
      });
    }
  } else {
    return res.status(409).json({
      message: "Please provide all fields and try again !",
      success: false,
    });
  }
};

const UserSignup = async (req, res) => {
  const credentials = await ValidationFunction(req.body);

  if (credentials && Object.keys(credentials).length > 0) {
    const { email, password } = credentials;

    try {
      let user = await userModel.Signup(email, password);

      if (user) {
        const token = CreateToken(user._id);
        return res.status(200).json({
          success: true,
          token,
          message: "User Created Sucessfully!",
          email: user.email,
        });
      }
    } catch (error) {
      console.log("error", error);
      return res.status(400).json({
        success: false,
        message: "failed to store user, try again!",
        error: error,
      });
    }
  } else {
    return res.status(500).json({
      success: false,
      message: "failed to store user, try again!",
    });
  }
};

module.exports = { UserLogin, UserSignup };
