import {html,nothing} from '../lib.js'
import {getMyTheaters} from "../data.js";

let context = null;
export async function showProfile(ctx) {
    context = ctx;
    let userId = ctx.user._id;
    let items = await getMyTheaters(userId);
    ctx.render(profileTemplate(items,ctx.user.email));
}

function profileTemplate(items,email){
    return html `<section id="profilePage">
        <div class="userInfo">
            <div class="avatar">
                <img src="./images/profilePic.png">
            </div>
            <h2>${email}</h2>
        </div>
        <div class="board">
            <!--If there are event-->
            ${items.length 
                    ? html `<div class="eventBoard">${Object.values(items).map(cardTemplate)}</div>`
                    : html `<div class="no-events"><p>This user has no events yet!</p></div>`}
            
        </div>
    </section>`
}

function cardTemplate(item){
    return html` <div class="event-info">
        <img src="${item.imageUrl}">
        <h2>${item.title}</h2>
        <h6>${item.date}</h6>
        <a href="/catalog/${item._id}" class="details-button">Details</a>
    </div>`
}