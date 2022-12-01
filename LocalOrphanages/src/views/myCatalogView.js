import {html,nothing} from '../lib.js'
import { getMyAll} from "../data.js";

let context = null;
export async function showMyCatalog(ctx) {
    context = ctx;
    let items = await getMyAll(ctx.user._id);
    ctx.render(catalogTemplate(items));
}

function catalogTemplate(items){
    return html `   <section id="my-posts-page">
        <h1 class="title">My Posts</h1>

        ${items.length ? html ` <div class="my-posts">
            ${Object.values(items).map(cardTemplate)}
        </div>`: html `<h1 class="title no-posts-title">You have no posts yet!</h1>`}
        
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
