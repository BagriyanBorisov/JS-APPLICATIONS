const section = document.getElementById("topic-view")
const main = document.getElementsByTagName("main")[0];

const url = "http://localhost:3030/jsonstore/collections/myboard/posts";
const urlComments = "http://localhost:3030/jsonstore/collections/myboard/comments";
let postId;

section.remove();


export async function showDetailsView(idPost) {
    postId = idPost;
    const topic = await getPostData(postId);
    const comments = await getComments(); //id???
    const currDom =  createTopic(topic, comments);

    section.replaceChildren(currDom);
    main.replaceChildren(section);
    const formComments = section.querySelector('form');
    formComments.addEventListener('submit', onSubmit);
}


function createTopic(topic, comments) {

    const container = document.createElement("div");
    container.setAttribute('class', "container");
    const themeWrap = document.createElement("div")
    themeWrap.setAttribute("class", "theme-content");
    themeWrap.innerHTML = `
    <div class="theme-title">
    <div class="theme-name-wrapper">
    <div class="theme-name">
    <h2>${topic.topicName}</h2>
            </div>
            </div>
            </div>`;

    const postAndCommentDiv = document.createElement("div");
    postAndCommentDiv.setAttribute('class', 'comment');
    postAndCommentDiv.innerHTML =
        `<div class="header">
    <img src="./static/profile.png" alt="avatar">
    <p><span>${topic.username}</span> posted on <time>${topic.date}</time></p>
    <p class="post-content">${topic.postText}</p>
    </div>`;
        Object.values(comments).forEach(x => {
            let comment = generateComment(x);
            postAndCommentDiv.innerHTML += comment.innerHTML;
        });
    themeWrap.appendChild(postAndCommentDiv);
    themeWrap.innerHTML +=
    `<div class="answer-comment">
    <p><span>currentUser</span> comment:</p>
    <div class="answer">
        <form>
            <textarea name="postText" id="comment" cols="30" rows="10"></textarea>
            <div>
                <label for="username">Username <span class="red">*</span></label>
                <input type="text" name="username" id="username">
            </div>
            <button>Post</button>
        </form>
    </div>
</div>
</div>`
 container.appendChild(themeWrap);
 return container;
}

function generateComment(c) {
    let userComDiv = document.createElement("div");
    userComDiv.setAttribute('class', 'user-comment');
    userComDiv.innerHTML =
        `<div class="topic-name-wrapper">
    <div class="topic-name">
        <p><strong>${c.username}</strong> commented on <time>${c.date}</time></p>
        <div class="post-content">
            <p>${c.postText}</p>
        </div>
    </div>
</div>`
    return userComDiv;
}



async function getPostData(idPost) {
    const response = await fetch(url);
    const data = await response.json();
    const filteredData = Object.values(data).filter(x => x._id == idPost);

    return filteredData[0];
}

async function getComments() {
    const response = await fetch(urlComments);
    const data = await response.json();
    const filteredComments = Object.values(data).filter(x => x.postId == postId)
    return filteredComments;
}

function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { postText, username } = Object.fromEntries(formData);
    sendComment({ postText, username, date: new Date(), postId })
    //formComments.reset();
    showDetailsView(postId);
}

async function sendComment(body) {
    await fetch(
        urlComments, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });
    console.log("sent comment");
}

