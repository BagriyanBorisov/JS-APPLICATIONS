import * as api from './api.js';

const endpoints = {
    login: "users/login",
    register: "users/register",
    logout: "users/logout"
}

export async function login(email,password){
    const user = await api.post(endpoints.login, {email, password})
    sessionStorage.setItem("user", JSON.stringify(user))
}

export async function register(email,password){
    const user = await api.post(endpoints.register, {email, password})
    sessionStorage.setItem("user", JSON.stringify(user))
}

export async function logout(){
    const user = await api.get(endpoints.logout)
    sessionStorage.removeItem("user");
}