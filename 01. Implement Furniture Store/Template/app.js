import page from './node_modules/page/page.mjs';
import { render } from './node_modules/lit-html/lit-html.js';


const root = document.querySelector('.container');

import { showLogin } from './src/views/loginView.js';
import { showRegister } from './src/views/registerView.js';
import { logOut } from './src/dataController.js'
import { showCreate } from './src/views/createView.js';
import { showCatalog } from './src/views/catalogView.js';
import { showDetails} from './src/views/detailsView.js';

page(middleWare);
page('index.html', '/');
page('/', showCatalog);
page('/login', showLogin);
page('/register', showRegister);
page('/logout', async function () {
    await logOut();
    modulateView();
    page.redirect('/');
});

page('/catalog', showCatalog);
page('/create', showCreate);
page('/details/:id', showDetails);


page.start();
modulateView();
function middleWare(ctx, next, id) {
    ctx.render = function (content) {
        render(content, root);
    }
    ctx.modulateView = modulateView;
    ctx.id = id;
    next();
}


function modulateView() {
    const userData = JSON.parse(sessionStorage.getItem("userData"));
    if (userData) {
        document.querySelectorAll("#user").forEach(e => e.style.display = "inline-block");
        document.querySelectorAll("#guest").forEach(e => e.style.display = "none");

    }
    else {
        document.querySelectorAll("#user").forEach(e => e.style.display = "none");
        document.querySelectorAll("#guest").forEach(e => e.style.display = "inline-block");

    }
}