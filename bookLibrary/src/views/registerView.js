import {html} from '../lib.js'
import {register} from "../user.js";


export async function showRegister(ctx){
    ctx.render(registerTemplate(onSubmit));
    async function onSubmit(e){
        e.preventDefault();
        let formData = new FormData(e.target);
        let {email, password} = Object.fromEntries(formData);
        let repeatPassword = e.target.querySelector('#repeat-pass').value;

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
    return  html` <section id="register-page" class="register">
        <form @submit="${onSubmit}" id="register-form" action="" method="">
            <fieldset>
                <legend>Register Form</legend>
                <p class="field">
                    <label for="email">Email</label>
                    <span class="input">
                            <input type="text" name="email" id="email" placeholder="Email">
                        </span>
                </p>
                <p class="field">
                    <label for="password">Password</label>
                    <span class="input">
                            <input type="password" name="password" id="password" placeholder="Password">
                        </span>
                </p>
                <p class="field">
                    <label for="repeat-pass">Repeat Password</label>
                    <span class="input">
                            <input  type="password" name="confirm-pass" id="repeat-pass" placeholder="Repeat Password">
                        </span>
                </p>
                <input class="button submit" type="submit" value="Register">
            </fieldset>
        </form>
    </section>`;
}




