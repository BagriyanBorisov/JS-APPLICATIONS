import * as api from './api.js';

const endpoints = {
    'login' : 'users/login',
    'register': 'users/register',
    'logout': 'users/logout',
    'create': 'data/catalog',
    'details': 'data/catalog/'
}

export async function login(email, password){
    let user = await api.post(endpoints.login, {email, password});
    sessionStorage.setItem("userData", JSON.stringify(user));
}

export async function register(email, password){
    let user = await api.post(endpoints.register, {email, password});
    sessionStorage.setItem("userData", JSON.stringify(user));
}

export async function logOut(){
    await api.get(endpoints.logout);
    sessionStorage.removeItem("userData");
}

export async function createItem(make,model,year,description,price,img,material){
     await api.post(endpoints.create, {make,model,year,description,price,img,material});
}

export async function getItems(){
    let response = await api.get(endpoints.create);
    return await response;
}

export async function getItem(id){
    let response = await api.get(endpoints.details+id);
    return await response;
}

