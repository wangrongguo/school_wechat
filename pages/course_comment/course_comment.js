// pages/course_comment/course_comment.js
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
      na_text: '课程评价'
    },
    course_id:'',
    msg:'',
    num: 4,//后端给的分数,显示相应的星星
    one_2: 0,
    two_2: 5
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      course_id: options.course_id,
      one_1: this.data.num,
      two_1: 5 - this.data.num
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
   * 提交评价
   */
  bindCourseComment: function(e){
    console.log(e);
    var that = this;  
    if (that.data.one_2 == 0){
      wx.showToast({
        title: '请选择评分',
        icon: 'none'
      })
      return;
    }
    wx.showLoading({
      title: '加载中...',
    });
    //初始化首页
    //请求列表数据
    wx.request({
      url: servers_url + 'open/course_comment/', // 仅为示例，并非真实的接口地址
      data: {
        score: that.data.one_2,
        content: e.detail.value.content,
        user: wx.getStorageSync("userInfo").id,
        course:that.data.course_id
      },
      method:"POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值application/json
        'cookie': wx.getStorageSync("sessionid")//读取cookie
      },
      success(res) {
        console.log(res)
        if (res.statusCode == 200) {
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 3000,
            success(){
              console.log("----")
              wx.navigateBack({
                delta: 1
              })
            }
          });
          
        }else{
          that.setData({
            msg:res.data
          })
        }

      },
      fail(res) {
       
      },
      complete(res) {
        // console.log(res);
        wx.hideLoading();

      }
    });
  },

  //情况二:用户给评分
  in_xin: function (e) {
    var in_xin = e.currentTarget.dataset.in;
    var one_2;
    if (in_xin === 'use_sc2') {
      one_2 = Number(e.currentTarget.id);
    } else {
      one_2 = Number(e.currentTarget.id) + this.data.one_2;
    }
    this.setData({
      one_2: one_2,
      two_2: 5 - one_2
    })
  }
})