import {html,nothing} from '../lib.js'
import {getAll} from "../data.js";

let context = null;
export async function showCatalog(ctx) {
    context = ctx;
    let items = await getAll();
    ctx.render(catalogTemplate(items));
}

function catalogTemplate(items){
    return html ` <section id="catalog-page">
        <h1>All Games</h1>
   
        ${items.length ? Object.values(items).map(cardTemplate) 
                        : html` <h3 class="no-articles">No articles yet</h3>`}

    </section>`
}

function cardTemplate(item){
    return html`<div class="allGames">
        <div class="allGames-info">
            <img src="${item.imageUrl}">
            <h6>${item.category}</h6>
            <h2>${item.title}</h2>
            <a href="/catalog/${item._id}" class="details-button">Details</a>
        </div>
    </div>`
}