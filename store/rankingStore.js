import {HYEventStore} from 'hy-event-store'
import { getPlayListDetail } from '../services/video'

// 如何让 请求到的数据 和 store中state 的数据 一一对应呢
// 我们可以用 一个对象 来映射 每个数据 特有的属性
export const rankingsMap = {
    newRanking:3779629,
    originRanking:2884035,
    upRanking:19723756
}
const rankingStore = new HYEventStore({
    state:{
        newRanking:{},
        originRanking:{},
        upRanking:{}
    },
    actions:{
        fetchRankingSongs(ctx) {
            for (const key in rankingsMap) {
                const id = rankingsMap[key]
                getPlayListDetail(id).then(res => {
                    ctx[key] = res.playlist
                })
            }
        }
    }
})

export default rankingStore