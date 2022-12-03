import {html,nothing} from '../lib.js'
import {deleteById, getById} from "../data.js";


let context = null;
export async function showDetails(ctx) {
    context = ctx;
    let id = ctx.params.id;
    let item = await getById(id);
    ctx.render(detailsTemplate(item, isCreator(), onDelete));

    function isCreator(){
        if(ctx.user){
            if(ctx.user._id === item._ownerId){
                return true;
            }
        }
        return false
    }

  async  function onDelete(e){
        e.preventDefault();
        if(confirm('Are you sure you want to delete this meme?')){
            await deleteById(id);
            ctx.page.redirect('/catalog')
        }
    }

}

function detailsTemplate(item, isCreator, onDelete){
    return html ` <section id="meme-details">
        <h1>Meme Title: ${item.title}

        </h1>
        <div class="meme-details">
            <div class="meme-img">
                <img alt="meme-alt" src="${item.imageUrl}">
            </div>
            <div class="meme-description">
                <h2>Meme Description</h2>
                <p>
                   ${item.description}
                </p>

                <!-- Buttons Edit/Delete should be displayed only for creator of this meme  -->
                ${isCreator ? html `
                    <a class="button warning" href="/edit/${item._id}">Edit</a>
                    <button @click="${onDelete}" class="button danger">Delete</button>
                ` : nothing}
              

            </div>
        </div>
    </section>`
}