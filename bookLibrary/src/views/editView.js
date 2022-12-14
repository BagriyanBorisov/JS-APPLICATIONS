import {html} from '../lib.js';
import {updateBook, getById} from "../data.js";


export async function showEdit(ctx) {
    let id = ctx.params.id;
    let item = await getById(id);
    ctx.render(editTemplate(item,onSubmit));

    async function onSubmit(e){
        e.preventDefault();
        let formData = new FormData(e.target);
        let {title, description, imageUrl, type} = Object.fromEntries(formData);
        if(!title || !description || !imageUrl || !type){
            return alert('Please fill all required fields.')
        }

        await updateBook(id,{title, description, imageUrl, type});
        ctx.page.redirect('/catalog/' + id);
    }

}

function editTemplate(item,onSubmit){
    return html ` <section id="edit-page" class="edit">
        <form @submit="${onSubmit}" id="edit-form" action="#" method="">
            <fieldset>
                <legend>Edit my Book</legend>
                <p class="field">
                    <label for="title">Title</label>
                    <span class="input">
                            <input type="text" name="title" id="title" .value=${item.title}>
                        </span>
                </p>
                <p class="field">
                    <label for="description">Description</label>
                    <span class="input">
                            <textarea name="description"
                                      id="description">${item.description}</textarea>
                        </span>
                </p>
                <p class="field">
                    <label for="image">Image</label>
                    <span class="input">
                            <input type="text" name="imageUrl" id="image" .value="${item.imageUrl}">
                        </span>
                </p>
                <p class="field">
                    <label for="type">Type</label>
                    <span class="input">
                            <select id="type" name="type" .value="${item.type}">
                                <option value="Fiction">Fiction</option>
                                <option value="Romance">Romance</option>
                                <option value="Mistery">Mistery</option>
                                <option value="Classic">Clasic</option>
                                <option value="Other">Other</option>
                            </select>
                        </span>
                </p>
                <input class="button submit" type="submit" value="Save">
            </fieldset>
        </form>
    </section>`
}