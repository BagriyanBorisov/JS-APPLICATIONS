import {html} from '../lib.js'
import {getAll} from "../data.js";

let context = null;
export async function showHome(ctx) {
    context = ctx;
    let items = await getAll();
    ctx.render(homeTemplate(items));
}

function homeTemplate(items){
    return html `  <section class="welcomePage">
        <div id="welcomeMessage">
            <h1>My Theater</h1>
            <p>Since 1962 World Theatre Day has been celebrated by ITI Centres, ITI Cooperating Members, theatre
                professionals, theatre organizations, theatre universities and theatre lovers all over the world on
                the 27th of March. This day is a celebration for those who can see the value and importance of the
                art
                form “theatre”, and acts as a wake-up-call for governments, politicians and institutions which have
                not
                yet recognised its value to the people and to the individual and have not yet realised its potential
                for
                economic growth.</p>
        </div>
        <div id="events">
            <h1>Future Events</h1>
            <div class="theaters-container">
                
                ${items.length 
                        ? Object.values(items).map(cardTemplate)
                        : html `<h4 class="no-event">No Events Yet...</h4>`}
            </div>
        </div>
    </section>`
}

function cardTemplate(item){
    return html `  <div class="eventsInfo">
        <div class="home-image">
            <img src="${item.imageUrl}">
        </div>
        <div class="info">
            <h4 class="title">${item.title}</h4>
            <h6 class="date">${item.date}</h6>
            <h6 class="author">${item.author}</h6>
            <div class="info-buttons">
                <a class="btn-details" href="/catalog/${item._id}">Details</a>
            </div>
        </div>
    </div>`
}