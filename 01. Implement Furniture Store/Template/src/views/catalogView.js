//VERIFY IMPORT ROUTES, HOWEVER ROUTES SHOULD BE ACCURATE IF FILE STRUCTURE NOT MODIFIED
import { html } from '../../node_modules/lit-html/lit-html.js'
import {getItems} from '../dataController.js';


let context = null;
export async function showCatalog(ctx){
    context = ctx;
    let items = await getItems();
    let page = catalogViewGenerator(items);
    ctx.render(page);
 
}

 function catalogViewGenerator(items){
    return html`
       <div class="row space-top">
            <div class="col-md-12">
                <h1>Welcome to Furniture System</h1>
                <p>Select furniture from the catalog to view details.</p>
            </div>
        </div>
        <div class="row space-top">
            ${Object.values(items).map(createCard)}
        </div>
        `;
}

function onClick(e){
    e.preventDefault();
    let url = new URL(e.target.href);
    context.id = url.pathname;
    context.page.redirect(`/details`+context.id);
}


function createCard(item){
    const card = html `<div class="col-md-4">
    <div class="card text-white bg-primary">
        <div class="card-body">
                <img src="${item.img}" />
                <p>${item.description}</p>
                <footer>
                    <p>Price: <span>${item.price} $</span></p>
                </footer>
                <div>
                    <a href="${item._id}" @click=${onClick} class="btn btn-info">Details</a>
                </div>
        </div>
        </div>
    </div>`
    return card; 
}