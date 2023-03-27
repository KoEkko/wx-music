// pages/main-video/main-video.js
import {getTopMv} from '../../services/video'
Page({
    data:{
        videoLists:[],
        offset:0,
        hasMore: true
    },
    onLoad() {
        this.fetchTopMv()
    },
    async fetchTopMv() {
        // 获取新的数据
        const res = await getTopMv(this.data.offset)
        // 将新的数据整合到一起
        const newvideoLists = [...this.data.videoLists, ...res.data]
        this.setData({videoLists: newvideoLists})
        // 每次请求都会增加offset
        // 因为不需要对页面的数据进行重新渲染，所以不需要使用 setData
        this.data.offset = this.data.videoLists.length
        this.data.hasMore = res.hasMore
    },
    // 上拉加载更多
    onReachBottom() {
        if (!this.data.hasMore) return
        this.fetchTopMv()
    },
    // 下拉刷新
    async onPullDownRefresh() {
        // 清空数据
        this.setData({videoLists:[]})
        this.data.offset = 0
        this.data.hasMore = true
        
        // 重新请求数据
        await this.fetchTopMv()

        // 停止刷新
        wx.stopPullDownRefresh()

    }
})