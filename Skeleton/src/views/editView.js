import {html} from '../lib.js';

let context = null;
export async function showEdit(ctx) {
    context = ctx;
    ctx.render(editTemplate());


}

function editTemplate(){
    return html `<p>EditView</p>`
}