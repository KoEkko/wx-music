// components/video-item.js
Component({
    properties: {
        itemData:{
            type:Object,
            value:{}
        }
    },
    data: {
        
    },
    methods: {
        onItemTap() {
            const item = this.properties.itemData
            wx.navigateTo({
              url: `/pages/detail-video/detail-video?id=${item.id}`,
            })
        }
    }
})
