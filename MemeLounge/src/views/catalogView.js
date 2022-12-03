import {html,nothing} from '../lib.js'
import {getAll} from "../data.js";

let context = null;
export async function showCatalog(ctx) {
    context = ctx;
    let items = await getAll();
    ctx.render(catalogTemplate(items));
}

function catalogTemplate(items){
    return html `
        <section id="meme-feed">
            <h1>All Memes</h1>
            <div id="memes">
                <!-- Display : All memes in database ( If any ) -->
               ${items.length 
                       ? Object.values(items).map(cardTemplate)
                       : html ` <p class="no-memes">No memes in database.</p>`}
                <!-- Display : If there are no memes in database -->
            </div>
        </section>`
}

function cardTemplate(item){
    return html` <div class="meme">
        <div class="card">
            <div class="info">
                <p class="meme-title">${item.title}</p>
                <img class="meme-image" alt="meme-img" src="${item.imageUrl}">
            </div>
            <div id="data-buttons">
                <a class="button" href="/catalog/${item._id}">Details</a>
            </div>
        </div>
    </div>`
}