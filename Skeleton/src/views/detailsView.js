import {html,nothing} from '../lib.js'


let context = null;
export async function showDetails(ctx) {
    context = ctx;
    ctx.render(detailsTemplate());

}

function detailsTemplate(){
    return html `<p>DetailsView</p>`
}