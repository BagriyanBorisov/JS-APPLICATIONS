import * as api from './api.js';

export async function getAll(){
    return await api.get('data/shoes?sortBy=_createdOn%20desc');
}

export async function getById(id){
    return await api.get('data/shoes/' + id);
}

export async function deleteById(id){
    return await api.del('data/shoes/' + id);
}

export async function addItem(data){
    return await api.post('data/shoes', data);
}

export async function updateItem(id,data){
    return await api.put('data/shoes/' + id, data);
}

export async function searchItems(query){
    return await api.get(`data/shoes?where=brand%20LIKE%20%22${query}%22`);
}