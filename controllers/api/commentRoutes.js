const router = require("express").Router();
const { User, Post, Comment } = require("../../models");
const { withAuth, areAuth } = require("../../utils/auth");

// GET all comments
router.get("/", async (req, res) => {
  try {
    const comments = await Comment.findAll({});
    const commentData = comments.map((comment) => comment.get({ plain: true }));
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST a comment
router.post("/", withAuth, async (req, res) => {
    try {
        const newComment = await Comment.create({
        comment_text: req.body.comment_text,
        post_id: req.body.post_id,
        user_id: req.session.user_id,
        });
        res.status(200).json(newComment);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;