import { html } from '../../node_modules/lit-html/lit-html.js'
import {getItem} from '../dataController.js';


let context = null;
let itemOwnerDescription = null;
export async function showDetails(ctx){
    context = ctx;
    let item = await getItem(ctx.params.id);
    itemOwnerDescription = item._ownerId;
    let page = detailsViewGenerator(item);
    ctx.render(page);
}

function detailsViewGenerator(item){
    return html ` <div class="row space-top">
    <div class="col-md-12">
        <h1>Furniture Details</h1>
    </div>
</div>
<div class="row space-top">
    <div class="col-md-4">
        <div class="card text-white bg-primary">
            <div class="card-body">
                <img src="/images/${item.img.split('/')[2]}" />
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <p>Make: <span>${item.make}</span></p>
        <p>Model: <span>${item.model}</span></p>
        <p>Year: <span>${item.year}</span></p>
        <p>Description: <span>${item.description}</span></p>
        <p>Price: <span>${item.price}</span></p>
        <p>Material: <span>${item.material}</span></p>      
        <div>
        ${isOwner() ? html`<a href=”#” class="btn btn-info">Edit</a>
            <a href=”#” class="btn btn-red">Delete</a>` : ""} 
        </div>
    </div>
</div>`
}
function isOwner(){
    const userId = JSON.parse(sessionStorage.getItem('userData'))._id;
    if(userId === itemOwnerDescription) return true;
    return false;
}


