//VERIFY IMPORT ROUTES, HOWEVER ROUTES SHOULD BE ACCURATE IF FILE STRUCTURE NOT MODIFIED
import { html } from '../../node_modules/lit-html/lit-html.js'
import {register} from '../dataController.js'

let context = null;
export function showRegister(ctx){
    context = ctx;
    ctx.render(createRegisterView())
}

async function onSubmit(e){
    e.preventDefault();
    let formData = new FormData(e.target);
    let {email, password, rePass} = Object.fromEntries(formData);

    //----------- Modify this validation according to the current task -----------
    if(password !== rePass){
        return context.render(createRegisterView("Passwords do not match, please try again!"))
    }

    await register(email, password);
    context.modulateView();
    context.page.redirect('/');
}

//EXAMPLE HTML - NEEDS ADJUSTING BASED ON THE index.html FILE PROVIDED WITH THE TASK
//----------- Includes error message as per validation of password -----------
function createRegisterView(msg){
    return html`
        <div class="row space-top">
            <div class="col-md-12">
                <h1>Register New User</h1>
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
                    <div class="form-group">
                        <label class="form-control-label" for="rePass">Repeat</label>
                        <input class="form-control" id="rePass" type="password" name="rePass">
                    </div>
                    <input type="submit" class="btn btn-primary" value="Register" />
                </div>
            </div>
        </form>
        `;
}