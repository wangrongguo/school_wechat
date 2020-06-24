// pages/punsh_in/punsh_in.js打卡
//获取应用实例
const app = getApp()
const na_backcolor = app.data.na_backcolor; //颜色
const servers_url = app.data.servers_url;//地址
Page({

  /**
   * 页面的初始数据
   */
  data: {
    locationData:{},
    lo:{},
    na_tabbar: {
      na_loading: false,
      na_show: true,
      na_animated: true,
      na_back: true,
      na_backcolor: na_backcolor,
      na_text: '打卡'
    },
    course_id:'',
    course_detail:{},
    btn_text:'打卡',
    btn_dis:false,
    msg:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      course_id: options.course_id
    });
    wx.showLoading({
      title: '加载中...',
    });
    //获取课程详情
    //初始化点击菜单加载相应数据
    //请求列表数据
    wx.request({
      url: servers_url + 'api/class_schedule/' + options.course_id + '/', // 仅为示例，并非真实的接口地址
      data: {},
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值application/json
        'cookie': wx.getStorageSync("sessionid")//读取cookie
      },
      success(res) {
        console.log(res.data)
        if (res.data) {
          that.setData({
            course_detail: res.data
          });
        }

      },
      fail(res) {
        // console.log("fail-->"+res);
        that.setData({
          course_detail: {}
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
  /**
   * 打卡
   */
  punshInLocation:function(){
    var that = this;
    wx.showLoading({
      title: '加载中...',
    });
    wx.getLocation({
      success: function(res) {
        console.log(res)
        var lo = res;
        //打卡
        //请求列表数据
        wx.request({
          url: servers_url + 'open/grade/' + that.data.course_detail.grade.id + "/sign/", // 仅为示例，并非真实的接口地址
          data: {
            lat: lo.latitude,
            lng: lo.longitude
          },
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded', // 默认值application/json
            'cookie': wx.getStorageSync("sessionid")//读取cookie
          },
          success(res) {
            console.log(res.statusCode == 400)
            console.log(res.data)
            if (res.statusCode == 200){
              //打卡成功
              that.setData({
                btn_text:'打卡成功',
                btn_dis:true,
                msg:''
              });
            }else{
              console.log("-----")
              //打卡失败
              that.setData({
                btn_text: '打卡失败，请重新打卡',
                btn_dis: false,
                msg:res.data
              });
            }

          },
          fail(res) {
            console.log("fail-->" + res);

          },
          complete(res) {
            // console.log(res);
            wx.hideLoading();

          }
        });
      },
    });
  }
})