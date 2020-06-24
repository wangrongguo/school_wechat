// pages/news_list/news_list.js
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
    news_items: [],
    category: 1,
    page: 1,
    isOnReachBottom: true,//是否上拉加载
    na_tabbar: {
      na_loading: false,
      na_show: true,
      na_animated: true,
      na_back: true,
      na_backcolor: na_backcolor,
      na_text: '新闻'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("type=" + options.type)

    var that = this;
    //初始化数据新闻
    //请求列表数据
    var a = 'na_tabbar.na_text';
    if (options.type == 1) {
      that.setData({
        [a]: '教学成果',
        category: 2,
        page: 1,
        isOnReachBottom: true
      });
    } else {
      that.setData({
        [a]: '新闻快讯',
        category: 1,
        isOnReachBottom: true,
        page: 1
      });
    }
    //初始化数据
    that.getDataInit(that);
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
    that.getDataInit(that);
    wx.stopPullDownRefresh(); //停止下拉刷新
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    if (that.data.isOnReachBottom) {
      that.getDataInit(that);
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //初始化数据
  getDataInit: function (that) {
    wx.showLoading({
      title: '加载中...',
    });
    wx.request({
      url: servers_url + 'api/news/', // 仅为示例，并非真实的接口地址
      data: {
        category: that.data.category,
        page_size: page_size,
        page: that.data.page,
        is_online:1//已上线
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值application/json
        'cookie': wx.getStorageSync("sessionid")//读取cookie
      },
      success(res) {
        console.log(res.data.results)
        if (res.data.results) {
          if (that.data.page == 1) {
            that.setData({
              news_items: res.data.results,
              page: that.data.page + 1,
              isOnReachBottom: true
            });
          } else {
            that.setData({
              news_items: that.data.news_items.concat(res.data.results),
              page: that.data.page + 1
            });
          if (res.data.results.length < page_size){
            that.setData({
              isOnReachBottom: false
            });
          }
          }

        } else {
          if (that.data.page == 1) {

          that.setData({
            isOnReachBottom: false
          });
          }else{
            that.setData({
              isOnReachBottom: true
            });
          }
        }
        wx.hideLoading();
      },
      fail(res) {
        // console.log("fail-->"+res);
        that.setData({
          news_items: []
        });
        wx.hideLoading();
      },
      complete(res) {
        // console.log(res);
        
      }
    });
  }
})