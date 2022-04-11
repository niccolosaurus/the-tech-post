const newBlogPost = async (event) => {
    event.preventDefault();

    const id = document.getElementById('Blog').innerHTML
    const name = document.querySelector('#Blog-name').value.trim();
    const post_content = document.getElementById('Blog-desc').value.trim();

    if (name && post_content) {
        const response = await fetch(`/api/blog/edit/${id}`, {
            method: 'POST',
            body: JSON.stringify({ id, name, post_content }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            document.location.replace('/');
        } else {
            alert("No Blog post created.");
        }
    }
};

const deleteButton = async (event) => {
    if (event.target.getAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');
        const response = await fetch(`/api/blog/${id}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            document.location.replace('/blog');
        } else {
            alert("Could not delete the post.");
        }
    }
};

document
    .querySelector('#submitIt')
    .addEventListener('click', newBlogPost);
  
  document
    .querySelector('#deleteIt')
    .addEventListener('click', deleteButton);
