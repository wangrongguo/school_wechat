// pages/message/message.js通知
//获取应用实例
const app = getApp()
const na_backcolor = app.data.na_backcolor;//颜色
const servers_url = app.data.servers_url;//地址
const page_size = app.data.page_size;//一页显示数量
Page({

  /**
   * 页面的初始数据
   */
  data: {
    na_tabbar: {
      na_loading: false,
      na_show: true,
      na_animated: true,
      na_back: true,
      na_backcolor: na_backcolor,
      na_text: '通知'
    },
    page: 1,
    isOnReachBottom: true,//是否上拉加载
    massage_data:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      page: 1,
      isOnReachBottom: true
    });
    this.getData(this);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    var that = this;
    that.setData({
      page: 1,
      isOnReachBottom: true
    });
    that.getData(that);
    wx.stopPullDownRefresh(); //停止下拉刷新
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    if (that.data.isOnReachBottom) {
      that.getData(that);
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getData: function (that) {
    wx.showLoading({
      title: '加载中...',
    });

    //初始化课程
    //请求列表数据
    wx.request({
      url: servers_url + 'api/notification/', // 仅为示例，并非真实的接口地址
      data: {
        page_size: page_size,
        page: that.data.page,
        user__id: wx.getStorageSync("userInfo").id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值application/json
        'cookie': wx.getStorageSync("sessionid")//读取cookie
      },
      success(res) {
        console.log(res)
        if (res.statusCode == 200) {
          if (that.data.page == 1) {
            that.setData({
              massage_data: res.data.results,
              page: that.data.page + 1,
              isOnReachBottom: true
            });
          } else {
            that.setData({
              massage_data: that.data.massage_data.concat(res.data.results),
              page: that.data.page + 1
            });
            if (res.data.results.length < page_size) {
              that.setData({
                isOnReachBottom: false
              });

            }
          }
 
        } else {
          that.setData({
            isOnReachBottom: false
          });
        }

      },
      fail(res) {
        // console.log("fail-->"+res);
        that.setData({
          massage_data: []
        });
      },
      complete(res) {
        // console.log(res);
        wx.hideLoading();

      }
    });
  }
})