const router = require('express').Router();
const { Blog, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all posts and JOIN with user data
    const postData = await Blog.findAll({
      include: User,
    });

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', {
      posts: posts,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/dashboard', async (req, res) => {
  try {
    // Get all posts and JOIN with user data
    const postData = await Blog.findAll({
      include: User,
    });

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('dashboard', {
      posts: posts,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/Blog/:id', async (req, res) => {
  try {
    const postData = await Blog.findByPk(req.params.id, {
      include: [
        User,
        {
          model: Comment,
          include: [User],
        },
      ],
    });

    const post = postData.get({ plain: true });

    res.render('Blog', {
      ...post,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/edit/:id', async (req, res) => {
  try {
    const postData = await Blog.findByPk(req.params.id, {
      include: [
        User,
        {
          model: Comment,
          include: [User],
        },
      ]
    });

    const post = postData.get({ plain: true });
    console.log(post)
    res.render('edit', {
      ...post,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/Blog', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
    });
    const identity = req.session.user_id
    const user = userData.get({ plain: true });
    const postData = await Blog.findAll({
      where: {
        user_id: identity
      }
    });

    const posts = postData.map((post) => post.get({ plain: true }));
    console.log(posts)
    res.render('dashboard', {
      posts: posts,
      ...user,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
    });
    const identity = req.session.user_id
    const user = userData.get({ plain: true });
    const postData = await Blog.findAll({
      where: {
        user_id: identity
      }
    });

    const posts = postData.map((post) => post.get({ plain: true }));
    console.log(posts)
    res.render('dashboard', {
      blogentries: posts,
      ...user,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  res.render('signup');
});


module.exports = router;