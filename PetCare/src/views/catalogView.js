import {html, nothing} from '../lib.js'
import {getAll} from "../data.js";

let context = null;
export async function showCatalog(ctx) {
    context = ctx;
    let items = await getAll();
    ctx.render(catalogTemplate(items));
}

function catalogTemplate(items){
    return html `<section id="dashboard">
        <h2 class="dashboard-title">Services for every animal</h2>
        <div class="animals-dashboard">
            ${Object.values(items).map(cardTemplate)}
            ${!items.length ? html `<div><p className="no-pets">No pets in dashboard</p></div>` : nothing}
        </div>
      
    </section>`
}

function cardTemplate(item){
    return html  `<div class="animals-board">
                <article class="service-img">
                    <img class="animal-image-cover" src="${item.image}">
                </article>
                <h2 class="name">${item.name}</h2>
                <h3 class="breed">${item.breed}</h3>
                <div class="action">
                    <a class="btn" href="/catalog/${item._id}">Details</a>
                </div>
            </div>`
}