import {html,nothing} from '../lib.js'
import {getMyAll} from "../data.js";

let context = null;
export async function showMyCatalog(ctx) {
    context = ctx;
    let userId = ctx.user._id;
    let items = await getMyAll(userId);
    ctx.render(catalogTemplate(items));
}

function catalogTemplate(items){
    return html `<section id="my-listings">
        <h1>My car listings</h1>
        <div class="listings">
            <!-- Display all records -->
           ${items.length 
                   ? Object.values(items).map(cardTemplate)
                   : html `<p class="no-cars"> You haven't listed any cars yet.</p>`}
            <!-- Display if there are no records -->
        </div>
    </section>`
}

function cardTemplate(item){
    return html`<div class="listing">
        <div class="preview">
            <img src="${item.imageUrl}">
        </div>
        <h2>${item.brand + ' ' + item.model}</h2>
        <div class="info">
            <div class="data-info">
                <h3>Year: ${item.year}</h3>
                <h3>Price: ${item.price} $</h3>
            </div>
            <div class="data-buttons">
                <a href="/catalog/${item._id}" class="button-carDetails">Details</a>
            </div>
        </div>
    </div>`
}