//Purpose: index.js is used to collect the packaged group of API endpoints and prefix them with the path
const router = require("express").Router();

const userRoutes = require("./userRoutes.js");
const postRoutes = require("./postRoutes.js");
const commentRoutes = require("./commentRoutes.js");

router.use("/users", userRoutes);
router.use("/post", postRoutes);
router.use("/comments", commentRoutes);

module.exports = router;
