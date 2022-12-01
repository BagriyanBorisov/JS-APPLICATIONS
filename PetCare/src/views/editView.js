import {html, nothing} from '../lib.js'
import {createPet, getById, updateById} from "../data.js";

let context = null;

export async function showEdit(ctx) {

    let id = ctx.params.id;
    let item = await getById(id);
    ctx.render(editTemplate(onSubmit, item));


    async function onSubmit(e){
        e.preventDefault();

        let formData = new FormData(e.target);
        let {name,breed,age,weight,image} = Object.fromEntries(formData);

        if(!name || !breed || !age || !weight || !image){
            return alert('Please fill are fields before creating!')
        }
        await updateById(id,{name,breed,age,weight,image})
        ctx.page.redirect(`/catalog/${id}`);
    }
}


function editTemplate(onSubmit, item){
    return html`   <section id="editPage">
        <form @submit=${onSubmit} class="editForm">
            <img src="./images/editpage-dog.jpg">
            <div>
                <h2>Edit PetPal</h2>
                <div class="name">
                    <label for="name">Name:</label>
                    <input name="name" id="name" type="text" .value=${item.name}>
                </div>
                <div class="breed">
                    <label for="breed">Breed:</label>
                    <input name="breed" id="breed" type="text" .value=${item.breed}>
                </div>
                <div class="Age">
                    <label for="age">Age:</label>
                    <input name="age" id="age" type="text" .value=${item.age}>
                </div>
                <div class="weight">
                    <label for="weight">Weight:</label>
                    <input name="weight" id="weight" type="text" .value=${item.weight}>
                </div>
                <div class="image">
                    <label for="image">Image:</label>
                    <input name="image" id="image" type="text" .value=${item.image}>
                </div>
                <button class="btn" type="submit">Edit Pet</button>
            </div>
        </form>
    </section>
    `
}