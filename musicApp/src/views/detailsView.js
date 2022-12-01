import {html,nothing} from '../lib.js'
import {delById, getById} from "../data.js";


let context = null;
export async function showDetails(ctx) {
    context = ctx;
    let id = ctx.params.id;
    let item = await getById(id);
    ctx.render(catalogTemplate(item, isAuthor(), onDelete));

    function isAuthor(){
        if(ctx.user){
            if(ctx.user._id === item._ownerId){
                return true;
            }
        }
        return false;
    }

   async function onDelete(e){
        e.preventDefault();
        if(confirm('Are you sure you want to delete this item?')){
            await delById(id);
            ctx.page.redirect('/catalog');
        }
    }
}

function catalogTemplate(item,isAuthor, onDelete){
    return html `<section id="detailsPage">
        <div class="wrapper">
            <div class="albumCover">
                <img src=${item.imgUrl}>
            </div>
            <div class="albumInfo">
                <div class="albumText">

                    <h1>Name: ${item.name}</h1>
                    <h3>Artist: ${item.artist}</h3>
                    <h4>Genre: ${item.genre}</h4>
                    <h4>Price: $${item.price}</h4>
                    <h4>Date: ${item.releaseDate}</h4>
                    <p>Description: ${item.description}</p>
                </div>

                <!-- Only for registered user and creator of the album-->
                ${isAuthor ? html`  <div class="actionBtn">
                    <a href="/edit/${item._id}" class="edit">Edit</a>
                    <a @click="${onDelete}" href="#" class="remove">Delete</a>
                </div>` : nothing}
              
            </div>
        </div>
    </section>`
}