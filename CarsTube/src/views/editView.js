import {html} from '../lib.js';
import {updateCar, getById} from "../data.js";

let context = null;
export async function showEdit(ctx) {
    context = ctx;
    let id = ctx.params.id;
    let item = await getById(id);
    ctx.render(editTemplate(item, onSubmit));

    async function onSubmit(e){
        e.preventDefault();
        let formData =  new FormData(e.target);
        let {brand, model, description, year, imageUrl, price} = Object.fromEntries(formData);

        if(!brand || !model || !description || !year || !imageUrl || !price){
            return alert('All Fields are required!');
        }
        if(Number(price) <= 0 || Number(year) <= 0 ){
            return alert('Year and Price must be a positive number!')
        }
        await updateCar(id,{brand, model, description, year: Number(year), imageUrl,price: Number(price)});
        ctx.page.redirect('/catalog/' + id);

    }

}

function editTemplate(item,onSubmit){
    return html `  <section id="edit-listing">
        <div class="container">

            <form @submit="${onSubmit}" id="edit-form">
                <h1>Edit Car Listing</h1>
                <p>Please fill in this form to edit an listing.</p>
                <hr>

                <p>Car Brand</p>
                <input type="text" placeholder="Enter Car Brand" name="brand" .value="${item.brand}">

                <p>Car Model</p>
                <input type="text" placeholder="Enter Car Model" name="model" .value="${item.model}">

                <p>Description</p>
                <input type="text" placeholder="Enter Description" name="description" .value="${item.description}">

                <p>Car Year</p>
                <input type="number" placeholder="Enter Car Year" name="year" .value="${item.year}">

                <p>Car Image</p>
                <input type="text" placeholder="Enter Car Image" name="imageUrl" .value="${item.imageUrl}">

                <p>Car Price</p>
                <input type="number" placeholder="Enter Car Price" name="price" .value="${item.price}">

                <hr>
                <input type="submit" class="registerbtn" value="Edit Listing">
            </form>
        </div>
    </section>`
}