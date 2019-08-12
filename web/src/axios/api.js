import {fetch} from "./fetch";

export function getJobs() {
    return fetch({
        url: '/jobs',
        method: 'get'
    })
}
