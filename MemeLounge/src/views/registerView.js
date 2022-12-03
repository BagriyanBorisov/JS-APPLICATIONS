import {html} from '../lib.js'
import {register} from "../user.js";
import {onNotification} from "./onNotificationView.js";

let context = null;
export async function showRegister(ctx){

    context = ctx;
    ctx.render(registerTemplate(onSubmit));
    async function onSubmit(e){
        e.preventDefault();
        let formData = new FormData(e.target);
        let {username,email, password, repeatPass, gender} = Object.fromEntries(formData);

            if(email.length === 0 || password.length === 0 || repeatPass.length === 0){
               return await onNotification('Please fill all required fields.')
            }
            if(password !== repeatPass){
                return await onNotification('Passwords dont match');
            }

        await register(username,email, password,gender);
        e.target.reset();
        ctx.modulateView();
        ctx.page.redirect('/catalog');

    }
}
function registerTemplate(onSubmit) {
    return  html`<section id="register">
        <form @submit="${onSubmit}" id="register-form">
            <div class="container">
                <h1>Register</h1>
                <label for="username">Username</label>
                <input id="username" type="text" placeholder="Enter Username" name="username">
                <label for="email">Email</label>
                <input id="email" type="text" placeholder="Enter Email" name="email">
                <label for="password">Password</label>
                <input id="password" type="password" placeholder="Enter Password" name="password">
                <label for="repeatPass">Repeat Password</label>
                <input id="repeatPass" type="password" placeholder="Repeat Password" name="repeatPass">
                <div class="gender">
                    <input type="radio" name="gender" id="female" value="female">
                    <label for="female">Female</label>
                    <input type="radio" name="gender" id="male" value="male" checked>
                    <label for="male">Male</label>
                </div>
                <input type="submit" class="registerbtn button" value="Register">
                <div class="container signin">
                    <p>Already have an account?<a href="/login">Sign in</a>.</p>
                </div>
            </div>
        </form>
    </section>`;
}




