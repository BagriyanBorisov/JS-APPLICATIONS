import {html,nothing} from '../lib.js'
import {getAll} from "../data.js";


export async function showCatalog(ctx) {
    let items = await getAll();
    ctx.render(catalogTemplate(items));
}

function catalogTemplate(items){
    return html `<section id="dashboard-page" class="dashboard">
        <h1>Dashboard</h1>
        <!-- Display ul: with list-items for All books (If any) -->
        ${items.length 
                ? html`<ul class="other-books-list">${Object.values(items).map(cardTemplate)}</ul>` 
                : html`<p class="no-books">No books in database!</p>` }
        <!-- Display paragraph: If there are no books in the database -->
    </section>`
}

function cardTemplate(item){
    return html` <li class="otherBooks">
        <h3>${item.title}</h3>
        <p>Type: ${item.type}</p>
        <p class="img"><img src="${item.imageUrl}"></p>
        <a class="button" href="/catalog/${item._id}">Details</a>
    </li>`
}