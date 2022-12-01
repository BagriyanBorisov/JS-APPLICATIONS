import {render,html,nothing} from './src/lib.js';
import {page} from './src/lib.js';
import {logout} from "./src/user.js";
import {showLogin} from "./src/views/loginView.js";
import {showRegister} from "./src/views/registerView.js";
import {showCatalog} from "./src/views/catalogView.js";
import {showCreate} from "./src/views/createView.js";
import {showDetails} from "./src/views/detailsView.js";
import {showEdit} from "./src/views/editView.js";
import {showMyCatalog} from "./src/views/myCatalogView.js";




const root = document.getElementById('main-content');

page(middleWare);
page('/index.html',()=> '/');
page('/',showCatalog);
page('/catalog',showCatalog);
page('/myCatalog',showMyCatalog);
page('/catalog/:id', showDetails);
page('/create', showCreate);
page('/edit/:id',showEdit);
page('/login', showLogin);
page('/register',showRegister);
page('/logout', async ()=>{
    await logout();
    modulateView();
    page.redirect('/catalog');
});


page.start();
modulateView();
function middleWare(ctx, next) {
    ctx.render = function (content) {
        render(content, root);
    }
    let user = JSON.parse(sessionStorage.getItem("userData"));

    if(user){
        ctx.user = user;
    }

    ctx.modulateView = modulateView;
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