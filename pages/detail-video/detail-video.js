import {getMvUrl, getDetail, getMoreVideo} from '../../services/video'
Page({
    data:{
        id:0,
        MvUrl:"",
        MvDetails:{},
        MoreVideo:[]
    },
    onLoad(options) {
        // 获取id
        const id = options.id
        this.setData({id})
        // 获取url
        this.fetchMvUrl()
        // 获取详情
        this.fetchMvDetails()
        // 获取推荐视频
        this.fetchMoreVideo()
    },
    async fetchMvUrl() {
        const res = await getMvUrl(this.data.id)
        this.setData({MvUrl:res.data.url})
    },
    async fetchMvDetails() {
        const res = await getDetail(this.data.id)
        this.setData({MvDetails: res.data})
    },
    async fetchMoreVideo() {
        const res = await getMoreVideo(this.data.id)
        this.setData({MoreVideo:res.data})
    }
})