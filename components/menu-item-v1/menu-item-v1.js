import { c_menu } from '../../database/index'
import menuStore from '../../store/menuStore'
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        itemData:{
            type:Object,
            value:{}
        },
        index:{
            type:Number,
            value:0
        }
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        async onDelteTap(e) {
            const _id = e.currentTarget.dataset.item
            const res = await c_menu.remove(_id)
            if (res) {
                wx.showToast({
                  title: '歌单删除成功~',
                })
                menuStore.dispatch("fetchMenuList")
            }
        },
        onItemTap() {
            const index = this.properties.index
            wx.navigateTo({
              url: `/pages/detail-song/detail-song?type=songlist&typeindex=${index}`,
            })
        }
    }
})
