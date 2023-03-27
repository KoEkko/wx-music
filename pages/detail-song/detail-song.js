// pages/detail-song/detail-song.js
import {recommendSongsState} from '../../store/recommendSongs'
import rankingStore from '../../store/rankingStore'
import playerStore from '../../store/playerStore'
import { getPlayListDetail } from '../../services/video'
import menuStore from '../../store/menuStore'
const db = wx.cloud.database()

Page({
    data:{
        type:"ranking",
        key:"newRanking",
        id:"",
        songInfo:{},
        menuList:[]
    },
    // 1.确定是什么类型
    //    type --> ranking
    //    key  --> newRanking
    // 获取数据
    onLoad(options) {
        // 歌单数据
        menuStore.onState("menuList", this.getMenuList)
        const type = options.type
        this.setData({ type })
        if (type === "ranking") {
            const key = options.key
            this.data.key = key
            rankingStore.onState(key, this.handleRanking)
        } else if (type === "recommend") {
            this.data.key = "recommendInfo"
            recommendSongsState.onState(this.data.key, this.handleRanking)
        } else if (type === "menu") {
            const id = options.id
            this.data.id = id
            this.fetchMenuSongInfo()
        } else if (type === 'profile') {
            const type = options.typename
            const title = options.title
            this.handleProfileTabInfo(type,title)
        } else if ( type === 'songlist') {
            const typeindex = options.typeindex
            this.handleSongList(typeindex)
        }

    },
    async fetchMenuSongInfo() {
        const res = await getPlayListDetail(this.data.id)
        this.setData({ songInfo: res.playlist })
    },
    handleRanking(value) {
        this.setData({ songInfo: value})
        wx.setNavigationBarTitle({
          title: value.name,
        })
    },
    async handleProfileTabInfo(type, title) {
        // 动态获取集合
        const collection = db.collection(`c_${type}`)
        // 从集合中获取数据
        const res = await collection.get()
        this.setData({
            songInfo:{
                name:title,
                tracks:res.data
            }
        })
    },
    handleSongList(typeindex) {
        const menu = this.data.menuList[typeindex]
        this.setData({ songInfo: {
            name:menu.name,
            tracks:menu.songList
        }})
    },
    onunload() {
        if (this.data.type === "ranking") {
            rankingStore.offState(this.data.key, this.handleRanking)
        } else if(this.data.type === "recommend") {
            recommendSongsState.offState(this.data.key, this.handleRanking)
        }
        menuStore.offState("menuList",this.getMenuList)
    },
    onItemTap(e) {
        const id = e.currentTarget.dataset.id 
        playerStore.setState("playSongList", this.data.songInfo.tracks )
        wx.navigateTo({
          url: `/packagePlayer/pages/music-player/music-player?id=${id}`,
        })
    },
    getMenuList(value) {
        this.setData({ menuList: value.data})
    }
})