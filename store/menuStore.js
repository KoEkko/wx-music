import { HYEventStore } from 'hy-event-store'
import { c_menu } from '../database/index'
const menuStore = new HYEventStore({
    state:{
        menuList:[]
    },
    actions:{
        async fetchMenuList(ctx) {
            // 获取歌单数据
            const menuRes = await c_menu.query()
            ctx.menuList = menuRes
        }
    }
})
menuStore.dispatch("fetchMenuList")
export default menuStore