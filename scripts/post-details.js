function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

function showPostDetails() {
    const postId = getQueryParam('postId');

    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
        .then(response => response.json())
        .then(post => {
            fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
                .then(response => response.json())
                .then(comments => {
                    localStorage.setItem('comments', JSON.stringify(comments));

                    const postDetails = document.getElementById('postDetails');
                    postDetails.innerHTML = `
                                                     <h1>User ID: ${post.userId}</h1>
                                                     <h2>Post ID: ${post.id}</h2>
                                                     <h3>${post.title}</h3>
                                                     <h4>${post.body}</h4>
                             `;
                    const commentsContainer = document.getElementById('commentsContainer');
                    comments.forEach(comment => {
                        const commentElement = document.createElement('p');
                        const commentName = document.createElement('h5');
                        const commentEmail = document.createElement('h5');
                        commentName.innerText = `Name: ${comment.name}`;
                        commentEmail.innerText = `Email: ${comment.email}`;
                        commentElement.innerText = `${comment.body}`;
                        commentsContainer.append(commentName, commentEmail, commentElement);
                    });
                });
        });
}

showPostDetails();