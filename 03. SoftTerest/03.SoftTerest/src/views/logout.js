import { logout } from "../../api/user.js";

const section = document.getElementById('home-view');

export async function onLogout(context){
    await logout();
    context.updateNavigate();
    context.showSection(section);
}