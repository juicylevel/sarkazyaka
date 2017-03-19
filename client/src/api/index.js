import axios from 'axios';

const API_HOST = 'http://sarkazyaka/';
const DATA_FIELDS = { GET: 'params', POST: 'data' };

export const getAllTags = () => (
    request('GET', { request: 'getAllTags', limit: 10, offset: 0 })
);

export const createTag = (tag) => (
    request('POST', { request: 'createTag', ...tag })
);

export const updateTag = (tag) => (
    request('POST', { request: 'updateTag', ...tag })
);

const request = (method, params = {}) => (
    new Promise ((resolve, reject) => {
        axios.request({ 
            method: method, 
            url: API_HOST,
            [DATA_FIELDS[method]]: params 
        }).then(response => {
            const resp = response.data;
            if (resp.error) {
                reject(resp.error);
            } else if (resp.result) {
                resolve(resp.result)
            } else {
                reject('Error: empty response');
            }
        }, reject);
    })
);