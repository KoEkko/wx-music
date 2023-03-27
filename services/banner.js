import {HYRequest} from './index'
export function getBanner(type = 0) {
    return HYRequest.get({
        url:"/banner",
        data:{
            type
        }
    })
}