import {html} from '../lib.js';
import {getById, updateItem} from "../data.js";

let context = null;
export async function showEdit(ctx) {
    context = ctx;
    let id = ctx.params.id;
    let item = await getById(id);
    ctx.render(editTemplate(item,onSubmit));

    async function onSubmit(e){
        e.preventDefault();

        let formData = new FormData(e.target);
        let {title, description, imageUrl, address, phone} = Object.fromEntries(formData);

        if(!title || ! description || !imageUrl || !address || !phone){
            return alert('All fields are required!');
        }

        await updateItem(id,{title, description, imageUrl, address, phone});
        e.target.reset();
        ctx.page.redirect('/catalog/' + id);
    }
}

function editTemplate(item,onSubmit){
    return html `  <section id="edit-page" class="auth">
        <form @submit="${onSubmit}" id="edit">
            <h1 class="title">Edit Post</h1>

            <article class="input-group">
                <label for="title">Post Title</label>
                <input type="title" name="title" id="title" .value="${item.title}">
            </article>

            <article class="input-group">
                <label for="description">Description of the needs </label>
                <input type="text" name="description" id="description" .value="${item.description}">
            </article>

            <article class="input-group">
                <label for="imageUrl"> Needed materials image </label>
                <input type="text" name="imageUrl" id="imageUrl" .value="${item.imageUrl}">
            </article>

            <article class="input-group">
                <label for="address">Address of the orphanage</label>
                <input type="text" name="address" id="address" .value="${item.address}">
            </article>

            <article class="input-group">
                <label for="phone">Phone number of orphanage employee</label>
                <input type="text" name="phone" id="phone" .value="${item.phone}">
            </article>

            <input type="submit" class="btn submit" value="Edit Post">
        </form>
    </section>`
}