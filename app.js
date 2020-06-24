//app.js
App({

  data:{
    na_backcolor: '#3CB371',
    servers_url:'https://admin-test.lexin.online/',
    page_size: 10
  },
  onLaunch: function () {

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.setStorageSync('code', res.code)
      }
    })
    // 查看是否授权
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          // wx.getUserInfo({
          //   success: function (res) {
          //     console.log(res.userInfo)
          //   }
          // })
        }else{
          // wx.navigateTo({
          //   url: '../logs/logs'
          // });
        }
      }
    })

  },
  globalData: {
    userInfo: null
  }
})