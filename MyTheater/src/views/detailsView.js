import {html,nothing} from '../lib.js'
import {checkLike, deleteById, getById, getLikeCount, sendLike} from "../data.js";


let context = null;
export async function showDetails(ctx) {
    context = ctx;
    let id = ctx.params.id;
    let item = await getById(id);
    let likeCount = await getLikeCount(id);
    ctx.render(detailsTemplate(item, isUser(), isCreator(), onDelete, await isAbleToLike(),await onLike, await likeCount));

    function isUser(){
        return Boolean(ctx.user);
    }

    function isCreator(){
        if(ctx.user){
            return ctx.user._id === item._ownerId;
        }
    }

    async function onDelete(e){
        e.preventDefault();
        if(confirm('Are you sure you want to delete this event?')){
            await deleteById(id);
            ctx.page.redirect('/');
        }
    }

    async function isAbleToLike(){
        if(isUser() && !isCreator()){
            let check = await checkLike(id, ctx.user._id);
            if (check === 0){
                return true;
            }
        }
        return false;
    }

    async function onLike(e){
        e.preventDefault();
        await sendLike({"theaterId": id});
        likeCount = await getLikeCount(id);
        ctx.render(detailsTemplate(item, isUser(), isCreator(), onDelete, await isAbleToLike(),await onLike, likeCount));
    }

}

function detailsTemplate(item,isUser,isCreator,onDelete,isAbleToLike,onLike,likeCount){
    return html `  <section id="detailsPage">
        <div id="detailsBox">
            <div class="detailsInfo">
                <h1>Title: ${item.title}</h1>
                <div>
                    <img src="${item.imageUrl}" />
                </div>
            </div>

            <div class="details">
                <h3>Theater Description</h3>
                <p>${item.description}</p>
                <h4>Date: ${item.date}</h4>
                <h4>Author: ${item.author}</h4>
                
                ${isUser ? html` <div class="buttons">
                ${isCreator 
                         ? html` <a @click="${onDelete}" class="btn-delete" href="javascript:void(0)">Delete</a>
                                 <a class="btn-edit" href="/edit/${item._id}">Edit</a>`
                         : isAbleToLike 
                                ? html `<a @click="${onLike}" class="btn-like" href="javascript:void(0)">Like</a>` 
                                : nothing}
                 </div>` : nothing}
               
                
                <p class="likes">Likes: ${likeCount}</p>
            </div>
        </div>
    </section>`
}