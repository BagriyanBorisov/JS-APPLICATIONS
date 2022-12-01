import {html} from '../lib.js'

let context = null;
export async function showCreate(ctx) {
    context = ctx;
    ctx.render(createTemplate());

}

function createTemplate(){
    return html `<p>CreateView</p>`
}