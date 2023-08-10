const router = require("express").Router();
const { User, Post, Comment } = require("../../models");
const { withAuth, areAuth } = require("../../utils/auth");

// GET all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.findAll({
      attributes: ["id", "title", "content", "created_at"],
      order: [["created_at", "DESC"]],
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
          attributes: [
            "id",
            "comment_text",
            "post_id",
            "user_id",
            "created_at",
          ],
          include: {
            model: User,
            attributes: ["username"],
          },
        },
      ],
    });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET one post
router.get("/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      attributes: ["id", "title", "content", "created_at"],
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
          attributes: [
            "id",
            "comment_text",
            "post_id",
            "user_id",
            "created_at",
          ],
          include: {
            model: User,
            attributes: ["username"],
          },
        },
      ],
    });
    if (!postData) {
      res.status(404).json({ message: "No post found with this id!" });
      return;
    }
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST a post
router.post("/", withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.user_id,
    });
    res.status(200).json(newPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// PUT/update a post
router.put("/:id", withAuth, async (req, res) => {
  try {
    const updatedPost = await Post.update(
      {
        title: req.body.title,
        content: req.body.content,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    if (!updatedPost) {
      res.status(404).json({ message: "No post found with this id!" });
      return;
    }
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE a post
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const deletedPost = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deletedPost) {
      res.status(404).json({ message: "No post found with this id!" });
      return;
    }
    res.status(200).json(deletedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
