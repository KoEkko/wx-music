// pages/main-music/main-music.js
import { getBanner } from '../../services/banner'
import { getHotMenuSongs } from '../../services/video'
import { recommendSongsState } from '../../store/recommendSongs'
import rankingStore , {rankingsMap} from '../../store/rankingStore'
import querySelect from '../../utils/query-select'
import { throttle } from 'underscore'
import playerStore from '../../store/playerStore'

// 节流函数
const querySelectThrottle = throttle(querySelect, 100)
const app = getApp()
Page({
    data: {
        // 轮播图的数据
        banners:[],
        bannerHeight:130,
        
        // 屏幕的高度宽度
        screenHeight:0,
        screenWidth:0, 
        recommendSongs:[],
        // 热门歌单数据
        hotSongsMenu:[],
        //推荐歌单数据
        recSongsMenu:[],
        // 巅峰榜数据
        rankingInfos:{},
        isRankingHas:false,

        // 当前正在播放的歌曲
        currentSong:{},
        isPlaying: false
    },
    onLoad() {
        this.fetchBanners()
        // 发起action
        recommendSongsState.onState("recommendInfo",this.fetchRecommendSongs )
        for (const key in rankingsMap) {
            rankingStore.onState(key, this.getRankingHanlder(key))
        }
        // rankingStore.onState("newRanking", this.getRankingHanlder("newRanking"))
        // rankingStore.onState("originRanking", this.getRankingHanlder("originRanking"))
        // rankingStore.onState("upRanking", this.getRankingHanlder("upRanking"))

        recommendSongsState.dispatch("getRecommendSongs")
        rankingStore.dispatch("fetchRankingSongs")

        playerStore.onStates(["currentSong","isPlaying"], this.getPlayInfosHanlder)
        this.fetchHotMenuSongs()
        
        this.setData({ screenHeight: app.globalData.screenHeight})
        this.setData({ screenWidth: app.globalData.screenWidth})
    },

    // 方法 
    onSearchClick() {
        wx.navigateTo({
          url: '/pages/detail-search/detail-search',
        })
    },
    onRecommendMoreClick() {
        wx.navigateTo({
          url: '/pages/detail-song/detail-song?type=recommend',
        })
    },
    onSongDetailTap(event) {
        const id = event.currentTarget.dataset.id
        const index = event.currentTarget.dataset.index
        playerStore.setState("playSongList", this.data.recommendSongs)
        playerStore.setState("playSongIndex", index)
        wx.navigateTo({
          url: `/packagePlayer/pages/music-player/music-player?id=${id}`,
        })
    },

    onPlayorPausedTap() {
        playerStore.dispatch("changeMusicStatusAction")
    },
    onAlbumTap() {
        wx.navigateTo({
          url: '/packagePlayer/pages/music-player/music-player',
        })
    },
    // 获取image组件的高度
    onImageLoad() {
        querySelectThrottle(".banner-image").then(res => {
            this.setData({bannerHeight: res[0].height})
        })
    },
    // 网络请求
    async fetchBanners() {
        const res = await getBanner()
        this.setData({banners: res.banners})
    },

    async fetchHotMenuSongs() {
        getHotMenuSongs().then(res => {
            this.setData({hotSongsMenu: res.playlists})
        }),
        getHotMenuSongs("华语").then(res => {
            this.setData({ recSongsMenu: res.playlists})
        })
    },

    // =========================== 从store中获取数据  =========================== 
    fetchRecommendSongs(value) {
        if (!value.tracks) return
        this.setData({recommendSongs: value.tracks.slice(0,6)})
    },

    getRankingHanlder(ranking) {
        return value => {
            const newRankingInfos = { ...this.data.rankingInfos, [ranking]:value}
            this.setData({ rankingInfos: newRankingInfos, isRankingHas: true })
        }
    },
    getPlayInfosHanlder({ currentSong, isPlaying }) {
        if ( currentSong ) {
            this.setData({ currentSong })
        }
        if ( isPlaying !== undefined ) {
            this.setData({ isPlaying })
        }
    },
    onUnload() {
        for (const key in rankingsMap ) {
            rankingStore.offState(key, this.getRankingHanlder(key))
        }
        // rankingStore.offState("newRanking", this.getRankingHanlder("newRanking"))
        // rankingStore.offState("originRanking", this.getRankingHanlder("originRanking"))
        // rankingStore.offState("upRanking", this.getRankingHanlder("upRanking"))

        recommendSongsState.offState("recommendInfo", this.fetchRecommendSongs)
        playerStore.offStates(["currentSong" ,"isPlaying"] , this.getPlayInfosHanlder)
    }
})