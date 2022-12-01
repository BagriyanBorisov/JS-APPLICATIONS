import {html} from '../lib.js'
import {login} from '../user.js'

let context = null;
export async function showLogin(ctx){
    context = ctx;
    ctx.render(loginTemplate(onSubmit));


    async function onSubmit(e){
        e.preventDefault();
        let formData = new FormData(e.target);
        let {email, password} = Object.fromEntries(formData);

        if(email.length === 0 || password.length === 0){
            return alert('Please fill all required fields.')
        }

        await login(email, password);
        ctx.modulateView();
        ctx.page.redirect('/')
    }
}
function loginTemplate(onSubmit) {
return  html`
        <section id="loginPage">
            <form @submit="${onSubmit}" class="loginForm">
                <img src="./images/logo.png" alt="logo"/>
                <h2>Login</h2>

                <div>
                    <label for="email">Email:</label>
                    <input id="email" name="email" type="text" placeholder="steven@abv.bg" value="">
                </div>

                <div>
                    <label for="password">Password:</label>
                    <input id="password" name="password" type="password" placeholder="********" value="">
                </div>

                <button class="btn" type="submit">Login</button>

                <p class="field">
                    <span>If you don't have profile click <a href="/register">here</a></span>
                </p>
            </form>
        </section>`;
}




