import {html} from '../lib.js'
import {register} from "../user.js";

let context = null;
export async function showRegister(ctx){
    context = ctx;
    ctx.render(registerTemplate(onSubmit));
    async function onSubmit(e){
        e.preventDefault();
        let formData = new FormData(e.target);
        let {email, password} = Object.fromEntries(formData);
        let repeatPassword = e.target.getElementsByClassName('conf-pass')[0].value;

        if(email.length === 0 || password.length === 0 || repeatPassword.length === 0){
            return alert('Please fill all required fields.')
        }
        if(password !== repeatPassword){
            return alert('Passwords dont match');
        }
        await register(email, password);
        e.target.reset();
        ctx.modulateView();
        ctx.page.redirect('/')
    }
}
function registerTemplate(onSubmit) {
    return  html`
        <section id="registerPage">
            <form @submit="${onSubmit}">
                <fieldset>
                    <legend>Register</legend>

                    <label for="email" class="vhide">Email</label>
                    <input id="email" class="email" name="email" type="text" placeholder="Email">

                    <label for="password" class="vhide">Password</label>
                    <input id="password" class="password" name="password" type="password" placeholder="Password">

                    <label for="conf-pass" class="vhide">Confirm Password:</label>
                    <input id="conf-pass" class="conf-pass" name="conf-pass" type="password" placeholder="Confirm Password">

                    <button type="submit" class="register">Register</button>

                    <p class="field">
                        <span>If you already have profile click <a href="#">here</a></span>
                    </p>
                </fieldset>
            </form>
        </section>`;
}




