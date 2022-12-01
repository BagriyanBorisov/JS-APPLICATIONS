import {html} from '../lib.js'
import {register} from "../user.js";

let context = null;
export async function showRegister(ctx){
    context = ctx;
    ctx.render(registerTemplate(onSubmit));
    async function onSubmit(e){
        e.preventDefault();
        let formData = new FormData(e.target);
        let {username, password, repeatPass} = Object.fromEntries(formData);

        if(username.length === 0 || password.length === 0 || repeatPass.length === 0){
            return alert('Please fill all required fields.')
        }
        if(password !== repeatPass){
            return alert('Passwords dont match');
        }
        await register(username, password);
        e.target.reset();
        ctx.modulateView();
        ctx.page.redirect('/catalog')

    }
}
function registerTemplate(onSubmit) {
    return  html` <section id="register">
        <div class="container">
            <form @submit="${onSubmit}" id="register-form">
                <h1>Register</h1>
                <p>Please fill in this form to create an account.</p>
                <hr>

                <p>Username</p>
                <input type="text" placeholder="Enter Username" name="username" required>

                <p>Password</p>
                <input type="password" placeholder="Enter Password" name="password" required>

                <p>Repeat Password</p>
                <input type="password" placeholder="Repeat Password" name="repeatPass" required>
                <hr>

                <input type="submit" class="registerbtn" value="Register">
            </form>
            <div class="signin">
                <p>Already have an account?
                    <a href="/login">Sign in</a>.
                </p>
            </div>
        </div>
    </section>`;
}




