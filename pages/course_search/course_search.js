// pages/course_search/course_search.js
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
      na_text: '搜索'
    },
    course_items: [],
    search_value:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
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
  bindinput: function (value) {
    console.log(value.detail.value)
    this.setData({
      search_value: value.detail.value
    });
    this.getData(this);
  },
  selectResult: function (e) {
    console.log('select result', e.detail)

  },
  getData: function (that){
    console.log(that.data.search_value)
    if (that.data.search_value == ''){
      that.setData({
        course_items: []
      });
      return false;
    }
    //初始化课程
    //请求列表数据
    wx.request({
      url: servers_url + 'api/course/', // 仅为示例，并非真实的接口地址
      data: {
        name: '',
        classify__id: '',
        is_online: 1,
        teacher__id: '',
        search: that.data.search_value
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值application/json
        'cookie': wx.getStorageSync("sessionid")//读取cookie
      },
      success(res) {
        console.log(res.data.results)
        if (res.data.results) {
          that.setData({
            course_items: res.data.results
          });
        }

      },
      fail(res) {
        // console.log("fail-->"+res);
        that.setData({
          course_items: []
        });
      },
      complete(res) {
        // console.log(res);
        wx.hideLoading();

      }
    });
  }
  
})