const newComment = async (event) => {
    event.preventDefault();
    alert('hello-world');
    const comment_text = document.querySelector('#comment').value.trim();
    const post_id = document.getElementById('postid').innerHTML;

    if (comment_text) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({ comment_text, post_id }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert("Could not add a comment.");
        }
    }
};

document
    .querySelector('#comment')
    .addEventListener('submit', newComment);