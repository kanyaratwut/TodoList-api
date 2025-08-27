const Category = require("../models/category");
const User = require("../models/user");

exports.categoryList = async (req, res) => {
  try {
    await Category.find({ userId: req.user.id }).then((category) => {
      res.status(200).json({
        success: true,
        category,
      });
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "get category list fail",
    });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const { name, color, background } = req.body;

    await Category.create({
      name,
      color,
      background,
      userId: req.user.id,
    });

    res.status(200).json({
      success: true,
      message: "create category success",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "create category fail",
    });
  }
};

exports.editCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, color, background } = req.body;

    const updateCategory = await Category.findByIdAndUpdate(
      id,
      {
        name,
        color,
        background,
        userId: req.user.id,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "edit category success",
      data: updateCategory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "edit category fail",
    });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await Category.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "delete category success",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "delete category fail",
    });
  }
};
