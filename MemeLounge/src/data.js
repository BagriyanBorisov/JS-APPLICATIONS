import * as api from './api.js'

export async function getAll(){
    return await api.get('data/memes?sortBy=_createdOn%20desc')
}

export async function getById(id){
    return await api.get('data/memes/' + id)
}

export async function deleteById(id){
    return await api.del('data/memes/' + id)
}

export async function createItem(data){
    return await api.post('data/memes', data)
}

export async function updateItem(id,data){
    return await api.put('data/memes/' + id, data)
}

export async function getMyAll(userId){
    return await api.get(`data/memes?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`)
}