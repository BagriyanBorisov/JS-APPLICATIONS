import {html,nothing} from '../lib.js'
import {getMyAll} from "../data.js";


export async function showMyCatalog(ctx) {
    let userId = ctx.user._id;
    let items = await getMyAll(userId);
    ctx.render(myCatalogTemplate(items));
}

function myCatalogTemplate(items){
    return html ` <section id="my-books-page" class="my-books">
        <h1>My Books</h1>
        <!-- Display ul: with list-items for every user's books (if any) -->
        ${items.length 
                ? html`<ul class="my-books-list">${Object.values(items).map(cardTemplate)}</ul>` 
                : html` <p class="no-books">No books in database!</p>`}
        <!-- Display paragraph: If the user doesn't have his own books  -->
       
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