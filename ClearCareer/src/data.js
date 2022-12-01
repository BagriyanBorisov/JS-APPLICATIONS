import * as api from './api.js'

export async function getAll(){
    return await api.get('data/offers?sortBy=_createdOn%20desc');
}

export async function getById(id){
    return await api.get('data/offers/' + id);
}

export async function getAppliesCount(id){
    return await api.get(`data/applications?where=offerId%3D%22${id}%22&distinct=_ownerId&count`);
}

export async function getAppliesUser(offerId,userId){
    return await api.get(`data/applications?where=offerId%3D%22${offerId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
}
export async function sendApply(data){
    return await api.post('data/applications',data);
}

export async function deleteById(id){
    return await api.del('data/offers/' + id);
}

export async function createItem(data){
    return await api.post('data/offers',data);
}


export async function updateItem(id,data){
    return await api.put('data/offers/' + id, data);
}