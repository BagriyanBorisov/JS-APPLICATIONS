import {html} from '../lib.js'
import {register} from "../user.js";

let context = null;
export async function showRegister(ctx){
    context = ctx;
    ctx.render(registerTemplate(onSubmit));
    async function onSubmit(e){
        e.preventDefault();
        let formData = new FormData(e.target);
        let {email, password} = Object.fromEntries(formData);
        let repeatPassword = e.target.getElementsByClassName('conf-pass')[0].value;

        if(email.length === 0 || password.length === 0 || repeatPassword.length === 0){
            return alert('Please fill all required fields.')
        }
        if(password !== repeatPassword){
            return alert('Passwords dont match');
        }
        await register(email, password);
        e.target.reset();
        ctx.modulateView();

    }
}
function registerTemplate(onSubmit) {
    return  html`<p>RegisterView</p>`;
}




