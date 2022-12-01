import {html} from '../lib.js'
import {login} from '../user.js'

let context = null;
export async function showLogin(ctx){
    context = ctx;
    ctx.render(loginTemplate(onSubmit));


    async function onSubmit(e){
        e.preventDefault();
        let formData = new FormData(e.target);
        let {username, password} = Object.fromEntries(formData);

        if(username.length === 0 || password.length === 0){
            return alert('Please fill all required fields.')
        }

        await login(username, password);
        ctx.modulateView();
        ctx.page.redirect('/catalog');
    }
}
function loginTemplate(onSubmit) {
return  html`<section id="login">
    <div class="container">
        <form @submit="${onSubmit}" id="login-form" action="#" method="post">
            <h1>Login</h1>
            <p>Please enter your credentials.</p>
            <hr>

            <p>Username</p>
            <input placeholder="Enter Username" name="username" type="text">

            <p>Password</p>
            <input type="password" placeholder="Enter Password" name="password">
            <input type="submit" class="registerbtn" value="Login">
        </form>
        <div class="signin">
            <p>Dont have an account?
                <a href="/register">Sign up</a>.
            </p>
        </div>
    </div>
</section>`
}




