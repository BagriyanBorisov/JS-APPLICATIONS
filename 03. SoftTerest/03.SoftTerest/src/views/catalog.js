import { getAllIdea, detailsIdea } from "../../api/data.js";
const section = document.getElementById('dashboard-holder');

let ctx = null;

export async function showDashboard(context){
    ctx = context;
    context.showSection(section);

    const ideas = await getAllIdea();

    if(ideas.length === 0){
        section.innerHTML = `<h1>No ideas yet! Be the first one :)</h1>`;
    }
    else{
        section.replaceChildren(...ideas.map(createIdea))
        section.querySelectorAll('a').forEach(x=> x.addEventListener('click', onClick));
    }
 }


 function createIdea(idea){
    const div = document.createElement("div");
    div.classList = "card overflow-hidden current-card details";
    div.style.width = "20rem";
    div.style.height = "18rem";

    div.innerHTML = 
    `<div class="card-body">
        <p class="card-text">${idea.title}</p>
    </div>
    <img class="card-image" src=${idea.img} alt="Card image cap">`

    const a = document.createElement('a');
    a.setAttribute('class', 'btn');
    a.href = `/details/${idea._id}`;
    a.textContent = "Details";
    a.id = idea._id;
    div.appendChild(a);
    return div;
    debugger;

 }

 async function onClick(e){
    debugger;
    e.preventDefault;
    let id = e.target.id;
    ctx.goTo('/details/', id);
}