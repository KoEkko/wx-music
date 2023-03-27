import {HYEventStore} from 'hy-event-store'
import { getPlayListDetail } from '../services/video'
export const recommendSongsState = new HYEventStore({
    state:{
        recommendInfo:{}
    },
    actions:{
        getRecommendSongs(ctx) {
            getPlayListDetail(3778678).then(res => {
                ctx.recommendInfo = res.playlist
            })

        }
    }
})