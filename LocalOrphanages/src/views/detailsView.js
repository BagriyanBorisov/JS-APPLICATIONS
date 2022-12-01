import {html,nothing} from '../lib.js'
import {checkUserDonated, deleteById, getById, getTotalDonations, sendDonation} from "../data.js";


let context = null;
export async function showDetails(ctx) {
    context = ctx;
    let id = ctx.params.id;
    let item = await getById(id);
    let totalDonationsCount = await getTotalDonations(id);
    ctx.render(detailsTemplate(item,isUser(),isAuthor(),await onDelete,await onDonate, await totalDonationsCount, await userDonated()));

    function isUser(){
        if(ctx.user){
            return true;
        }
        return false
    }

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
            await deleteById(id);
            ctx.page.redirect('/catalog')
        }
    }

    async function userDonated(){
        if(ctx.user){
            let check = await checkUserDonated(id, ctx.user._id);
            if(check === 0){
                return true;
            }
        }
        return false;

    }

    async function onDonate(e){
        e.preventDefault();
        await sendDonation({postId: id})
        totalDonationsCount = await getTotalDonations(id);
        ctx.render(detailsTemplate(item,isUser(),isAuthor(),await onDelete,await onDonate,await totalDonationsCount, await userDonated()));
    }

}

function detailsTemplate(item,isUser,isAuthor,onDelete,onDonate,totalDonationsCount,userDonated){
    return html `<section id="details-page">
        <h1 class="title">Post Details</h1>

        <div id="container">
            <div id="details">
                <div class="image-wrapper">
                    <img src="${item.imageUrl}" alt="Material Image" class="post-image">
                </div>
                <div class="info">
                    <h2 class="title post-title">${item.title}</h2>
                    <p class="post-description">Description: ${item.description}</p>
                    <p class="post-address">Address: ${item.address}</p>
                    <p class="post-number">Phone number: ${item.phone}</p>
                    <p class="donate-Item">Donate Materials: ${totalDonationsCount}</p>

                    <!--Edit and Delete are only for creator-->
                    <!--Bonus - Only for logged-in users ( not authors )-->
                    ${isUser ? html`<div class="btns">  
                    ${isAuthor ? html `<a href="/edit/${item._id}" class="edit-btn btn">Edit</a>
                    <a @click="${onDelete}" href="javascript:void(0)" class="delete-btn btn">Delete</a>` 
                            : userDonated ? html ` <a @click="${onDonate}" href="javascript:void(0)" class="donate-btn btn">Donate</a>` 
                                    : nothing}
                    </div> ` : nothing}
                </div>
            </div>
        </div>
    </section>`
}