import * as api from './api.js';

export async function getAll(){
    let response = await api.get('data/pets?sortBy=_createdOn%20desc&distinct=name');

    return response;
}

export async function createPet(data){
    let response = await api.post('data/pets',data);

    return response;
}

export async function getById(id){
    let response = await api.get('data/pets/' + id);

    return response;
}

export async function deleteById(id){
    let response = await api.del('data/pets/' + id);
    return response;
}

export async function updateById(id, data){
    let response = await api.put('data/pets/' + id, data);
    return response;
}

export async function sendDonation(id){
    let response = await api.post(`data/donation` ,{id});
    return response;
}

export async function getDonations(petId){
    let response = await api.get(`data/donation?where=petId%3D%22${petId}%22&distinct=_ownerId&count`)
    return response;
}