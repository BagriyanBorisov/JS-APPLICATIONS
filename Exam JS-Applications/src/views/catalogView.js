import {html,nothing} from '../lib.js'
import {getAll} from "../data.js";


export async function showCatalog(ctx) {
    let items = await getAll();
    ctx.render(catalogTemplate(items));
}

function catalogTemplate(items){
    return html ` <section id="dashboard">
        <h2>Albums</h2>
        <ul class="card-wrapper">
            <!-- Display a li with information about every post (if any)-->
            ${items.length ? Object.values(items).map(cardTemplate) : nothing}
        </ul>
        <!-- Display an h2 if there are no posts -->
        ${items.length ? nothing : html `<h2>There are no albums added yet.</h2>`}
    </section>`
}

function cardTemplate(item){
    return html`<li class="card">
        <img src="${item.imageUrl}" alt="travis" />
        <p>
            <strong>Singer/Band: </strong><span class="singer">${item.singer}</span>
        </p>
        <p>
            <strong>Album name: </strong><span class="album">${item.album}</span>
        </p>
        <p><strong>Sales:</strong><span class="sales">${item.sales}</span></p>
        <a class="details-btn" href="/catalog/${item._id}">Details</a>
    </li>`
}