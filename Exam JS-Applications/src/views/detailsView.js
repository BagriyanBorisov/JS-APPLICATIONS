import {html,nothing} from '../lib.js'
import {deleteAlbum, getById, getLikesCount, isLiked, sendLike} from "../data.js";


export async function showDetails(ctx) {
    let id = ctx.params.id;
    let item = await getById(id);
    let likesCount = await getLikesCount(id);

    ctx.render(detailsTemplate(item, isCreator(), isUser(), onDelete, onLike, likesCount, await isAbleToLike()));

    function isUser() {
        return Boolean(ctx.user);
    }

    function isCreator() {
        if (ctx.user) {
            if (ctx.user._id === item._ownerId) {
                return true;
            }
        }
        return false;
    }

    async function onDelete(e) {
        e.preventDefault();

        if (confirm('Are you sure you want to delete this album?')) {
            await deleteAlbum(id);
            ctx.page.redirect('/catalog');
        }
    }

    async function onLike(e) {
        e.preventDefault();

        await sendLike({albumId: id})
        ctx.page.redirect('/catalog/' + id);
    }

    async function isAbleToLike(){
        if(isUser() && !isCreator()){
            let check = await isLiked(id, ctx.user._id);
            if(check === 0){
                return true;
            }
        }
        return false;
    }
}

function detailsTemplate(item, isCreator, isUser, onDelete, onLike, likesCount, isAbleToLike){
    return html `<section id="details">
        <div id="details-wrapper">
            <p id="details-title">Album Details</p>
            <div id="img-wrapper">
                <img src="${item.imageUrl}" alt="example1" />
            </div>
            <div id="info-wrapper">
                <p><strong>Band:</strong><span id="details-singer">${item.singer}</span></p>
                <p>
                    <strong>Album name:</strong><span id="details-album">${item.album}</span>
                </p>
                <p><strong>Release date:</strong><span id="details-release">${item.release}</span></p>
                <p><strong>Label:</strong><span id="details-label">${item.label}</span></p>
                <p><strong>Sales:</strong><span id="details-sales">${item.sales}</span></p>
            </div>
            <div id="likes">Likes: <span id="likes-count">${likesCount}</span></div>

            <!--Edit and Delete are only for creator-->
            <div id="action-buttons">
                ${isAbleToLike ? html `<a @click="${onLike}" href="javascript:void(0)" id="like-btn">Like</a>` : nothing}
                ${isCreator 
                        ? html ` <a href="/edit/${item._id}" id="edit-btn">Edit</a>
                                 <a @click="${onDelete}" href="javascript:void(0)" id="delete-btn">Delete</a>`
                        : nothing}
               
            </div>
        </div>
    </section>`
}