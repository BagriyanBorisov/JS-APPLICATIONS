import {html} from '../lib.js'
import {login} from '../user.js'
import {onNotification} from "./onNotificationView.js";

let context = null;
export async function showLogin(ctx){
    context = ctx;
    ctx.render(loginTemplate(onSubmit));


    async function onSubmit(e){
        e.preventDefault();
        let formData = new FormData(e.target);
        let {email, password} = Object.fromEntries(formData);

        if(email.length === 0 || password.length === 0){
            return onNotification('Please fill all required fields.')
        }

        await login(email, password);
        ctx.modulateView();
        ctx.page.redirect('/catalog');
    }
}
function loginTemplate(onSubmit) {
return  html`   <section id="login">
    <form @submit="${onSubmit}" id="login-form">
        <div class="container">
            <h1>Login</h1>
            <label for="email">Email</label>
            <input id="email" placeholder="Enter Email" name="email" type="text">
            <label for="password">Password</label>
            <input id="password" type="password" placeholder="Enter Password" name="password">
            <input type="submit" class="registerbtn button" value="Login">
            <div class="container signin">
                <p>Dont have an account?<a href="/register">Sign up</a>.</p>
            </div>
        </div>
    </form>
</section>
`
}




