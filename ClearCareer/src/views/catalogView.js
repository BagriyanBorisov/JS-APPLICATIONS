import {html,nothing} from '../lib.js'
import {getAll} from "../data.js";

let context = null;
export async function showCatalog(ctx) {
    context = ctx;
    let items = await getAll();
    ctx.render(catalogTemplate(items));
}

function catalogTemplate(items){
    return html ` <section id="dashboard">
          <h2>Job Offers</h2>

          <!-- Display a div with information about every post (if any)-->
            ${items.length ? Object.values(items).map(cardTemplate) : 
                html `<h2>No offers yet.</h2>`}

          <!-- Display an h2 if there are no posts -->
         
        </section>`
}

function cardTemplate(item){
    return html` <div class="offer">
        <img src="${item.imageUrl}" alt="example1" />
        <p>
            <strong>Title: </strong><span class="title">${item.title}</span>
        </p>
        <p><strong>Salary:</strong><span class="salary">${item.salary}</span></p>
        <a class="details-btn" href="/catalog/${item._id}">Details</a>
    </div>`
}