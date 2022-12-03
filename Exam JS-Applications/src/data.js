import * as api from './api.js'

export async function getAll(){
    return await api.get('data/albums?sortBy=_createdOn%20desc');
}

export async function createAlbum(data){
    return await api.post('data/albums', data);
}

export async function getById(id){
    return await api.get('data/albums/' + id);
}

export async function updateAlbum(id, data){
    return await api.put('data/albums/' + id, data);
}

export async function deleteAlbum(id){
    return await api.del('data/albums/' + id);
}

export async function sendLike(data){
    return await api.post('data/likes', data);
}

export async function getLikesCount(albumId){
    return await api.get(`data/likes?where=albumId%3D%22${albumId}%22&distinct=_ownerId&count`);
}

export async function isLiked(albumId, userId){
    return await api.get(`data/likes?where=albumId%3D%22${albumId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
}