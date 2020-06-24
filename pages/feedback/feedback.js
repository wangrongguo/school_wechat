// pages/feedback/feedback.js
const app = getApp()
const na_backcolor = app.data.na_backcolor; //颜色
const servers_url = app.data.servers_url; //地址
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500,
    currentTab: 0,
    na_tabbar: {
      na_loading: false,
      na_show: true,
      na_animated: true,
      na_back: true,
      na_backcolor: na_backcolor,
      na_text: '意见反馈'
    }
  },

  bindFormSubmit: function(e) {
    // console.log(e.detail.value.textarea)

    var textStr = e.detail.value.textarea;
    if (textStr.length < 5) {
      wx.showToast({
        title: '问题描述文字太少啦！',
        icon: 'none'
      })
      return;
    }
    wx.showLoading({
      title: '提交中',
    });

    wx.request({

      url: servers_url + 'open/feed_back/',
      method: 'post',
      data: {
        content: e.detail.value.textarea,
        user: wx.getStorageSync("userInfo").id
      },
      header: {
        'cookie': wx.getStorageSync("sessionid") //读取cookie
      },
      success(res) {
        // console.log(res),
        wx.hideLoading();
        wx.showToast({
          title: '提交成功',
          duration: 2000,
          mask: true,
          success: function() {
            setTimeout(function() {
              //要延时执行的代码
              wx.navigateBack({

              })
            }, 1000) //延迟时间
          }
        });

      },
      fail(res) {

        wx.hideLoading()
        wx.showToast({
          title: '提交失败',
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})