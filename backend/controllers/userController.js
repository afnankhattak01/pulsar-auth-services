const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const { CreateToken } = require("../jwt/jwt");
const { ValidationFunction } = require("../commom/validationfunction");

const UserLogin = async (req, res) => {

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
  let validatonError = null;

  try {
    const credentials = await ValidationFunction(req.body);
  } catch (error) {
    validatonError = error;
    return res.status(403).json({
      success: false,
      message: "failed to create new user, validation error try again!",
      data: {
        error: error.details ? error.details : error,
      },
    });
  }

  if (!validatonError) {
    const { email, password } = req.body;

    try {
      let user = await userModel.Signup(email, password);

      if (user) {
        const token = CreateToken(user._id);
        return res.status(200).json({
          success: true,
          message: "User Created Sucessfully!",
          data: {
            token,
            email: user.email,
          },
        });
      }
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "Failed to create new user!",
        data: {
          error: error.message,
        },
      });
    }
  } else {
    return res.status(500).json({
      success: false,
      message: "failed to store user, try again!",
      data: {
        error: validatonError,
      },
    });
  }
};

module.exports = { UserLogin, UserSignup };
