import {html,nothing} from '../lib.js'
import {getAll} from "../data.js";

let context = null;
export async function showCatalog(ctx) {
    context = ctx;
    let items = await getAll();
    ctx.render(catalogTemplate(items,onUser()));

    function onUser(){
        if(ctx.user){
            return true;
        }
        return false;
    }
}

function catalogTemplate(items,onUser){
    return html `<section id="catalogPage">
        <h1>All Albums</h1>
        ${items.length ? Object.values(items).map(x=> cardTemplate(x,onUser)) :
           html`<p>No Albums in Catalog!</p>`}
    </section>`
}

function cardTemplate(item,onUser){
    return html`  <div class="card-box">
        <img src=${item.imgUrl}>
        <div>
            <div class="text-center">
                <p class="name">Name: ${item.name}</p>
                <p class="artist">Artist: ${item.artist}</p>
                <p class="genre">Genre: ${item.genre}</p>
                <p class="price">Price: $${item.price}</p>
                <p class="date">Release Date: ${item.releaseDate}</p>
            </div>
            <div class="btn-group">
               ${onUser ? html` <a href="/catalog/${item._id}" id="details">Details</a>` : nothing}
            </div> 
        </div>
    </div>`
}