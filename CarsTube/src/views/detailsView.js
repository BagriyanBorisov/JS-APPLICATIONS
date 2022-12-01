import {html,nothing} from '../lib.js'
import {deleteById, getById} from "../data.js";


let context = null;
export async function showDetails(ctx) {
    context = ctx;
    let id = ctx.params.id;
    let item = await getById(id);
    ctx.render(detailsTemplate(item, isCreator(), onDelete));

    function isCreator(){
        if(ctx.user){
            if(ctx.user._id === item._ownerId){
                return true;
            }
        }
        return false;
    }

    async function onDelete(e){
        e.preventDefault();
        if(confirm('Are you sure you want to delete this car?')){
            await deleteById(id);
            ctx.page.redirect('/catalog')
        }
    }

}

function detailsTemplate(item, isCreator, onDelete){
    return html ` <section id="listing-details">
        <h1>Details</h1>
        <div class="details-info">
            <img src="${item.imageUrl}">
            <hr>
            <ul class="listing-props">
                <li><span>Brand:</span>${item.brand}</li>
                <li><span>Model:</span>${item.model}</li>
                <li><span>Year:</span>${item.year}</li>
                <li><span>Price:</span>${item.price}$</li>
            </ul>

            <p class="description-para">${item.description}</p>

            ${isCreator 
                    ? html `<div class="listings-buttons">
                        <a href="/edit/${item._id}" class="button-list">Edit</a>
                        <a @click="${onDelete}" href="javascript:void(0)" class="button-list">Delete</a></div>`
                    : nothing}
        </div>
    </section>`
}