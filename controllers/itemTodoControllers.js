const Category = require("../models/category");
const ItemsTodo = require("../models/itemsTodo");

exports.getItemsList = async (req, res) => {
  try {
    await ItemsTodo.find({ userId: req.user.id }).then((items) => {
      res.status(200).json({
        success: true,
        items,
      });
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "get items list fail",
    });
  }
};

exports.createItemTodo = async (req, res) => {
  try {
    const { name, description, date, categoryId } = req.body;

    //find category
    const category = await Category.findById({ _id: categoryId });

    let payload = {
      name,
      description,
      date: new Date(date),
      userId: req.user.id,
    };

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "category not found",
      });
    } else {
      payload.categoryId = categoryId;
    }

    //สร้าง item ที่เชื่อมกับ category
    const items = await ItemsTodo.create(payload);

    res.status(200).json({
      success: true,
      message: "create success",
      data: items,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "create fail",
    });
  }
};

exports.editItemTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, date, categoryId } = req.body;

    const category = await Category.findById({ _id: categoryId });

    let payload = {
      name,
      description,
      date: new Date(date),
      userId: req.user.id,
    };

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "category not found",
      });
    } else {
      payload.categoryId = categoryId;
    }

    const items = await ItemsTodo.findByIdAndUpdate(id, payload, { new: true });

    res.status(200).json({
      success: true,
      message: "edit success",
      data: items,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "edit fail",
    });
  }
};

exports.deleteItemTodo = async (req, res) => {
  try {
    await ItemsTodo.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: "delete success",
    });
  } catch (error) {
    res.status(500).json({
      success: true,
      message: "delete fail",
    });
  }
};
