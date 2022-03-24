const newBlogPost = async (event) => {
    event.preventDefault();
    const title = document.querySelector('#blog-title').value.trim();
    const blog_content = document.querySelector('#blog-desc').value.trim();
    if (title && blog_content) {
      const response = await fetch(`/api/blog`, {
        method: 'POST',
        body: JSON.stringify({ title, blog_content }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Could not create Blog post.');
      }
    }
  };
  
  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
      const response = await fetch(`/api/blog/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        document.location.replace('/blog');
      } else {
        alert('Could not delete post.');
      }
    }
  };
  
  document
    .querySelector('.new-blog-form')
    .addEventListener('submit', newBlogPost);
  
  document
    .querySelector('.delete-entry')
    .addEventListener('click', delButtonHandler);