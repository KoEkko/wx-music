import { get } from "underscore"

const app = getApp()
Component({
    data:{
        statusBarHeight:0
    },
    options:{
        multipleSlots:true
    },
    properties:{
        title:{
            type:String,
            value:""
        }
    },
    lifetimes:{
        attached() {
            this.setData({ statusBarHeight: app.globalData.statusBarHeight })
        }
    },
    methods:{
        onLeftTap() {
            wx.navigateBack()
        }
    }
})