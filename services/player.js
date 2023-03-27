import { HYRequest } from './index'

export function getSongDetail(ids) {
    return HYRequest.get({
        url:"/song/detail",
        data:{
            ids
        }
    })
}

export function getSongLyric(id) {
    return HYRequest.get({
        url:"/lyric",
        data:{
            id
        }
    })
}