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
        ctx.page.redirect('/catalog')
    }
}
function loginTemplate(onSubmit) {
return  html` <section id="login">
    <div @submit="${onSubmit}" class="form">
        <h2>Login</h2>
        <form class="login-form">
            <input type="text" name="email" id="email" placeholder="email" />
            <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="password"
            />
            <button type="submit">login</button>
            <p class="message">
                Not registered? <a href="/register">Create an account</a>
            </p>
        </form>
    </div>
</section>`
}




