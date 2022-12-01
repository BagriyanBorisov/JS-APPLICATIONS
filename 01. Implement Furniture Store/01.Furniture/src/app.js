import {html, render} from './lib.js';
import {page} from './lib.js';
import { showCatalog } from './views/catalogView.js';
import { showCreate } from './views/createView.js';
import { showLogin } from './views/loginView.js';
import { showRegister } from './views/registerView.js';

const root = document.querySelector('.container');

page(decorateContext);
page('/index.html', '/');
debugger;
page('/', showCatalog);
page('/create', showCreate);
page('/login', showLogin);
page('/register', showRegister);


page.start();


function decorateContext(ctx, next) {
    ctx.render = function (content) {
        render(content,);
    };
    next();
}
