import {html, nothing} from '../lib.js'
import {deleteById, getById, getDonations, sendDonation} from "../data.js";

let context = null;
let userId = null;
export async function showDetails(ctx) {
    context = ctx;
    let id = ctx.params.id;
    let item = await getById(id);
    ctx.render(await detailTemplate(item, onUser(), canSeeEditDelete(), canDonate(), id, onDelete, onDonate, updateDonation));


    async function updateDonation(){
        let donations = await getDonations(id);
        return donations * 100;
    }

    async function onDonate(e){
        if(context.user){
            await sendDonation(id);
            await updateDonation();
            ctx.page.redirect(`/catalog/${id}`);
        }
    }

    function onUser() {
        if (ctx.user) {
            return true;
        }
        return false;
    }

    function canSeeEditDelete() {
        if (ctx.user) {
            if (ctx.user._id === item._ownerId) {
                return true;
            }
        }
        return false
    }

    function canDonate() {
        if (ctx.user) {
            if (ctx.user._id !== item._ownerId) {
                return true;
            }
        }
        return false;
    }

   async function onDelete(e) {
        if(confirm('Are you sure u want to delete this pet?')){
            await deleteById(id);
            ctx.page.redirect('/');
        }
    }
}


async function detailTemplate(item, onUser, canSeeEditDelete, canDonate, id, onDelete, onDonate,updateDonation) {
        return html`
            <section id="detailsPage">
                <div class="details">
                    <div class="animalPic">
                        <img src="${item.image}">
                    </div>
                    <div>
                        <div class="animalInfo">
                            <h1>Name: ${item.name}</h1>
                            <h3>Breed: ${item.breed}</h3>
                            <h4>Age: ${item.age}</h4>
                            <h4>Weight: ${item.weight}</h4>
                            <h4 class="donation">Donation: ${await updateDonation()}$</h4>
                        </div>
                        ${onUser ? html`
                                    <div class="actionBtn">
                                       ${onModulate(canSeeEditDelete, canDonate, id, onDelete, onDonate)}
                                        </div>` : nothing}
                    </div>
                </div>
            </section>`
    }


    function onModulate(canSeeEditDelete, canDonate, itemId, onDelete, onDonate) {
        if (canSeeEditDelete) {
            return html`<a href="/edit/${itemId}" class="edit">Edit</a>
            <a @click="${onDelete}" href="javascript:void(0)" class="remove">Delete</a> </div>`
        }
        if(canDonate){
            return html `<a @click="${onDonate}" href="javascript:void(0)" class="donate">Donate</a></div>`
        }
    }