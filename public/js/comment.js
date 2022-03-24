const newCommentPost = async (event) => {
    event.preventDefault();
    alert('New comment.');
    const comment_content = document.querySelector('#comment').value.trim();
    const post_id = document.getElementById('postid').innerHTML;

    if (comment_content) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({ comment_content, post_id }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert("Comment could not be added.");
        }
    }
};

document
    .querySelector('#comment')
    .addEventListener('submit', newCommentPost);