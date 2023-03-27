// components/menu-area/menu-area.js
const app = getApp()
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        title: {
            type:String,
            value:""
        },
        menuLists: {
            type:Array,
            value:[]
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        screenWidth:375
    },

    lifetimes: {
        attached() {
            this.setData({ screenWidth: app.globalData.screenWidth })
        }
    },
    methods:{
        onMoreTap() {
           wx.navigateTo({
             url: '/pages/detai-menu/detail-menu',
           })
        }
    }
})
