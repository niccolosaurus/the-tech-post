const newBlogPost = async (event) => {
  event.preventDefault();
  const name = document.querySelector('#Blog-name').value.trim();
  const post_content = document.querySelector('#Blog-desc').value.trim();
  if (name && post_content) {
    const response = await fetch(`/api/Blog`, {
      method: 'POST',
      body: JSON.stringify({ name, post_content }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Could not create new Blog post.');
    }
  }
};

const deleteButton = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');
    const response = await fetch(`/api/Blog/${id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      document.location.replace('/Blog');
    } else {
      alert('Could not delete Blog post');
    }
  }
};

document
  .querySelector('.new-Blog-form')
  .addEventListener('submit', newBlogPost);

document
  .querySelector('.delete-entry')
  .addEventListener('click', deleteButton);