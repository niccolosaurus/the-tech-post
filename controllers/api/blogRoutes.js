const router = require('express').Router();
const { Blog } = require('../../models');
const withAuth = require('../../utils/auth.js');

router.post('/', async (req, res) => {
  try {
    const newBlog = await Blog.create({
        ...req.body,
        user_id: req.session.user_id,
    });
    res.status(200).json(newBlog);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/edit/:id', async (req, res) => {
    try {
        console.log(req.body)
        const updateBlog = await Blog.update(
        {
            name: req.body.name,
            blog_content: req.body.blog_content,
        },
        { where: { id: req.body.id} }
        );
        res.status(200).json(updateBlog);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
    const blogData = await Blog.destroy({
        where: {
            id: req.params.id,
            user_id: req.session.user_id,
        },
    });

    if (!blogData) {
        res.status(404).json({ message: "No blogs found."});
        return;
    }

    res.status(200).json(blogData);
} catch (err) {
    res.status(500).json(err);
}
});

module.exports = router;