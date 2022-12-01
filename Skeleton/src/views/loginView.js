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
    }
}
function loginTemplate(onSubmit) {
return  html`<p>LoginView</p>`
}




