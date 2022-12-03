import {html} from '../lib.js';
import {getById, updateItem} from "../data.js";
import {onNotification} from "./onNotificationView.js";

let context = null;
export async function showEdit(ctx) {
    context = ctx;
    let id = ctx.params.id;
    let item = await getById(id);
    ctx.render(editTemplate(item,onSubmit));


    async function onSubmit(e){
        e.preventDefault();

        let formData = new FormData(e.target);
        let {title, description, imageUrl} = Object.fromEntries(formData);

        if(!title || !description || !imageUrl){
            return await onNotification('All Fields are required!')
        }

        await updateItem(id,{title, description, imageUrl});
        ctx.page.redirect('/catalog/' + id);
    }
}

function editTemplate(item,onSubmit){
    return html ` <section id="edit-meme">
        <form @submit="${onSubmit}" id="edit-form">
            <h1>Edit Meme</h1>
            <div class="container">
                <label for="title">Title</label>
                <input id="title" type="text" placeholder="Enter Title" name="title" .value="${item.title}">
                <label for="description">Description</label>
                <textarea id="description" placeholder="Enter Description" name="description">${item.description}</textarea>
                <label for="imageUrl">Image Url</label>
                <input id="imageUrl" type="text" placeholder="Enter Meme ImageUrl" name="imageUrl" .value="${item.imageUrl}">
                <input type="submit" class="registerbtn button" value="Edit Meme">
            </div>
        </form>
    </section>`
}