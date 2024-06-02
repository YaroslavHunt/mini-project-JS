function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}
function showUser() {
    const userId = getQueryParam('id');
    const usersStorage = JSON.parse(localStorage.getItem('users'));
    const user = usersStorage.find(user => user.id === parseInt(userId));

    if (user) {
        fetch(`https://jsonplaceholder.typicode.com/users/${user.id}/posts`)
            .then(response => response.json())
            .then(posts => {
                localStorage.setItem('posts', JSON.stringify(posts));

                const userInfo = document.getElementById('currentUser');
                userInfo.innerHTML = `
                        <div id="currentUserInfo">
                         <p>ID: ${user.id}</p>
                         <p>Name: ${user.name}</p>
                         <p>Username: ${user.username}</p>
                         <p>Email: ${user.email}</p>
                         <p>Address:</p>
                         <ul>
                             <li>Street: ${user.address.street}</li>
                             <li>Suite: ${user.address.suite}</li>
                             <li>City: ${user.address.city}</li>
                             <li>Zipcode: ${user.address.zipcode}</li>
                             <li>Geo: (${user.address.geo.lat}, ${user.address.geo.lng})</li>
                         </ul>
                         <p>Phone: ${user.phone}</p>
                         <p>Website: ${user.website}</p>
                         <p>Company:</p>
                         <ul>
                             <li>Name: ${user.company.name}</li>
                             <li>Catch Phrase: ${user.company.catchPhrase}</li>
                             <li>BS: ${user.company.bs}</li>
                         </ul>
                         </div>
                         <button id="postInfo">post of current user</button>
                         <div id="postsContainer" class="posts"></div>
                          <div id="myModal" class="modal">
                            <div class="modal-content">
                                <span class="close">&#x2715;</span>
                                <div class="postTitles"></div>
                            </div>
                          </div>
            `;
                const postsContainer = document.getElementById('postsContainer');
                posts.forEach(post => {
                    const postElement = document.createElement('p');
                    postElement.innerText = `Post ID: ${post.id} \n\t Title: ${post.title}`;
                    postsContainer.appendChild(postElement);
                });

                const modal = document.getElementById("myModal");
                const postInfo = document.getElementById('postInfo');
                const close = document.getElementsByClassName("close")[0];

                postInfo.onclick = function () {
                    modal.style.display = 'block';
                    const postTitlesContainer = document.querySelector('.postTitles');
                    posts.forEach(post => {
                        const postTitle = document.createElement('p');
                        const postSpan = document.createElement('span');
                        postSpan.classList.add('postTitle');
                        postSpan.textContent = post.title;
                        postSpan.onclick = function () {
                            window.location.href = `post-details.html?postId=${post.id}`;
                        };
                        postTitle.appendChild(postSpan);
                        postTitlesContainer.appendChild(postTitle);
                    });
                    close.onclick = function() {
                        modal.style.display = 'none';
                        while (postTitlesContainer.firstChild) {
                            postTitlesContainer.removeChild(postTitlesContainer.firstChild);
                        }
                    }
                }


                window.onclick = function(ev) {
                    if (ev.target === modal) {
                        modal.style.display = 'none';
                    }
                }
            });
    }
}


showUser();