import {html} from '../lib.js';
import { getById, updateItem} from "../data.js";

let context = null;
export async function showEdit(ctx) {
    context = ctx;
    let id = ctx.params.id;
    let item = await getById(id);
    ctx.render(editTemplate(item, onSubmit));

    async function onSubmit(e){
        e.preventDefault();

        let formData = new FormData(e.target);
        let {title, imageUrl, category, description, requirements, salary} = Object.fromEntries(formData);

        if(!title || !imageUrl || !category || !description || !requirements || !salary){
            return alert('All fields are required!');
        }

        await updateItem(id,{title, imageUrl, category, description, requirements, salary});
        e.target.reset();
        ctx.page.redirect('/catalog/' + id);
    }



}

function editTemplate(item, onSubmit){
    return html `<section id="edit">
        <div class="form">
            <h2>Edit Offer</h2>
            <form @submit="${onSubmit}" class="edit-form">
                <input
                        type="text"
                        name="title"
                        id="job-title"
                        placeholder="Title"
                        .value="${item.title}"
                />
                <input
                        type="text"
                        name="imageUrl"
                        id="job-logo"
                        placeholder="Company logo url"
                        .value="${item.imageUrl}"
                />
                <input
                        type="text"
                        name="category"
                        id="job-category"
                        placeholder="Category"
                        .value="${item.category}"
                />
                <textarea
                        id="job-description"
                        name="description"
                        placeholder="Description"
                        .value="${item.description}"
                        rows="4"
                        cols="50"
                ></textarea>
                <textarea
                        id="job-requirements"
                        name="requirements"
                        placeholder="Requirements"
                        .value="${item.requirements}"
                        rows="4"
                        cols="50"
                ></textarea>
                <input
                        type="text"
                        name="salary"
                        id="job-salary"
                        placeholder="Salary"
                        .value="${item.salary}"
                />

                <button type="submit">post</button>
            </form>
        </div>
    </section>`
}