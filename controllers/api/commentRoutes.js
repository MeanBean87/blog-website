// Purpose: commentRoutes.js is used to create, read, update, and delete comments
const router = require("express").Router();
const { User, Post, Comment } = require("../../models");
const { withAuth } = require("../../utils/auth");

// GET all comments
router.get("/", async (req, res) => {
  try {
    const commentData = await Comment.findAll({
      include: [{ model: User }, { model: Post }],
    });
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET one comment
router.get("/:id", async (req, res) => {
  try {
    const commentData = await Comment.findByPk(req.params.id, {
      include: [{ model: User }, { model: Post }],
    });

    if (!commentData) {
      res.status(404).json({ message: "No comment found with this id!" });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST a comment
router.post("/", withAuth, async (req, res) => {
  try {
    console.log(req.body);
    const newComment = await Comment.create({
      comment_content: req.body.comment,
      post_id: req.body.post_id,
      user_id: req.session.user_id,
    });
    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

// UPDATE a comment
router.put("/:id", withAuth, async (req, res) => {
  try {
    const updatedComment = await Comment.update(
      {
        comment_content: req.body.comment_text,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    if (!updatedComment) {
      res.status(404).json({ message: "No comment found with this id!" });
      return;
    }

    res.status(200).json(updatedComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE a comment
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!commentData) {
      res.status(404).json({ message: "No comment found with this id!" });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
