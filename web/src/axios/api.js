import { fetch } from "./fetch";

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

export function getHistory() {
    return fetch({
        url: '/history',
        method: 'get'
    })
}

export function addComment(data) {
    return fetch({
        url: '/history/comment',
        method: 'post',
        data: data
    })
}

export function editComment(id, data) {
    return fetch({
        url: '/history/comment/' + id,
        method: 'put',
        data: data
    })
}



