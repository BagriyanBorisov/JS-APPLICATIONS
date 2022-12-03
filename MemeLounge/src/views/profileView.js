import {html,nothing} from '../lib.js'
import {getMyAll} from "../data.js";

let context = null;
export async function showProfile(ctx) {
    context = ctx;
    let items = await getMyAll(ctx.user._id);
    ctx.render(profileTemplate(ctx.user, items));
}

function profileTemplate(user,items){
    return html `
        <section id="user-profile-page" class="user-profile">
            <article class="user-info">
                <img id="user-avatar-url" alt="user-profile" src="/images/${user.gender}.png">
                <div class="user-content">
                    <p>Username: ${user.username}</p>
                    <p>Email: ${user.email}</p>
                    <p>My memes count: ${items.length}</p>
                </div>
            </article>
            <h1 id="user-listings-title">User Memes</h1>
            <div class="user-meme-listings">
                <!-- Display : All created memes by this user (If any) -->
                ${items.length 
                        ? Object.values(items).map(cardTemplate)
                        : html `<p class="no-memes">No memes in database.</p>`}
                <!-- Display : If user doesn't have own memes  -->
            </div>
        </section>`
}

function cardTemplate(item){
    return html` <div class="user-meme">
        <p class="user-meme-title">${item.title}</p>
        <img class="userProfileImage" alt="meme-img" src="${item.imageUrl}">
        <a class="button" href="/catalog/${item._id}">Details</a>
    </div>`
}