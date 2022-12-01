import * as api from './api.js';

export async function getAll(){
    return await api.get('data/theaters?sortBy=_createdOn%20desc&distinct=title');
}

export async function getMyTheaters(userId){
    return await api.get(`data/theaters?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
}

export async function createTheater(data){
    return await api.post('data/theaters', data);
}

export async function updateTheater(id,data){
    return await api.put('data/theaters/' + id, data);
}

export async function getById(id){
    return await api.get('data/theaters/' +id);
}

export async function getLikeCount(theaterId){
    return await api.get(`data/likes?where=theaterId%3D%22${theaterId}%22&distinct=_ownerId&count`);
}

export async function deleteById(id){
    return await api.del('data/theaters/' +id);
}

export async function checkLike(theaterId, userId){
    return await api.get(`data/likes?where=theaterId%3D%22${theaterId}%22%20and%20_ownerId%3D%22${userId}%22&count`)
}

export async function sendLike(data){
    return await api.post('data/likes', data);
}
