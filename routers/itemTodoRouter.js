const express = require("express");
const router = express.Router();

const {
  createItemTodo,
  editItemTodo,
  getItemsList,
  deleteItemTodo,
} = require("../controllers/itemTodoControllers");
const { authUser } = require("../middlewares/authUser");

router.post("/itemTodo", authUser, createItemTodo);
router.put("/itemTodo/:id",authUser, editItemTodo);
router.delete("/itemTodo/:id",authUser, deleteItemTodo);
router.get("/itemsTodo",authUser, getItemsList);

module.exports = router;
