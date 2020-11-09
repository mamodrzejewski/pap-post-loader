/**
 * POST LOADER APP
 * PAP 20Z
 * author: Mateusz Modrzejewski
 * 
 * This is a very simple application created for a programming course.
 * It allows to load 5 posts from the JSON placeholder API and display
 * them on the screen. It uses HTML5, CSS3 and JS with axios.
 */

/**
 * JS allows you to grab elements from the DOM and interact with
 * them using your code.
 * 
 * Here we are grabbing:
 * a) the posts container, which is an empty div that we will dynamically
 *    load our posts into.
 * b) the load button, to which we will add a click event listener. 
 * 
 * This is a small application and we have put id's on the HTML tags,
 * so we can use document.getElementById()
 */
const postsContainer = document.getElementById('posts-container');
const loadButton = document.getElementById('load-posts-btn');

/**
 * Set up some variables for the API call.
 */
let limit = 5;
let page = 1;


/** 
 * Get posts from JSON Placeholder API using axios.
 * 
 * This function uses the async/await keywords which
 * were introduced in ES8. Together with axios (an external library),
 * the async/await syntax will allow you to perform simple API calls
 * similar to the way you have done it using python's requests module.
 * 
 * Returns the data from the GET request.
 */
async function getPosts() {
    const res = await axios(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);
    page++;
    return res.data;
}


/**
 * Load 5 more posts into the DOM.
 * 
 * This function calls getPosts() to get the data 
 * and then creates a new DOM elemnent for each of 
 * the posts.
 * 
 * As an exercise, try to refactor the loop in this function! 
 * HINT: you can start by writing a createPost() function.
 */
async function loadPosts() {
    const posts = await getPosts();

    // for each post create a new DOM element
    posts.forEach(post => {
        // in JS we can create DOM elements out of nowhere
        const postElement = document.createElement('div');
        // add post class for styling (see .post in the CSS)
        postElement.classList.add('post');
        // add inner HTML and plug in values from the data
        postElement.innerHTML = `
            <h2 class="post-id">post #${post.id}</h3>
            <div> 
                <h2 class="post-title">${post.title}</h2>
                <p class="post-body">${post.body}</p>
            </div>
        `;
        // Add created post to container
        postsContainer.appendChild(postElement);
    });
}

/** 
 * Add event listener to the load posts button.
 * 
 * The type of event is "click" and the second parameter is 
 * an arrow function which takes no arguments and calls showPosts().
 * After clicking the button, the function will be called.
 */
loadButton.addEventListener("click", () => loadPosts());