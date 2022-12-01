import {html,nothing} from '../lib.js'
import {deleteById, getAppliesCount, getAppliesUser, getById, sendApply} from "../data.js";


let context = null;
export async function showDetails(ctx) {
    context = ctx;
    let id = ctx.params.id;
    let item = await getById(id);
    let applies = await getAppliesCount(id);
    ctx.render(detailsTemplate(item,isCreator(), await isAbleToApply(), onDelete,applies,onApply));

    function isCreator(){
        if(ctx.user){
            if(ctx.user._id === item._ownerId){
                return true;
            }
        }
        return false;
    }

   async function isAbleToApply(){
        if(isCreator()){
            return false;
        }
        if(ctx.user){
           let check = await getAppliesUser(id,ctx.user._id)
            if(check !== 0){
                return false;
            } else { return true}
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

    async function onApply(e){
        e.preventDefault();


            await sendApply({offerId: id});

        applies = await getAppliesCount(id);
        ctx.render(detailsTemplate(item,isCreator(), await isAbleToApply(), onDelete,applies));
    }

}

function detailsTemplate(item,isCreator, isAbleToApply, onDelete,applies,onApply){
    return html `<section id="details">
        <div id="details-wrapper">
            <img id="details-img" src="${item.imageUrl}" alt="example1" />
            <p id="details-title">${item.title}</p>
            <p id="details-category">
                Category: <span id="categories">${item.category}</span>
            </p>
            <p id="details-salary">
                Salary: <span id="salary-number">${item.salary}</span>
            </p>
            <div id="info-wrapper">
                <div id="details-description">
                    <h4>Description</h4>
                    <span>${item.description}</span>
                </div>
                <div id="details-requirements">
                    <h4>Requirements</h4>
                    <span>${item.requirements}</span>
                </div>
            </div>
            <p>Applications: <strong id="applications">${applies}</strong></p>

            <!--Edit and Delete are only for creator-->
            ${isCreator || isAbleToApply ? html` <div id="action-buttons">
                ${isCreator ? html`<a href="/edit/${item._id}" id="edit-btn">Edit</a>
            <a  @click="${onDelete}" href="" id="delete-btn">Delete</a>` : nothing}
                <!--Bonus - Only for logged-in users ( not authors )-->
                ${isAbleToApply && onApply !== undefined ? 
                        html ` <a @click=${onApply} href="" id="apply-btn">Apply</a>` : nothing}</div>` 
                        : nothing}
           
        </div>
    </section>`
}