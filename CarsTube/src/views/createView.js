import {html} from '../lib.js'
import {createCar} from "../data.js";

let context = null;
export async function showCreate(ctx) {
    context = ctx;
    ctx.render(createTemplate(onSubmit));

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
        await createCar({brand, model, description, year: Number(year), imageUrl,price: Number(price)});
        ctx.page.redirect('/catalog');

    }



}

function createTemplate(onSubmit){
    return html `<section id="create-listing">
        <div class="container">
            <form @submit="${onSubmit}" id="create-form">
                <h1>Create Car Listing</h1>
                <p>Please fill in this form to create an listing.</p>
                <hr>

                <p>Car Brand</p>
                <input type="text" placeholder="Enter Car Brand" name="brand">

                <p>Car Model</p>
                <input type="text" placeholder="Enter Car Model" name="model">

                <p>Description</p>
                <input type="text" placeholder="Enter Description" name="description">

                <p>Car Year</p>
                <input type="number" placeholder="Enter Car Year" name="year">

                <p>Car Image</p>
                <input type="text" placeholder="Enter Car Image" name="imageUrl">

                <p>Car Price</p>
                <input type="number" placeholder="Enter Car Price" name="price">

                <hr>
                <input type="submit" class="registerbtn" value="Create Listing">
            </form>
        </div>
    </section>`
}