const User = require("../models/user");

exports.userInfo = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findById(id)
      .select("-password")
      .then((user) => {
        res.status(200).json({
          success: true,
          user,
        });
      });
  } catch (error) {
    res.status(500).json({
      success: true,
      message: "get user info fail",
    });
  }
};

exports.editUserInfo = (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    User.findByIdAndUpdate(id, { name: name }, { new: true })
      .select("-password")
      .then((user) => {
        res.status(200).json({
          success: true,
          message: "update user info success",
          user,
        });
      });
  } catch (error) {
    res.status(500).json({
      success: true,
      message: "update user info fail",
    });
  }
};
