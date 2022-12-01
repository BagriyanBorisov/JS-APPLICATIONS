
import { html, nothing } from '../../node_modules/lit-html/lit-html.js'
import {login} from '../dataController.js'

let context = null;
export function showLogin(ctx){
    context = ctx;
    ctx.render(createLoginView())
}

async function onSubmit(e){
    e.preventDefault();
    let formData = new FormData(e.target);
    let {email, password} = Object.fromEntries(formData);

    try{
        await login(email, password);
    }
    catch (err){
        return context.render(createLoginView(err.message));
    }
    context.modulateView();
    context.page.redirect('/');
}

function createLoginView(errorMsg){
    return html`
          <div class="row space-top">
            <div class="col-md-12">
                <h1>Login User</h1>
                <p>Please fill all fields.</p>
            </div>
        </div>
        <form @submit=${onSubmit}>
            <div class="row space-top">
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="email">Email</label>
                        <input class="form-control" id="email" type="text" name="email">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="password">Password</label>
                        <input class="form-control" id="password" type="password" name="password">
                    </div>
                    <input type="submit" class="btn btn-primary" value="Login" />
                </div>
            </div>
        </form>
        `;
}
