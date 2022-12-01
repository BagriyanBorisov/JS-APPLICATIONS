import {register} from '../../api/user.js';

const section = document.getElementById('register-view');
const form = section.querySelector('form');
form.addEventListener('submit', onSubmit);

let ctx = null;
export async function showRegister(context){
    ctx = context;
    context.showSection(section);
 }

 
 async function onSubmit(e){
    e.preventDefault()
    const formData = new FormData(form);

    const {email, password, repeatPassword} = Object.fromEntries(formData);

    if(password !== repeatPassword){
        alert('passwords does not match!');
    }
    else{
        await register(email, password);
        form.reset();
        ctx.updateNavigate();
        ctx.goTo("/");
    }

    
 }