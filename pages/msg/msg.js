//获取应用实例
const app = getApp()
const na_backcolor = app.data.na_backcolor;//颜色
const servers_url = app.data.servers_url;//地址
Page({
  data: {
    na_tabbar: {
      na_loading: false,
      na_show: true,
      na_animated: true,
      na_back: false,
      na_backcolor: na_backcolor,
      na_text: "支付结果"
    }
  },
  onLoad: function(n) {},
  onReady: function() {},
  onShow: function() {},
  onHide: function() {},
  onUnload: function() {},
  onPullDownRefresh: function() {},
  onReachBottom: function() {},
  onShareAppMessage: function() {},
  index: function() {
    wx.switchTab({
      url: "../index/index"
    })
  }
});