import * as api from './api.js';

export async function getAll(){
    return await api.get('data/albums?sortBy=_createdOn%20desc&distinct=name');
}

export async function sendItem(data){
    let response = await api.post('data/albums', data)
    return response;
}

export async function getById(id){
    return await api.get('data/albums/' + id)
}

export async function delById(id){
    return await api.del('data/albums/' + id)
}

export async function updateById(id,data){
    return await api.put('data/albums/' + id,data)
}

export async function getBySearch(data){
    return await api.get(`data/albums?where=name%20LIKE%20%22${data}%22`)
}