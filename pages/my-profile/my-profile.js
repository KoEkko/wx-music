import { c_history, c_menu } from '../../database/index'
import  menuStore  from '../../store/menuStore'
Page({
    data:{
        userInfo:{},
        isLogin:false,
        tabTitles:[
            { name: '我的收藏', type: "favor" },
            { name: '我的喜欢', type: "like" },
            { name: '历史记录', type: "history"},
        ],
        isShowDialog: false,
        menuText:"",
        menuList:[]
    },
    onLoad() {
        const openid = wx.getStorageSync('openid')
        const userInfo = wx.getStorageSync('userInfo')
        this.setData({ isLogin: !!openid })
        if (this.data.isLogin) {
            this.setData({ userInfo })
        }
        // 共享歌单数据
        menuStore.onState("menuList", this.getMenuList )
    },
    //  事件监听
    async onLoginTap() {
        // 获取用户的头像和名字
        const profile = await wx.getUserProfile({
          desc: '获取您的信息',
        })
        // 获取用户的openid
        const loginRes = await wx.cloud.callFunction({
            name:"music-login"
        })
        const openid = loginRes.result.openid

        // 保存在本地
        wx.setStorageSync('openid', openid)
        wx.setStorageSync('userInfo', profile.userInfo)

        this.setData({ isLogin: true , userInfo: profile.userInfo})
    },
    onItemTap(e) {
        const item = e.currentTarget.dataset.item
        wx.navigateTo({
          url: `/pages/detail-song/detail-song?type=profile&typename=${item.type}&title=${item.name}`,
        })
    },
    onCreateMenuTap() {
        this.setData({ isShowDialog: true})
    },
    async onConfirmTap() {
        // 获取歌单名称
        const menuName = this.data.menuText

        // 模拟数据
        const menuRecord = {
            name:menuName,
            songList:[]
        }
        const menuRes = await c_menu.add(menuRecord)
        if (menuRes) {
            wx.showToast({
              title: '添加成功',
            })
            menuStore.dispatch("fetchMenuList")
            this.setData({ menuText:""})
        }
    },
    onInputTap() {},
    // ************************  数据 *************************
    getMenuList(value) {
        this.setData({ menuList: value.data })
    }
})