import {fetch} from "./fetch";

export function getJobs() {
    return fetch({
        url: '/jobs',
        method: 'get'
    })
}

export function getJobTypes() {
    return fetch({
        url: '/jobTypes',
        method: 'get'
    })
}

