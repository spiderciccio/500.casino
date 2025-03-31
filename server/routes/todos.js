import express from "express";
import Todo from "../models/todo.model.js";

export default function createTodoRouter(io) {
  const router = express.Router();

  // get all posts
  router.get("/", async (_, res) => {
    try {
      let results = await Todo.find().sort({ createdAt: -1 });
      res.json(results);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  });

  // create post
  router.post("/", async (req, res) => {
    try {
      if (!req.body.text) {
        res.status(400).json({ error: "Missing field text" });
        return;
      }
      const resp = await Todo.create(req.body);
      io.emit("todo-created", resp);
      res.json(resp);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  });

  // update post
  router.patch("/:id", async (req, res) => {
    try {
      const resp = await Todo.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      io.emit("todo-updated", resp);
      res.json(resp);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  });

  return router;
}
