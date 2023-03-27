// components/hot-song-menu/hot-song-menu.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        itemData:{
            type:Object,
            value:{}
        },
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
        itemTap() {
            wx.navigateTo({
              url: `/pages/detail-song/detail-song?type=menu&id=${this.properties.itemData.id}`,
            })
        }
    }
})
