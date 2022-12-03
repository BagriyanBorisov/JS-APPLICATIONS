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
        let repeatPassword = e.target.getElementsByClassName('repeatPass')[0].value;


        if(email.length === 0 || password.length === 0 || repeatPassword.length === 0){
            return alert('Please fill all required fields.')
        }
        if(password !== repeatPassword){
            return alert('Passwords dont match');
        }
        await register(email, password);
        e.target.reset();
        ctx.modulateView();
        ctx.page.redirect('/catalog');

    }
}
function registerTemplate(onSubmit) {
    return  html`<section id="register">
        <div class="form">
            <h2>Register</h2>
            <form @submit="${onSubmit}" class="login-form">
                <input type="text" name="email" id="register-email" placeholder="email" />
                <input type="password" name="password" id="register-password" placeholder="password" />
                <input class="repeatPass" type="password" name="re-password" id="repeat-password" placeholder="repeat password" />
                <button type="submit">register</button>
                <p class="message">Already registered? <a href="/login">Login</a></p>
            </form>
        </div>
    </section>`;
}




