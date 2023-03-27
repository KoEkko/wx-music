import {HYRequest} from './index'
export function getTopMv(offset = 0 , limit = 20) {
    return HYRequest.get({
        url:'/top/mv',
        data:{
            limit,
            offset
        }
    })
}

export function getMvUrl(id) {
    return HYRequest.get({
        url:'/mv/url',
        data:{
            id
        }
    })
}

export function getDetail(mvid) {
    return HYRequest.get({
        url:"/mv/detail",
        data:{
            mvid
        }
    })
}

export function getMoreVideo(id) {
    return HYRequest.get({
        url:"/related/allvideo",
        data:{
            id
        }
    })
}

export function getPlayListDetail(id) {
    return HYRequest.get({
        url:"/playlist/detail",
        data:{
            id
        }
    })
}

export function getHotMenuSongs(cat = "全部", limit = 6 , offset = 0) {
    return HYRequest.get({
        url:"/top/playlist",
        data:{
            cat,
            limit,
            offset
        }
    })
}

export function getAllMenuSongs() {
    return HYRequest.get({
        url:"/playlist/hot"
    })
}