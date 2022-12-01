import {html,nothing} from '../lib.js'
import {getAll} from "../data.js";

let context = null;
export async function showCatalog(ctx) {
    context = ctx;
    let items = await getAll();
    ctx.render(catalogTemplate(items));
}

function catalogTemplate(items){
    return html `  <section id="dashboard-page">
        <h1 class="title">All Posts</h1>

        <!-- Display a div with information about every post (if any)-->
        ${items.length ? html `<div class="all-posts">
            ${Object.values(items).map(cardTemplate)}
        </div>`: html `<h1 class="title no-posts-title">No posts yet!</h1>`}
      

        <!-- Display an h1 if there are no posts -->
        
    </section>`
}

function cardTemplate(item){
    return html` <div class="post">
        <h2 class="post-title">${item.title}</h2>
        <img class="post-image" src="${item.imageUrl}" alt="Material Image">
        <div class="btn-wrapper">
            <a href="/catalog/${item._id}" class="details-btn btn">Details</a>
        </div>
    </div>`
}