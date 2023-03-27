// app.js
App({
    globalData:{
        screenWidth:375,
        screenHeight:667,
        statusBarHeight:20,
        contentHeight:500
    },
    // 获取屏幕
    onLaunch() {
        wx.getSystemInfo({
            success:(res) => {
                this.globalData.screenHeight = res.screenHeight
                this.globalData.screenWidth = res.screenWidth,
                this.globalData.statusBarHeight = res.statusBarHeight,
                this.globalData.contentHeight = res.screenHeight - res.statusBarHeight - 44
            }
        })
        // 初始化云环境
        wx.cloud.init({
            env:"cloud1-7gsgh7cee098e88a"
        })
    },


})
