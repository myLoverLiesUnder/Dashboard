import axios from 'axios'

const ajaxUrl = "http://localhost:3000";

export function fetch(options) {
    return new Promise((resolve, reject) => {
        const instance = axios.create({
            headers: {
                'Content-Type': 'application/json'
            },
            baseURL: ajaxUrl,
            timeout: 30 * 1000 // 30秒超时
        });
        instance(options)
            .then(response => {
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
    })
}
