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
        <form @submit="${onSubmit}">
            <fieldset>
                <legend>Login</legend>

                <label for="email" class="vhide">Email</label>
                <input id="email" class="email" name="email" type="text" placeholder="Email">

                <label for="password" class="vhide">Password</label>
                <input id="password" class="password" name="password" type="password" placeholder="Password">

                <button type="submit" class="login">Login</button>

                <p class="field">
                    <span>If you don't have profile click <a href="/register">here</a></span>
                </p>
            </fieldset>
        </form>
    </section>`;
}




