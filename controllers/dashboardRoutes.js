const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const { withAuth, areAuth } = require('../utils/auth');

// GET all posts for homepage
router.get('/',  async (req, res) => {
    try {
        const posts = await Post.findAll({
            where: {
                user_id: req.session.user_id
            },
            attributes: [
                'id',
                'title',
                'content',
                'created_at'
            ],
            include: [
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                },
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        })

        const userPosts = posts.map(post => post.get({ plain: true }));
        res.render('dashboard', {
            userPosts,
            logged_in: true
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
});

// GET one post
router.get('/edit/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            attributes: [
                'id',
                'title',
                'content',
                'created_at'
            ],
            include: [
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                },
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        })

        const post = postData.get({ plain: true });
        res.render('edit-post', {
            post,
            logged_in: true
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
});

// GET new post
router.get('/new', withAuth, async (req, res) => {
    try {
        res.render('new-post', {
            logged_in: true
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
});

module.exports = router;
