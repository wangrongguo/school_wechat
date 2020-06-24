// pages/course_list/course_list.js课程单列表
const app = getApp()
const na_backcolor = app.data.na_backcolor; //颜色
const servers_url = app.data.servers_url;//地址
Page({

  /**
   * 页面的初始数据
   */
  data: {
    is_show: 0,
    na_tabbar: {
      na_loading: false,
      na_show: true,
      na_animated: true,
      na_back: true,
      na_backcolor: na_backcolor,
      na_text: '我的课程'
    },
    course_items: [],
    navigator_url: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that = this;
    var a = 'na_tabbar.na_text';
    if (options.type == '1') {
      //评价
      that.setData({
        [a]: '评价列表',
        is_show: 1,
        navigator_url: '../course_comment/course_comment?course_id='
      });
    } else if (options.type == '2') {
      //我的课程
      that.setData({
        [a]: '我的课程',
        is_show: 2,
        navigator_url: '../course_detail/course_detail?course_id='
      });
    } else if (options.type == '3') {
      //打卡
      that.setData({
        [a]: '打卡',
        is_show: 3,
        navigator_url: '../punsh_in/punsh_in?course_id='
      });
    }

    that.getDataInit(that)
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
  getDataInit: function (that) {
    wx.showLoading({
      title: '加载中...',
    });
    //初始化列表
    //请求列表数据
    wx.request({
      url: servers_url + 'api/order/', // 仅为示例，并非真实的接口地址
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