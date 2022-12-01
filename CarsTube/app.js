import {render,html,nothing} from './src/lib.js';
import {page} from './src/lib.js';
import {logout} from "./src/user.js";
import {showLogin} from "./src/views/loginView.js";
import {showRegister} from "./src/views/registerView.js";
import {showHome} from "./src/views/homeView.js";
import {showCatalog} from "./src/views/catalogView.js";
import {showCreate} from "./src/views/createView.js";
import {showDetails} from "./src/views/detailsView.js";
import {showEdit} from "./src/views/editView.js";
import {showMyCatalog} from "./src/views/myCatalogView.js";
import {showSearch} from "./src/views/searchView.js";




const root = document.getElementById('site-content');

page(middleWare);
page('/index.html',()=> '/');
page('/',showHome);
page('/catalog',showCatalog);
page('/search', showSearch)
page('/myCatalog', showMyCatalog)
page('/catalog/:id', showDetails);
page('/create', showCreate);
page('/edit/:id',showEdit);
page('/login', showLogin);
page('/register',showRegister);
page('/logout', async ()=>{
    await logout();
    modulateView();
    page.redirect('/');
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
        document.querySelectorAll("#profile").forEach(e => e.style.display = "inline-block");
        document.querySelectorAll("#guest").forEach(e => e.style.display = "none");
        document.querySelector('.welcomeA').textContent = `Welcome ${userData.username}`

    }
    else {
        document.querySelectorAll("#profile").forEach(e => e.style.display = "none");
        document.querySelectorAll("#guest").forEach(e => e.style.display = "inline-block");

    }
}