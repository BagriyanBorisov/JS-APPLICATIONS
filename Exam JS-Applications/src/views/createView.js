import {html} from '../lib.js'
import {createAlbum} from "../data.js";


export async function showCreate(ctx) {
    ctx.render(createTemplate(onSubmit));

    async function onSubmit(e){
        e.preventDefault();

        let formData = new FormData(e.target);

        let {singer, album, imageUrl, release, label, sales}  = Object.fromEntries(formData);

        if(!singer || !album || !imageUrl || !release || !label || !sales){
            return alert('All fields are required!');
        }

        await createAlbum({singer, album, imageUrl, release, label, sales});
        ctx.page.redirect('/catalog');
    }

}

function createTemplate(onSubmit){
    return html `<section id="create">
        <div class="form">
            <h2>Add Album</h2>
            <form @submit="${onSubmit}" class="create-form">
                <input type="text" name="singer" id="album-singer" placeholder="Singer/Band" />
                <input type="text" name="album" id="album-album" placeholder="Album" />
                <input type="text" name="imageUrl" id="album-img" placeholder="Image url" />
                <input type="text" name="release" id="album-release" placeholder="Release date" />
                <input type="text" name="label" id="album-label" placeholder="Label" />
                <input type="text" name="sales" id="album-sales" placeholder="Sales" />

                <button type="submit">post</button>
            </form>
        </div>
    </section>`
}