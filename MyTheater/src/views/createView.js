import {html} from '../lib.js'
import {createTheater} from "../data.js";

let context = null;
export async function showCreate(ctx) {
    context = ctx;
    ctx.render(createTemplate(onSubmit));

    async function onSubmit(e){
        e.preventDefault();

        let formData = new FormData(e.target);
        let {title, date, author, description, imageUrl } = Object.fromEntries(formData);

        if(!title || !date || !author || !description || !imageUrl){
            return alert('All fields are required!');
        }

        await createTheater({title, date, author, description, imageUrl })
        ctx.page.redirect('/');
    }

}

function createTemplate(onSubmit){
    return html ` <section id="createPage">
        <form @submit="${onSubmit}" class="create-form">
            <h1>Create Theater</h1>
            <div>
                <label for="title">Title:</label>
                <input id="title" name="title" type="text" placeholder="Theater name" value="">
            </div>
            <div>
                <label for="date">Date:</label>
                <input id="date" name="date" type="text" placeholder="Month Day, Year">
            </div>
            <div>
                <label for="author">Author:</label>
                <input id="author" name="author" type="text" placeholder="Author">
            </div>
            <div>
                <label for="description">Description:</label>
                <textarea id="description" name="description" placeholder="Description"></textarea>
            </div>
            <div>
                <label for="imageUrl">Image url:</label>
                <input id="imageUrl" name="imageUrl" type="text" placeholder="Image Url" value="">
            </div>
            <button class="btn" type="submit">Submit</button>
        </form>
    </section>`
}