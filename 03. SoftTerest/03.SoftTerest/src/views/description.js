import { detailsIdea } from "../../api/data.js";

const section = document.getElementById('description-view');

export async function showDescription(context, id){
    const idea = await detailsIdea(id);
    debugger;
    createDescription(idea);
    context.showSection(section);
 }

 export function createDescription(idea){
    const img = document.createElement("img");
    img.src = idea.img;
    img.setAttribute('class','det-img');
    const div = document.createElement("div");
    div.setAttribute('class', 'desc');
    div.innerHTML =`
    <h2 class="display-5">${idea.title}</h2>
    <p class="infoType">Description:</p>
    <p class="idea-description">${idea.description}</p>`
    const divBtn = document.createElement("div");
    divBtn.setAttribute('class', 'text-center');
    divBtn.innerHTML = `<a class="btn detb" href="">Delete</a>`

    section.replaceChildren(img);
    section.appendChild(div);

    const user = localStorage.getItem("user");
    if(user._id === idea.id)
    {
        section.appendChild(divBtn);
    }
 }



