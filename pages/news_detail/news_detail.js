// pages/news_detail/news_detail.js
//获取应用实例
const app = getApp()
const na_backcolor = app.data.na_backcolor;//颜色
const servers_url = app.data.servers_url;//地址
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content:"",
    title:"",
    category:"",
    created:"",
    is_online:"",
    na_tabbar: {
      na_loading: false,
      na_show: true,
      na_animated: true,
      na_back: true,
      na_backcolor: na_backcolor,
      na_text: '新闻详情'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...',
    });
    var that = this;
    var news_id = options.news_id;
    //初始化数据新闻
    //请求列表数据
    wx.request({
      url: servers_url + 'api/news/' + news_id, // 仅为示例，并非真实的接口地址
      data: {},
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值application/json
        'cookie': wx.getStorageSync("sessionid")//读取cookie
      },
      success(res) {
        console.log(res.data)
        if (res.data.content) {
          var article_content = res.data.content.replace(/<img/gi, '<img style="max-width:100%;height:auto;float:left;display:block;padding:5px 0px;" ').replace(/<section/g, '<div').replace(/\/section>/g, '\div>');
          that.setData({
            content: article_content,
            title: res.data.title,
            created: res.data.created,
            category: res.data.category,
            is_online: res.data.is_online
          });
        }

      },
      fail(res) {
        // console.log("fail-->"+res);
        that.setData({
          content: "",
          title: "",
          created: "",
          category: "",
          is_online:""
        });
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

  }
})