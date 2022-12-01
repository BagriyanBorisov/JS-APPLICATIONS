import {html,nothing} from '../lib.js'
import {getQueryItems} from "../data.js";

let context = null;
export async function showSearch(ctx) {
    context = ctx;
    ctx.render(catalogTemplate(onClick));

   async function onClick(e){
        e.preventDefault();
        if(e.target.textContent === 'Search' && e.target.tagName === 'BUTTON'){
           let query = e.target.parentElement.querySelector('#search-input').value;
           let clicked = true;
           let items = await getQueryItems(query);
           ctx.render(catalogTemplate(onClick, clicked, items));
        }
    }
}

function catalogTemplate(onClick, clicked, items){
    return html `<section id="search-cars">
        <h1>Filter by year</h1>

        <div @click="${onClick}" class="container">
            <input id="search-input" type="text" name="search" placeholder="Enter desired production year">
            <button class="button-list">Search</button>
        </div>

        ${clicked 
                ? html`<h2>Results:</h2>
                <div class="listings">
                    ${items.length 
                            ? Object.values(items).map(cardTemplate)
                            : html `<p class="no-cars"> No results.</p>`}
                </div>` : nothing}
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