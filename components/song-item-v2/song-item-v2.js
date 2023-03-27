import { f_col, l_col, db, c_menu } from '../../database/index'
import menuStore from '../../store/menuStore'

Component({
    properties:{
        itemData:{
            type:Object,
            value:{}
        },
        index: {
            type:Number,
            value: -1
        },
        menuList:{
            type:Array,
            value:[]
        }
    },
    methods:{
        onMoreIconTap() {
            // 弹窗
            
            wx.showActionSheet({
              itemList: ["收藏","喜欢","添加到歌单"],
              success:(res) => {
                  const index = res.tapIndex
                  this.handleTapType(index)
              }
            })
        },

        async handleTapType(index) {
            let res = null
            switch(index) {
                case 0:
                    res = await f_col.add(this.properties.itemData)
                    break
                case 1:
                    res = await l_col.add(this.properties.itemData)
                    break
                case 2:
                    const menuNames = this.properties.menuList.map(item => item.name )
                    wx.showActionSheet({
                      itemList: menuNames,
                      success:(res) => {
                          const index = res.tapIndex
                          this.handleMenuIndex(index)
                      }
                    })
                    return
            }
            if (res) {
                const title = index === 0 ? '收藏' : '喜欢'
                wx.showToast({
                  title: `${title}成功~`,
                })
            }
        },
        async handleMenuIndex(index) {
            // 获取要添加的歌单
            const menuItem = this.properties.menuList[index]
            // 向menuItem歌单中songList添加一条歌曲
            const data = this.properties.itemData
            const cmd = db.command
            const res = await c_menu.updata(menuItem._id,{
                songList:cmd.push(data)
            })
            if(res) {
                wx.showToast({
                  title: '添加到歌单成功~',
                })
                menuStore.dispatch("fetchMenuList")
            }
        }
    },

})