import * as api from './api.js';

export async function createBook(data){
    return await api.post('data/books', data)
}

export async function sendLike(data){
    return await api.post('data/likes', data)
}

export async function getLikesCount(bookId){
    return await api.get(`data/likes?where=bookId%3D%22${bookId}%22&distinct=_ownerId&count`)
}

export async function checkLiked(bookId,userId){
    return await api.get(`data/likes?where=bookId%3D%22${bookId}%22%20and%20_ownerId%3D%22${userId}%22&count`)
}

export async function updateBook(id,data){
    return await api.put('data/books/' + id, data)
}

export async function getAll(){
    return await api.get('data/books?sortBy=_createdOn%20desc')
}

export async function getMyAll(userId){
    return await api.get(`data/books?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`)
}

export async function getById(id){
    return await api.get('data/books/' + id)
}

export async function deleteById(id){
    return await api.del('data/books/' + id)
}