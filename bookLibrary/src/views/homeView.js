import {html} from '../lib.js'

let context = null;
export async function showHome(ctx) {
    context = ctx;
    ctx.render(homeTemplate());
}

function homeTemplate(){
    return html `<p>HomeView</p>`
}
