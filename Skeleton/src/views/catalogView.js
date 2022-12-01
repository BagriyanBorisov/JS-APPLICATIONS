import {html,nothing} from '../lib.js'

let context = null;
export async function showCatalog(ctx) {
    context = ctx;
    ctx.render(catalogTemplate());
}

function catalogTemplate(){
    return html `<p>CatalogView</p>`
}

function cardTemplate(){
    return html``
}