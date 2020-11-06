// Grab elements from DOM and use them as Element objects in JS
const postsContainer = document.getElementById('posts-container');
const loadButton = document.getElementById('load-posts-btn');

// Variables for API call
let limit = 5;
let page = 1;


// Get posts from JSON Placeholder API using axios
async function getPosts() {
    // this is similar to python requests module!
    const res = await axios(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);
    // increment the counter for the next API call
    page++;
    return res.data;
}


// Put the posts in the DOM
async function showPosts() {
    const posts = await getPosts();

    // loop through posts 
    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.innerHTML = `
            <h3>post #${post.id}</h3>
            <div> 
                <h2 class="post-title">${post.title}</h2>
                <p class="post-body">${post.body}</p>
            </div>
        `;

        // Dynamically add created post to container
        postsContainer.appendChild(postElement);
    })
}


loadButton.addEventListener("click", () => {
    showPosts();
});

