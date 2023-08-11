const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");
const { withAuth, areAuth } = require("../utils/auth");

// GET all posts for homepage
router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      attributes: ["id", "post_title", "post_content", "created_at"],
      include: [
        {
          model: User,
          attributes: ["user_name"],
        },
      ],
    });
    const posts = postData.map((post) => post.get({ plain: true }));
    console.log(posts);
    res.render("homepage", {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET one post
router.get("/post/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      attributes: ["id", "title", "content", "created_at"],
      include: [
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
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    if (!postData) {
      res.status(404).json({ message: "No post found with this id!" });
      return;
    }

    const post = postData.get({ plain: true });
    res.render("selected-post", { post, logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Login route
router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    console.log("logged in")
    res.redirect("/");
    return;
  }
  res.render("login");
});

// Signup route
router.get('/signup', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('signup');
});

// Wildcard route
router.get("*", (req, res) => {
  res.status(404).send("404 Error!");
});

module.exports = router;
