import { request } from 'graphql-request'

export function fetchData(query) {
    return request('https://graphql-pokemon.now.sh', query)     
}


