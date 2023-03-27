Component({
    properties:{
        itemData:{
            type:Object,
            value:{}
        },
        key: {
            type: String,
            value: "newRanking"
        }
    },
    methods:{
        onRankingTap() {
            wx.navigateTo({
              url: `/pages/detail-song/detail-song?type=ranking&key=${this.properties.key}`,
            })
        }
    }
})