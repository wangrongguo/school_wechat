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
    na_tabbar: {
      na_loading: false,
      na_show: true,
      na_animated: true,
      na_back: true,
      na_backcolor: na_backcolor,
      na_text: '用户须知'
    },
    purchase_notes:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...',
    });
    var that = this;
    //初始化数据新闻
    //请求列表数据
    wx.request({
      url: servers_url + 'api/kv_config/purchase_notes/' , // 仅为示例，并非真实的接口地址
      data: {},
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值application/json
        'cookie': wx.getStorageSync("sessionid")//读取cookie
      },
      success(res) {
        console.log(res.data)
        if (res.statusCode == 200) {
          var purchase_notes = res.data.purchase_notes.replace(/<img/gi, '<img style="max-width:100%;height:auto;float:left;display:block;padding:5px 0px;" ').replace(/<section/g, '<div').replace(/\/section>/g, '\div>');
          that.setData({
            purchase_notes: purchase_notes
          });
        }

      },
      fail(res) {
        // console.log("fail-->"+res);
        that.setData({
          purchase_notes: ""
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

  },
  //支付
  payWechat: function(){
    var data = wx.getStorageSync('payData');
    wx.requestPayment({
      timeStamp: data.timeStamp,
      nonceStr: data.nonceStr,
      package: data.package,
      paySign: data.paySign,
      signType: data.signType,
      success(e) {
        wx.navigateTo({
          url: '../msg/msg'
        });
      },
      fail(e) {
        console.log(e)
      },
      complete(e) {
        console.log(e)
      }
    })
  }
})