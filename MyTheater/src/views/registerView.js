import {html} from '../lib.js'
import {register} from "../user.js";

let context = null;
export async function showRegister(ctx){
    context = ctx;
    ctx.render(registerTemplate(onSubmit));
    async function onSubmit(e){
        e.preventDefault();
        let formData = new FormData(e.target);
        let {email, password,repeatPassword} = Object.fromEntries(formData);


        if(email.length === 0 || password.length === 0 || repeatPassword.length === 0){
            return alert('Please fill all required fields.')
        }
        if(password !== repeatPassword){
            return alert('Passwords dont match');
        }
        await register(email, password);
        e.target.reset();
        ctx.modulateView();
        ctx.page.redirect('/');

    }
}
function registerTemplate(onSubmit) {
    return  html` <section id="registerPage">
        <form @submit="${onSubmit}" class="registerForm">
            <h2>Register</h2>
            <div class="on-dark">
                <label for="email">Email:</label>
                <input id="email" name="email" type="text" placeholder="steven@abv.bg" value="">
            </div>

            <div class="on-dark">
                <label for="password">Password:</label>
                <input id="password" name="password" type="password" placeholder="********" value="">
            </div>

            <div class="on-dark">
                <label for="repeatPassword">Repeat Password:</label>
                <input id="repeatPassword" name="repeatPassword" type="password" placeholder="********" value="">
            </div>

            <button class="btn" type="submit">Register</button>

            <p class="field">
                <span>If you have profile click <a href="/login">here</a></span>
            </p>
        </form>
    </section>`;
}




