const router = require('express').Router();
const { Blog, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      include: User,
    });

    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    res.render('homepage', {
      blogs,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/blog/:id', async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        User,
        {
          model: Comment,
          include: [User],
        },
      ],
    });

    const blog = blogData.get({ plain: true });

    res.render('blog', {
      ...blog,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/edit/:id', async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        User,
        {
          model: Comment,
          include: [User],
        },
      ]
    });

    const blog = blogData.get({ plain: true });
    console.log(blog)
    res.render('edit', {
      ...blog,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/blog', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
    });
    const username = req.session.user_id
    const user = userData.get({ plain: true });
    const blogData = await Blog.findAll({
      where: {
        user_id: username
      }
    });

    const blogs = blogData.map((blog) => blog.get({ plain: true }));
    console.log(blogs)
    res.render('dashboard', {
      blogs,
      ...user,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
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
    const username = req.session.user_id
    const user = userData.get({ plain: true });
    const blogData = await Blog.findAll({
      where: {
        user_id: username
      }
    });

    const blogs = blogData.map((blog) => blog.get({ plain: true }));
    console.log(blogs)
    res.render('dashboard', {
      blogentries: blogs,
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