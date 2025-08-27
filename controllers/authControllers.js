const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(name, email, password);

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "กรุณากรอกข้อมูลให้ครบ",
      });
    }

    //Check Email in DB already?
    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        success: false,
        message: "มีอีเมลนี้ในระบบแล้ว",
      });
    }

    //Hash Password
    const hassPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hassPassword,
    });

    res.status(200).json({
      success: true,
      message: "register success",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "register fail",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //check mail in DB
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "ไม่พบอีเมลนี้ในระบบ",
      });
    }

    //check password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "รหัสผ่านไม่ถูกต้อง",
      });
    }

    //create payload
    const payload = {
      id: user._id,
      email: user.email,
      name: user.name,
    };

    //generate token
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
      (err, token) => {
        if (err) {
          res.status(500).json({
            success: false,
            message: "login fail",
          });
        }

        res.status(200).json({
          success: true,
          message: "login success",
          token,
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
          },
        });
      }
    );
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "login fail",
    });
  }
};
