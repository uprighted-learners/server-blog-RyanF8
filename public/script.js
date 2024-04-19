//grab our blog form
document.getElementById('blogForm').addEventListener('submit', (event) => {
    event.preventDefault();
    //grab our blog form values
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const body = document.getElementById('body').value;
    createPost(title, author, body);
    // clear input values in form after post form was used
    document.getElementById('title').value = "";
    document.getElementById('author').value = "";
    document.getElementById('body').value = "";
});

//function for getting all posts
function getPosts() {
    fetch("/blog/get/all")
    .then(response => response.json())
    .then(posts => {
        const postsList = document.getElementById("postLists");
        postsList.innerHTML = "";
        posts.forEach(post => {
            const li = document.createElement("li");
            li.textContent = `${post.title} by ${post.author}, ${post.body}`
            const editButton = document.createElement("button");
            editButton.textContent = 'Edit'
            editButton.onclick = function () { editPost(post.post_id) }
            li.appendChild(editButton);

            const deleteButton = document.createElement("button");
            deleteButton.textContent = 'Delete'
            deleteButton.onclick = function () { deletePost(post.post_id) }
            li.appendChild(deleteButton);

            postsList.appendChild(li);
        })
    })
};

//function for creating new posts
function createPost(title, author, body) {
    fetch("/blog/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ title, author, body })
    })
    .then(response => response.json())
    .then(post => {
        alert('Post Created!');
        getPosts();
    })
    .catch(error => {
        alert('Error creating new post: ' + error);
    })
};

//function for editing/updating posts 
function editPost(post_id) {
    const title = prompt("New title:");
    const author = prompt("New author:");
    const body = prompt("New body:");
    fetch(`/blog/update/${post_id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ title, author, body })
    })
        .then(response => {
            if (response.ok) {
                alert("Post updated!");
                getPosts(); 
            } else {
                alert("Error updating post");
            }
        })
        .catch(error => {
            alert("Error updating post: " + error);
        })
};

//function for deleting posts
function deletePost(post_id) {
    fetch(`/blog/delete/${post_id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => {
            if (response.ok) {
                alert("Post deleted!");
                getPosts();
            } else {
                alert("Error deleting post");
            }
        })
        .catch(error => {
            alert("Error deleting post: " + error);
        })
};

//initiate our get posts function 
getPosts();

