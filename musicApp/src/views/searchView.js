import {html,nothing} from '../lib.js'
import {getBySearch} from "../data.js";


let context = null;
export async function showSearch(ctx) {
    context = ctx;
    let matches = null;
    let clicked = false;
    ctx.render(searchTemplate(onClick,clicked,matches,onUser()));

    async function onClick(e){
        e.preventDefault();
        let inputValue = document.getElementById('search-input').value;
        if(!inputValue){
            return alert('fill search field!');
        }
        clicked = true;
        await search(inputValue);

    }

    async function search(searchString){
        matches = await getBySearch(searchString);
        ctx.render(searchTemplate(onClick,clicked,matches,onUser()))
    }

    function onUser(){
        if(ctx.user){
            return true;
        }
        return false;
    }
}

function searchTemplate(onClick,clicked,matches,onUser){
    return html ` <section id="searchPage">
        <h1>Search by Name</h1>

        <div class="search">
            <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name">
            <button @click="${onClick}" class="button-list">Search</button>
        </div>

        <h2>Results:</h2>
        <!--Show after click Search button-->
        ${clicked ? html` <div class="search-result">
            <!--If have matches-->
            ${matches.length ? Object.values(matches).map(x=> cardTemplate(x,onUser))
                    : html`<p class="no-result">No result.</p>`}

            <!--If there are no matches-->

        </div>`: nothing}
       
    </section>`
}
function cardTemplate(item,onUser){
    return html`  <div class="card-box">
        <img src=${item.imgUrl}>
        <div>
            <div class="text-center">
                <p class="name">Name: ${item.name}</p>
                <p class="artist">Artist: ${item.artist}</p>
                <p class="genre">Genre: ${item.genre}</p>
                <p class="price">Price: $${item.price}</p>
                <p class="date">Release Date: ${item.releaseDate}</p>
            </div>
            <div class="btn-group">
               ${onUser ? html` <a href="/catalog/${item._id}" id="details">Details</a>` : nothing}
            </div> 
        </div>
    </div>`
}