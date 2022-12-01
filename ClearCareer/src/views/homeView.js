import {html} from '../lib.js'

let context = null;
export async function showHome(ctx) {
    context = ctx;
    ctx.render(homeTemplate());
}

function homeTemplate(){
    return html `<section id="home">
        <img
                src="./images/pngkey.com-hunting-png-6697165-removebg-preview.png"
                alt="home"
        />
        <h2>Searching for a job?</h2>
        <h3>The right place for a new career start!</h3>
    </section>`
}
