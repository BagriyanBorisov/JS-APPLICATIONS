import * as api from './api.js';

export async function getAll(){
    return await api.get('data/cars?sortBy=_createdOn%20desc')
}