import axios from 'axios';

const API_HOST = 'http://sarkazyaka/';

const request = (config) => (
    new Promise ((resolve, reject) => {
        axios.request({ 
            ...config, 
            url: API_HOST
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

export const getAllSubjects = () => (
    request({
        method: 'GET',
        params: {
            request: 'getAllTags'
        }
    })
);

export const createSubject = (subject) => (
    request({
        method: 'POST',
        data: {
            request: 'createTag', 
            payload: subject
        }
    })
);

export const updateSubject = (subject) => (
    request({
        method: 'POST',
        data: {
            request: 'updateTag', 
            payload: subject
        }
    })
);