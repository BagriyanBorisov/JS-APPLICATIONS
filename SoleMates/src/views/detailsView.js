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
        if(confirm('Are you sure you want to delete this item?')){
            await deleteById(id);
            ctx.page.redirect('/catalog');
        }
    }

}

function detailsTemplate(item,isCreator,onDelete){
    return html ` <section id="details">
        <div id="details-wrapper">
            <p id="details-title">Shoe Details</p>
            <div id="img-wrapper">
                <img src="${item.imageUrl}" alt="example1" />
            </div>
            <div id="info-wrapper">
                <p>Brand: <span id="details-brand">${item.brand}</span></p>
                <p>
                    Model: <span id="details-model">${item.model}</span>
                </p>
                <p>Release date: <span id="details-release">${item.release}</span></p>
                <p>Designer: <span id="details-designer">${item.designer}</span></p>
                <p>Value: <span id="details-value">${item.value}</span></p>
            </div>

            <!--Edit and Delete are only for creator-->
            ${isCreator ? html`  <div id="action-buttons">
                <a href="/edit/${item._id}" id="edit-btn">Edit</a>
                <a @click="${onDelete}" href="javascript:void(0)" id="delete-btn">Delete</a>
            </div>`: nothing}
          
        </div>
    </section>`
}