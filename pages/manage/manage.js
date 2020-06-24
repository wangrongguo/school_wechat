// pages/manage/manage.js
//获取应用实例
const app = getApp()
const na_backcolor = app.data.na_backcolor; //颜色
const servers_url = app.data.servers_url;//地址
Page({

  /**
   * 页面的初始数据
   * 教务管理
   * rongo
   * 2020-03-09
   */
  data: {
    grids: [{
      name: '打卡',
      icon:'../../images/location.png',
      url:'../course_list/course_list?type=3'
    }, {
        name: '通知',
        icon: '../../images/tongzhi.png',
        url: '../message/message'
    }, {
        name: '评价',
        icon: '../../images/pingjia.png',
        url: '../course_list/course_list?type=1'
      }, {
        name: '我的课程',
        icon: '../../images/course_select.png',
        url: '../course_my/course_my?type=2'
      }, {
        name: '电子学生证',
        icon: '../../images/id_card.png',
        url: '../student_card/student_card'
      }],
    na_tabbar: {
      na_loading: false,
      na_show: true,
      na_animated: true,
      na_back: false,
      na_backcolor: na_backcolor,
      na_text: '教务'
    },
    topImg:'../../images/banner.jpg'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    wx.showLoading({
      title: '加载中...',
    });
    wx.hideLoading();
    return false;
    //请求列表数据
    wx.request({
      url: servers_url + 'api/banner/?page=1&page_size=20&position_type=bottom', // 仅为示例，并非真实的接口地址
      data: {
        position_type: 'bottom',
        page: 1,
        page_size: 20
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值application/json
        'cookie': wx.getStorageSync("sessionid")//读取cookie
      },
      success(res) {
        console.log(res.data.results)
        if (res.data.results && res.data.results.length > 0) {
          that.setData({
            topImg: res.data.results[0].cover.full_url
          });
        }

      },
      fail(res) {
        // console.log("fail-->"+res);
      },
      complete(res) {
        // console.log(res);
        wx.hideLoading();
      }
    });
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