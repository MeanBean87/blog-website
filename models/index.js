const user = require("./Users");
const post = require("./Posts");
const comment = require("./Comments");

user.hasMany(post, {
    foreignKey: "user_id",
    onDelete: "CASCADE",
});

post.belongsTo(user, {
    foreignKey: "user_id",
});

user.hasMany(comment, {
    foreignKey: "user_id",
    onDelete: "CASCADE",
});

comment.belongsTo(user, {
    foreignKey: "user_id",
});

post.hasMany(comment, {
    foreignKey: "post_id",
    onDelete: "CASCADE",
});

comment.belongsTo(post, {
    foreignKey: "post_id",
});

module.exports = { user, post, comment };
