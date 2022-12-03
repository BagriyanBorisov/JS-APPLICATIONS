import {html} from '../lib.js';
import {getById, updateAlbum} from "../data.js";


export async function showEdit(ctx) {

    let id = ctx.params.id;
    let item = await getById(id);
    ctx.render(editTemplate(item, onSubmit));

    async function onSubmit(e){
        e.preventDefault();

        let formData = new FormData(e.target);

        let {singer, album, imageUrl, release, label, sales}  = Object.fromEntries(formData);

        if(!singer || !album || !imageUrl || !release || !label || !sales){
            return alert('All fields are required!');
        }

        await updateAlbum(id,{singer, album, imageUrl, release, label, sales});
        ctx.page.redirect('/catalog/' + id);
    }

}

function editTemplate(item, onSubmit){
    return html ` <section id="edit">
        <div class="form">
            <h2>Edit Album</h2>
            <form @submit="${onSubmit}" class="edit-form">
                <input type="text" name="singer" id="album-singer" placeholder="Singer/Band" .value="${item.singer}" />
                <input type="text" name="album" id="album-album" placeholder="Album" .value="${item.album}" />
                <input type="text" name="imageUrl" id="album-img" placeholder="Image url" .value="${item.imageUrl}" />
                <input type="text" name="release" id="album-release" placeholder="Release date" .value="${item.release}" />
                <input type="text" name="label" id="album-label" placeholder="Label" .value="${item.label}" />
                <input type="text" name="sales" id="album-sales" placeholder="Sales" .value="${item.sales}" />

                <button type="submit">post</button>
            </form>
        </div>
    </section>`
}