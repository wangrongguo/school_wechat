// pages/my/my.js
//获取应用实例
const app = getApp()
const na_backcolor = app.data.na_backcolor; //服务器地址
const servers_url = app.data.servers_url; //地址

Page({

  /**
   * 页面的初始数据
   * 我的
   * rongo
   * 2020-03-09
   */
  data: {
    checkStatus: "0", //0未提交，1审核中，2审核成功
    credit: "0", //积分

    isRefreshInfo: false, //是否需要刷新个人信息接口
    infoData: {},
    infoDetailUrl: "../idcard/idcard",
    servicesPhoneNum: "",

    list: [{
        name: '个人认证',
        icon: '../../images/icon_renzheng.png',
        url: '../idcard/idcard'
      }, {
        name: '意见反馈',
        icon: '../../images/icon_fankui.png',
        url: '../feedback/feedback'
      }, {
        name: '我的学分',
        icon: '../../images/icon_jifen.png',
        url: '../integral/integral'
      }, {
        name: '客服电话',
        icon: '../../images/icon_phone.png',
        url: ''
      }, {
        name: '消息订阅',
        icon: '../../images/dingyue.png',
        url: ''
      }

    ],
    na_tabbar: {
      na_loading: false,
      na_show: true,
      na_animated: true,
      na_back: false,
      na_backcolor: na_backcolor,
      na_text: '我的'
    },
    userInfo: []
  },

  //头部跳转
  onHeaderOnClick() {
    var that = this;

    if (that.data.checkStatus == "1") {

      wx.showToast({
        title: '认证中',
        icon: 'none'

      })
    } else if (that.data.checkStatus == "2") {
      wx.navigateTo({
        url: "../info_detail/info_detail"
      })
    } else {
      wx.navigateTo({
        url: "../idcard/idcard"
      })
    }
  },

  itemViewOnClick: function(event) {
    var that = this;
    var index = event.currentTarget.dataset.index;
    // console.log(event);
    if (index == 0 && (that.data.checkStatus == "1" || that.data.checkStatus == "2")) {

    } else if (index == 3) {
      if (that.data.servicesPhoneNum.length != 0) {
        wx.makePhoneCall({
          phoneNumber: that.data.servicesPhoneNum,
        })
      }
    } else if (index == 4) {
      //获取消息列表
      wx.showLoading({
        title: '加载中...',
      });
      wx.hideLoading();
      return false;
      wx.request({
        url: servers_url + 'open/wechat/msg/template/',
        header: {
          'content-type': 'application/x-www-form-urlencoded', // 默认值application/json
          'cookie': wx.getStorageSync("sessionid") //读取cookie
        },
        success(res) {
          console.log(res);

          if (res.statusCode == 200){
            var result = res.data.results;
            var tmplIds =[];
            var categories = [];
            for (var int = 0; int < result.length;int++){
              tmplIds.push(result[int].template_id);
              categories.push(result[int].category);
            }
          wx.requestSubscribeMessage({
            tmplIds: tmplIds,
            success(res) {
              
              wx.request({
                url: servers_url + 'open/wechat/msg/template/', // 仅为示例，并非真实的接口地址
                data: {
                  'categories': categories
                },
                method: "POST",
                header: {
                  'content-type': 'application/x-www-form-urlencoded', // 默认值application/json
                  'cookie': wx.getStorageSync("sessionid")//读取cookie
                },
                success(res) {
                  console.log(res)
                  if (res.statusCode == 200) {
                    wx.showToast({
                      title: '订阅成功',
                      icon: 'success'
                    });

                  } else {
                    
                  }

                },
                fail(res) {

                },
                complete(res) {
                  // console.log(res);
                  wx.hideLoading();
                }
              });
            }
          })
          }
        },
        complete(res) {
          wx.hideLoading();
        }
      })
      
    }else{
      wx.navigateTo({
        url: that.data.list[index].url
      })
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    // 查看是否授权
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          that.setData({
            userInfo: wx.getStorageSync('userInfo')
          })

        } else {
          wx.navigateTo({
            url: '../logs/logs'
          });
        }
      }
    });

    that.getInfoData();
    that.getServicesPhone();
  },

  getServicesPhone: function() {
    var that = this;
    wx.hideLoading();
    return false;
    wx.request({
      url: servers_url + 'api/kv_config/service_phone/',
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值application/json
        'cookie': wx.getStorageSync("sessionid") //读取cookie
      },
      success(res) {
        // console.log(res);
        that.data.servicesPhoneNum = res.data.service_phone
      }
    })
  },

  /**
   * 获取个人信息
   */
  getInfoData: function(options) {

    var that = this;
    wx.showLoading({
      title: '加载中...',
    });
    wx.hideLoading();
    return false;
    wx.request({
      url: servers_url + 'open/user_auth/?user__id=' + wx.getStorageSync("userInfo").id,
      // url: servers_url + 'api/user_auth/?user__id=3',

      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值application/json
        'cookie': wx.getStorageSync("sessionid") //读取cookie
      },
      success(res) {

        // console.log(res);
        var array = [];
        array = res.data.results;
        var detailUrl = "../idcard/idcard";

        if (array.length) {
          var currentInfoData = res.data.results[0];
          if (currentInfoData.check_status == "2") {
            detailUrl = "../info_detail/info_detail";
          } else if (currentInfoData.check_status == "1") {
            detailUrl = "";

          }
          that.setData({
            infoData: currentInfoData,
            checkStatus: currentInfoData.check_status,
            infoDetailUrl: detailUrl,
            credit: currentInfoData.user.credit

          })
        } else {
          that.setData({
            checkStatus: "0",
            infoDetailUrl: detailUrl

          })
        }

      },

       complete(res) {
         wx.hideLoading();

      }
    })
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
    var that = this;
    if (that.data.isRefreshInfo) {
      that.getInfoData();
    }
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

    var that = this;
    that.getInfoData();
    wx.stopPullDownRefresh();

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