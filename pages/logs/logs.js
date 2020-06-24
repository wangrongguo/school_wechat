//logs.js
const util = require('../../utils/util.js')
//获取应用实例
const app = getApp()
const na_backcolor = app.data.na_backcolor;//颜色
const servers_url = app.data.servers_url;//地址
Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    na_tabbar: {
      na_loading: false,
      na_show: true,
      na_animated: true,
      na_back: false,
      na_backcolor: na_backcolor,
      na_text: '授权登录'
    }
  },
  onLoad: function () {
    
  },
  bindGetUserInfo(e) {
    console.log(e)
    var that = this;
    wx.showLoading({
      title: '加载中...',
    });
    var code = wx.getStorageSync('code');
    //初始化登录
    //请求列表数据
    wx.request({
      url: servers_url + 'open/wechat/login/', // 仅为示例，并非真实的接口地址
      data: {
        code: code,
        nickname: e.detail.userInfo.nickName,
        headimgurl: e.detail.userInfo.avatarUrl
      },
      method:'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值application/json
      },
      success(res) {
        console.log(res)
        console.log(res.header["Set-Cookie"])
       wx.setStorageSync("sessionid", res.header["Set-Cookie"]);//凭证
        if (res.data) {
          wx.setStorageSync('userInfo', res.data.user);
          wx.switchTab({
            url: '../index/index'
          })
        }

      },
      fail(res) {
        // console.log("fail-->"+res);
        
      },
      complete(res) {
        console.log(res);
        wx.hideLoading();

      }
    });


  }
})