import {html,nothing} from '../lib.js'
import {checkLiked, deleteById, getById, getLikesCount, sendLike} from "../data.js";



export async function showDetails(ctx) {
    let id = ctx.params.id;
    let item = await getById(id);
    let likesCount = await getLikesCount(id);
    ctx.render(detailsTemplate(item,isUser(),isCreator(),onDelete,await likesCount, await onLike, await checkIfCanLike()));

    function isUser(){
        if(ctx.user){
            return true;
        }
        return false;
    }

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

        if(confirm('Are you sure you want to delete this book?')){
            await deleteById(id);
            ctx.page.redirect('/');
        }
    }

    async function checkIfCanLike(){
        if(isUser() &&!isCreator()){
            let check = await checkLiked(id,ctx.user._id);
            if(check === 0){
                return true;
            }
            else{
                return false;
            }
        }
        return false;
    }

    async function onLike(e){
        e.preventDefault();
        await sendLike({bookId: id});
        ctx.page.redirect('/catalog/' + id);
    }

}

function detailsTemplate(item,isUser,isCreator,onDelete,likesCount,onLike,checkIfCanLike){
    return html ` <section id="details-page" class="details">
        <div class="book-information">
            <h3>${item.title}</h3>
            <p class="type">Type: ${item.type}</p>
            <p class="img"><img src="${item.imageUrl}"></p>
            <div class="actions">
                <!-- Edit/Delete buttons ( Only for creator of this book )  -->
                ${isCreator 
                        ? html `<a class="button" href="/edit/${item._id}">Edit</a>
                                <a @click="${onDelete}" class="button" href="javascript:void(0)">Delete</a>`
                        : nothing}
                

                <!-- Bonus -->
                <!-- Like button ( Only for logged-in users, which is not creators of the current book ) -->
                ${checkIfCanLike
                        ? html `<a @click="${onLike}" class="button" href="javascript:void(0)">Like</a>`
                        : nothing}
                

                <!-- ( for Guests and Users )  -->
                <div class="likes">
                    <img class="hearts" src="/images/heart.png">
                    <span id="total-likes">Likes: ${likesCount}</span>
                </div>
                <!-- Bonus -->
            </div>
        </div>
        <div class="book-description">
            <h3>Description:</h3>
            <p>${item.description}</p>
        </div>
    </section>`
}