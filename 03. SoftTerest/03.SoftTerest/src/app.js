import {initialize} from "./router.js";
import { showDashboard } from "./views/catalog.js";
import { showCreate } from "./views/create.js";
import { showDescription } from "./views/description.js";
import { showHome } from "./views/home.js";
import { showLogin } from "./views/login.js";
import { showRegister } from "./views/register.js";
import { onLogout } from "./views/logout.js";




const wholeSection = document.getElementById('whole-section');
wholeSection.remove();



const links ={
    "/": showHome,
    "/catalog": showDashboard,
    "/login" : showLogin,
    "/register": showRegister,
    "/details/": showDescription,
    "/create": showCreate,
    "/logout": onLogout
}

const router = initialize(links);
router.updateNavigate();
router.goTo("/")







