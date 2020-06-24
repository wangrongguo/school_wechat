// pages/info_detail/info_detail.js
const app = getApp()
const na_backcolor = app.data.na_backcolor; //颜色
const servers_url = app.data.servers_url; //地址
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: ["真实姓名","性别","年龄", "联系方式", "学历", "家庭住址","现居住地"],
    guardianList: ["紧急联系人", "联系方式"],
    valueArray:[],
    guardianArray:[],
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500,
    currentTab: 0,
    na_tabbar: {
      na_loading: false,
      na_show: true,
      na_animated: true,
      na_back: true,
      na_backcolor: na_backcolor,
      na_text: '个人信息'
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.showLoading({
      title: '加载中...',
    });
    wx.request({
      url: servers_url + 'api/user_auth/?user__id=' + wx.getStorageSync("userInfo").id,
      // url: servers_url + 'api/user_auth/?user__id=3',
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值application/json
        'cookie': wx.getStorageSync("sessionid") //读取cookie
      },
      success(res) {
        // console.log(res);

        var currentInfoData = res.data.results[0];
        var education =["博士", "硕士", "本科", '大专', '高中', '其他'];

        that.setData({
          valueArray: [currentInfoData.real_name, currentInfoData.gender == 'male' ? '男' : '女', currentInfoData.age, currentInfoData.phone_number, education[currentInfoData.academic - 1], currentInfoData.address,currentInfoData.cur_address],
          guardianArray: [ currentInfoData.guardian_name, currentInfoData.guardian_phone]
        })
      },
      complete() {
        wx.hideLoading()
      }
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

  }
})