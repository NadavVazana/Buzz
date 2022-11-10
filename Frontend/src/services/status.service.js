import { httpService } from "./http.service"

export const statusService={
    query,
    addStatus,
    getMorePosts,
    removeStatus,
    editStatus
}
async function query(){
    sessionStorage.setItem('pageCount',1)
    return await httpService.get('status')
    
}

async function addStatus(status){
    return await httpService.post('status',status)
}

async function getMorePosts(){
    let pageCount = +sessionStorage.getItem('pageCount') + 5
    sessionStorage.setItem('pageCount', pageCount)
    return await httpService.get('status/posts',{pageCount})
}

async function removeStatus(statusId){
return await httpService.delete('status',{statusId})
}

async function editStatus(status){
    return httpService.put('status',status)
}

