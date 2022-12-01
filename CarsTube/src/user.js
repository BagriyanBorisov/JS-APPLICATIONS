import * as api from './api.js';

const endpoints = {
    'login' : 'users/login',
    'register': 'users/register',
    'logout': 'users/logout',
}

export async function login(username, password){
    let user = await api.post(endpoints.login, {username, password});
    sessionStorage.setItem("userData", JSON.stringify(user));
}

export async function register(username, password){
    let user = await api.post(endpoints.register, {username, password});
    sessionStorage.setItem("userData", JSON.stringify(user));
}

export async function logout(){
    await api.get(endpoints.logout);
    sessionStorage.removeItem("userData");
}