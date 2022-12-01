import {html} from '../lib.js';
import {getById, updateItem} from "../data.js";

let context = null;
export async function showEdit(ctx) {
    context = ctx;
    let id = ctx.params.id;
    let item = await getById(id);
    ctx.render(editTemplate(item, onSubmit));

    async function onSubmit(e){
        e.preventDefault();

        let formData = new FormData(e.target);
        let {brand,model,imageUrl, release, designer, value} = Object.fromEntries(formData);

        if(!brand || !model || !imageUrl || !release || !designer || !value){
            return alert('Fill all required fields!');
        }

        await updateItem(id,{brand,model,imageUrl, release, designer, value});
        ctx.page.redirect('/catalog/' + id);
    }


}

function editTemplate(item, onSubmit){
    return html `  <section id="edit">
        <div class="form">
            <h2>Edit item</h2>
            <form @submit="${onSubmit}" class="edit-form">
                <input
                        type="text"
                        name="brand"
                        id="shoe-brand"
                        placeholder="Brand"
                        .value="${item.brand}"
                />
                <input
                        type="text"
                        name="model"
                        id="shoe-model"
                        placeholder="Model"
                        .value="${item.model}"
                />
                <input
                        type="text"
                        name="imageUrl"
                        id="shoe-img"
                        placeholder="Image url"
                        .value="${item.imageUrl}"
                />
                <input
                        type="text"
                        name="release"
                        id="shoe-release"
                        placeholder="Release date"
                        .value="${item.release}"
                />
                <input
                        type="text"
                        name="designer"
                        id="shoe-designer"
                        placeholder="Designer"
                        .value="${item.designer}"
                />
                <input
                        type="text"
                        name="value"
                        id="shoe-value"
                        placeholder="Value"
                        .value="${item.value}"
                />

                <button type="submit">post</button>
            </form>
        </div>
    </section>`
}