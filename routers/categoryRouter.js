const express = require("express");
const router = express.Router();

const {
  categoryList,
  createCategory,
  editCategory,
  deleteCategory,
} = require("../controllers/categoryControllers");
const { authUser } = require("../middlewares/authUser");

router.get("/categoryList", authUser, categoryList);
router.post("/category", authUser, createCategory);
router.put("/category/:id", authUser, editCategory);
router.delete("/category/:id", authUser, deleteCategory);

module.exports = router;
