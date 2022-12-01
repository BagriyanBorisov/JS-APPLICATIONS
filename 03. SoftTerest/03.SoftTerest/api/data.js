import * as api from './api.js';

const endpoints={
    "allIdea": "data/ideas?select=_id%2Ctitle%2Cimg&sortBy=_createdOn%20desc",
    "createIdea": "data/ideas",
    "detailsIdea": "data/ideas/"
}

export async function getAllIdea(){
    return api.get(endpoints.allIdea);
}

export async function createIdea(data){
    return api.post(endpoints.createIdea, data)
}

export async function detailsIdea(id){
    return api.get(endpoints.detailsIdea + id);
}