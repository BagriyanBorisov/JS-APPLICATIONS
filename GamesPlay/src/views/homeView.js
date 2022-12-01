import {html} from '../lib.js'
import {getLatest} from "../data.js";

let context = null;
export async function showHome(ctx) {
    context = ctx;
    let items = await getLatest();
    ctx.render(homeTemplate(items));
}

function homeTemplate(items){
    return html `    <section id="welcome-world">

        <div class="welcome-message">
            <h2>ALL new games are</h2>
            <h3>Only in GamesPlay</h3>
        </div>
        <img src="./images/four_slider_img01.png" alt="hero">

        <div id="home-page">
            <h1>Latest Games</h1>

            <!-- Display div: with information about every game (if any) -->
            ${items.length ?
                    items.length > 3 ?
                    Object.values(items.slice(0,3)).map(cardTemplate) :
                            Object.values(items).map(cardTemplate)
            : html` <p class="no-articles">No games yet</p>`}

            <!-- Display paragraph: If there is no games  -->
           
        </div>
    </section>`
}

function cardTemplate(item){
    return html `<div class="game">
        <div class="image-wrap">
            <img src="${item.imageUrl}">
        </div>
        <h3>${item.title}</h3>
        <div class="rating">
            <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
        </div>
        <div class="data-buttons">
            <a href="/catalog/${item._id}" class="btn details-btn">Details</a>
        </div>
    </div>`
}
