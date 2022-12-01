import {html} from '../lib.js';
import {updateTheater, getById} from "../data.js";

let context = null;
export async function showEdit(ctx) {
    context = ctx;
    let id = ctx.params.id;
    let item = await getById(id);
    ctx.render(editTemplate(item, onSubmit));

    async function onSubmit(e){
        e.preventDefault();

        let formData = new FormData(e.target);
        let {title, date, author, description, imageUrl } = Object.fromEntries(formData);

        if(!title || !date || !author || !description || !imageUrl){
            return alert('All fields are required!');
        }

        await updateTheater(id,{title, date, author, description, imageUrl })
        ctx.page.redirect('/catalog/' + id);
    }

}

function editTemplate(item, onSubmit){
    return html `<section id="editPage">
        <form @submit=${onSubmit} class="theater-form">
            <h1>Edit Theater</h1>
            <div>
                <label for="title">Title:</label>
                <input id="title" name="title" type="text" placeholder="Theater name" .value="${item.title}">
            </div>
            <div>
                <label for="date">Date:</label>
                <input id="date" name="date" type="text" placeholder="Month Day, Year" .value="${item.date}">
            </div>
            <div>
                <label for="author">Author:</label>
                <input id="author" name="author" type="text" placeholder="Author"
                       .value="${item.author}">
            </div>
            <div>
                <label for="description">Theater Description:</label>
                <textarea id="description" name="description"
                          placeholder="Description">${item.description}</textarea>
            </div>
            <div>
                <label for="imageUrl">Image url:</label>
                <input id="imageUrl" name="imageUrl" type="text" placeholder="Image Url"
                       .value="${item.imageUrl}">
            </div>
            <button class="btn" type="submit">Submit</button>
        </form>
    </section>`
}