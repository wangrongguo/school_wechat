// pages/student_card/student_card.js
//获取应用实例
const app = getApp()
const na_backcolor = app.data.na_backcolor;//颜色
const servers_url = app.data.servers_url;//地址
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
      na_text: ''
    },
    course_items:[],
    user_info:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.getDataInit(that);
    that.setData({
      user_info: wx.getStorageSync("userInfo")
    })
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
    that.getDataInit(that);
    wx.stopPullDownRefresh(); //停止下拉刷新
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getDataInit: function (that){
    wx.showLoading({
      title: '加载中...',
    });
    //初始化列表
    //请求列表数据
    wx.request({
      url: servers_url + 'api/class_schedule/', // 仅为示例，并非真实的接口地址
      data: {
        user__id: wx.getStorageSync("userInfo").id,
        is_online: 1
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值application/json
        'cookie': wx.getStorageSync("sessionid")//读取cookie
      },
      success(res) {
        console.log(res.data)
        if (res.data) {
          that.setData({
            course_items: res.data.results
          });
        }
        wx.hideLoading();

      },
      fail(res) {
        // console.log("fail-->"+res);
        that.setData({
          course_items: []
        });
        wx.hideLoading();
      },
      complete(res) {
        // console.log(res);
      }
    });
  }
})