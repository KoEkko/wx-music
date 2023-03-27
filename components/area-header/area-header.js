// components/area-header/area-header.js
Component({
  properties:{
      title: {
          type:String,
          value:""
      },
      hasMore: {
          type:Boolean,
          value: true
      }
  },
  methods: {
    onMoreTap() {
        this.triggerEvent("MoreClick")
    }
  }
})
