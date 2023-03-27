// pages/detai-menu/detail-menu.js
import { getHotMenuSongs, getAllMenuSongs } from '../../services/video'
Page({
    data: {
        Songsmenu:[],

    },
    onLoad() {
        this.fetchAllMenuSongs()
    },
    async fetchAllMenuSongs() {
        // 获取所有的tag
        const tagRes = await getAllMenuSongs()
        const tags = tagRes.tags
        const Promises = []
        // 根据tag 去请求对应的数据
        for (const tag of tags ) {
            const name = tag.name
            const promise = getHotMenuSongs(name)
            Promises.push(promise)
        }
        // 将请求到的数据一次性setData 而不是在then方法里面重复调用
        Promise.all(Promises).then(res => {
            this.setData({ Songsmenu: res })
        })
    }
})