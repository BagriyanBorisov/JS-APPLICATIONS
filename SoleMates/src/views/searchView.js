import {html, nothing} from '../lib.js'
import {searchItems} from "../data.js";

let context = null;

export async function showSearch(ctx) {
    context = ctx;
    ctx.render(searchTemplate(onSubmit));

   async function onSubmit(e){
        e.preventDefault();
        let formData = new FormData(e.target);
        let {search} = Object.fromEntries(formData);

        let items = await searchItems(search);
        if(items.length){
            ctx.render(searchTemplate(onSubmit,items,true, isUser()))
        } else {
            ctx.render(searchTemplate(onSubmit,items,false))
        }

    }


    function isUser(){
       if(ctx.user){
           return true;
       }
       return false;
    }
}


function searchTemplate(onSubmit,items, bool,isUser){
    return html`      <section id="search">
        <h2>Search by Brand</h2>

        <form @submit="${onSubmit}" class="search-wrapper cf">
            <input
                    id="#search-input"
                    type="text"
                    name="search"
                    placeholder="Search here..."
                    required
            />
            <button type="submit">Search</button>
        </form>

        <h3>Results:</h3>

        ${bool ? html` <div id="search-container">
        <ul class="card-wrapper">
            <!-- Display a li with information about every post (if any)-->
            ${Object.values(items).map(x=> cardTemplate(x, isUser))}
        </ul>`: nothing}
       
        ${bool !== undefined && items.length === 0 ? html ` <h2>There are no results found.</h2>` : nothing }
            <!-- Display an h2 if there are no posts -->
            <!-- <h2>There are no results found.</h2> -->
        </div>
    </section>`
}

function cardTemplate(item,isUser) {
    return html`
        <li class="card">
            <img src="${item.imageUrl}" alt="travis"/>
            <p>
                <strong>Brand: </strong><span class="brand">${item.brand}</span>
            </p>
            <p>
                <strong>Model: </strong
                ><span class="model">${item.model}</span>
            </p>
            <p><strong>Value:</strong><span class="value">${item.value}</span>$</p>
            ${isUser ? html ` <a class="details-btn" href="/catalog/${item._id}">Details</a>`
            : nothing}
           
        </li>`
}

