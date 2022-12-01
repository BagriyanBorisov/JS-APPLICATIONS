import {showDetailsView} from "./detailsView.js";

const section = document.getElementById("home-view");
const main = document.getElementsByTagName("main")[0];
const form = section.querySelector('form');
const topicContainer = section.querySelector(".topic-container");
const url = "http://localhost:3030/jsonstore/collections/myboard/posts"

form.addEventListener("submit", onSubmit);

section.remove();
export async function showCreateView(){
    const topics = await loadPosts();
    if(topics === undefined){
        return main.replaceChildren(section);
    }
    const topicsToAttach = Object.values(topics).map(x => createPost(x));

    let anchors = topicsToAttach.map(x =>
        x.querySelector("a").addEventListener("click", onAnchor)
        );


    topicContainer.replaceChildren(...topicsToAttach);
    main.replaceChildren(section);
}


async function onSubmit(ev) {
    ev.preventDefault();
    if (ev.submitter.textContent == "Cancel") {
        form.reset();
        return;
    }
        const formData = new FormData(ev.target)
        const {topicName, username, postText} = Object.fromEntries(formData);
        await sendPost({topicName, username, postText, date: new Date()});   
        form.reset();  
        showCreateView();
}

async function sendPost(body) {
   
    const response = await fetch(
        url,{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });

    return response.json();
}

async function loadPosts(){
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

function createPost(body) {
    const div = document.createElement("div");
    div.setAttribute("class", "topic-container");
    div.innerHTML =
        `<div class="topic-name-wrapper">
         <div class="topic-name">
            <a href="#" id="${body._id}" class="normal">
            <h2>${body.topicName}</h2>
            </a>
        <div class="columns">
            <div>
                <p>Date: <time>${body.date}</time></p>
                <div class="nick-name">
                    <p>Username: <span>${body.username}</span></p>
                </div>
            </div>
        </div>
    </div>
</div>`
return div;
}

function onAnchor(e){
    const a = e.target.parentElement;
    if(a.tagName !== "A")
    {
        return;
    }
    const id = a.id;
    showDetailsView(id,e);
}

