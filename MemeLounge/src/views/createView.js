import {html} from '../lib.js'
import {createItem} from "../data.js";
import {onNotification} from "./onNotificationView.js";

let context = null;
export async function showCreate(ctx) {
    context = ctx;
    ctx.render(createTemplate(onSubmit));

    async function onSubmit(e){
        e.preventDefault();

        let formData = new FormData(e.target);
        let {title, description, imageUrl} = Object.fromEntries(formData);

        if(!title || !description || !imageUrl){
            return await onNotification('All Fields are required!')
        }

        await createItem({title, description, imageUrl});
        ctx.page.redirect('/catalog');
    }

}

function createTemplate(onSubmit){
    return html ` <section id="create-meme">
        <form @submit="${onSubmit}" id="create-form">
            <div class="container">
                <h1>Create Meme</h1>
                <label for="title">Title</label>
                <input id="title" type="text" placeholder="Enter Title" name="title">
                <label for="description">Description</label>
                <textarea id="description" placeholder="Enter Description" name="description"></textarea>
                <label for="imageUrl">Meme Image</label>
                <input id="imageUrl" type="text" placeholder="Enter meme ImageUrl" name="imageUrl">
                <input type="submit" class="registerbtn button" value="Create Meme">
            </div>
        </form>
    </section>`
}