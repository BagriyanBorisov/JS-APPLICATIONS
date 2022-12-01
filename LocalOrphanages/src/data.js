import * as api from './api.js';

export async function getAll(){
    return await api.get('data/posts?sortBy=_createdOn%20desc');
}

export async function getMyAll(userId){
    return await api.get(`data/posts?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
}

export async function getTotalDonations(postId){
    return await api.get(`data/donations?where=postId%3D%22${postId}%22&distinct=_ownerId&count`);
}

export async function checkUserDonated(postId, userId){
    return await api.get(`data/donations?where=postId%3D%22${postId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
}
export async function sendDonation(data){
    return await api.post('data/donations' ,data);
}

export async function getById(id){
    return await api.get('data/posts/' + id);
}

export async function deleteById(id){
    return await api.del('data/posts/' + id);
}

export async function createItem(data){
    return await api.post('data/posts' ,data);
}


export async function updateItem(id,data){
    return await api.put('data/posts/' + id ,data);
}