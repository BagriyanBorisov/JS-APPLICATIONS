import {html,nothing} from '../lib.js'
import {getAll} from "../data.js";

let context = null;
export async function showCatalog(ctx) {
    context = ctx;
    let items = await getAll();
    ctx.render(catalogTemplate(items));
}

function catalogTemplate(items){
    return html `<section id="dashboard">
        <h2>Collectibles</h2>
        ${items.length ? html` <ul class="card-wrapper">
            ${Object.values(items).map(cardTemplate)}
        </ul>`: html`<h2>There are no items added yet.</h2>`}
    </section>`
}

function cardTemplate(item){
    return html`  <li class="card">
        <img src="${item.imageUrl}" alt="travis" />
        <p>
            <strong>Brand: </strong><span class="brand">${item.brand}</span>
        </p>
        <p>
            <strong>Model: </strong
            ><span class="model">${item.model}</span>
        </p>
        <p><strong>Value:</strong><span class="value">${item.value}</span>$</p>
        <a class="details-btn" href="/catalog/${item._id}">Details</a>
    </li>`
}