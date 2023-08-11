const router = require("express").Router();
const { User, Post, Comment } = require("../../models");

// GET all users
router.get("/", async (req, res) => {
  try {
    const users = await User.findAll({});
    const userData = users.map((user) => user.get({ plain: true }));
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET one user
router.get("/:id", async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id, {
      attributes: { exclude: ["password"] },
      include: [
        {
          model: Post,
          attributes: ["id", "title", "content", "created_at"],
        },
        {
          model: Comment,
          attributes: ["id", "comment_text", "created_at"],
          include: {
            model: Post,
            attributes: ["title"],
          },
        },
      ],
    });

    if (!userData) {
      res.status(404).json({ message: "No user found with this id!" });
      return;
    }

    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST/Create a user
router.post("/", async (req, res) => {
  try {
    console.log(req.body)
    const newUser = await User.create({
      user_name: req.body.username,
      password: req.body.password,
    });
    console.log(newUser)
    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.username = newUser.user_name;
      req.session.logged_in = true;
    });

    res.status(200).json(newUser);
  } catch (err) {
    res.status(400).json(console.log(err));
  }
});

// POST/Login a user
router.post("/login", async (req, res) => {
  try {
    console.log(req.body)
    const userData = await User.findOne({
      where: { user_name: req.body.username },
    });
    console.log(userData);
    if (!userData) {
      res.status(400).json({ message: "Invalid Username" });
      console.log("Invalid Username")
      return;
    }

    const validPassword = userData.validatePassword(req.body.password);
    console.log(validPassword)
    if (!validPassword) {
      console.log("Invalid Password")
      res.status(400).json({ message: "Invalid Password" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.json({ user: userData, message: "You are now logged in!" });
      console.log("You are now logged in!")
    });

    

  } catch (err) {
    res.status(400).json(err);
  }
});

// POST/Logout a user
router.post('/logout', async (req, res) => {
  try {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  } catch {
    res.status(400).end();
  }
});

module.exports = router;