// pages/course_detail/course_detail.js
//获取应用实例
const app = getApp()
const na_backcolor = app.data.na_backcolor; //颜色
const servers_url = app.data.servers_url; //地址
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
      na_text: '课程详情'
    },
    course_detail: {},
    brief: '',
    intro: '',
    course_id: '',
    height: 240,
    class_list: []

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    console.log(options.course_id) //课程id
    wx.showLoading({
      title: '加载中...',
    });
    const sync = wx.getSystemInfoSync();
    console.log(sync)
    var p = 1800;
    if (sync.windowHeight < 600) {
      p = 1860;
    } else if (sync.windowHeight > 600 && sync.windowHeight < 800) {
      p = 1640;
    } else if (sync.windowHeight > 800) {
      p = 1680;
    }
    that.setData({
      height: sync.windowHeight * (sync.windowHeight / p)
    })

    var result = {
      "id": 2,
      "cover": {
        "id": 90,
        "uri": "/course_img/2020/04/11/f1/a2839e-7bcd-11ea-9998-00163e308a48_L.jpg",
        "full_url": "../../images/banner4.jpg"
      },
      "video": {
        "id": 91,
        "uri": "/course_video/2020/04/11/f9/484dc2-7bcd-11ea-9fd2-00163e308a48.mp4",
        "full_url": "http://file.lexin.online/course_video/2020/04/11/f9/484dc2-7bcd-11ea-9fd2-00163e308a48.mp4"
      },
      "classify": {
        "id": 9,
        "created": "2020-04-09 10:17:39",
        "updated": "2020-04-09 10:17:47",
        "name": "舞蹈戏曲",
        "position": 1
      },
      "teacher": {
        "id": 1,
        "created": "2020-04-09 10:25:03",
        "updated": "2020-04-22 08:56:16",
        "name": "戴雨桐",
        "brief": "教师简介",
        "favorable": 0.83
      },
      "grades": [
        {
          "id": 2,
          "grade_schedules": [],
          "course": {
            "id": 2,
            "created": "2020-04-11 16:25:30",
            "updated": "2020-04-11 20:15:53",
            "name": "戏曲入门",
            "is_online": 1,
            "popularity": 100,
            "price": "10000.00",
            "total_num": 1,
            "apply_num": 0,
            "age_lower": 10,
            "age_upper": 100,
            "classify": 9,
            "cover": 90,
            "video": 91,
            "teacher": 1,
            "address": 4
          },
          "created": "2020-04-11 16:26:17",
          "updated": "2020-04-11 23:03:55",
          "name": "每周二14:00-16:00",
          "room": "5教301",
          "start_time": null,
          "end_time": null,
          "date_range": null
        },
        {
          "id": 3,
          "grade_schedules": [],
          "course": {
            "id": 2,
            "created": "2020-04-11 16:25:30",
            "updated": "2020-04-11 20:15:53",
            "name": "戏曲入门",
            "is_online": 1,
            "popularity": 100,
            "price": "10000.00",
            "total_num": 1,
            "apply_num": 0,
            "age_lower": 10,
            "age_upper": 100,
            "classify": 9,
            "cover": 90,
            "video": 91,
            "teacher": 1,
            "address": 4
          },
          "created": "2020-04-11 23:15:46",
          "updated": "2020-04-11 23:16:10",
          "name": "周三19:00-20:30",
          "room": "508",
          "start_time": "2020-04-11 23:15:00",
          "end_time": "2020-05-31 23:15:00",
          "date_range": "2020-04-11 到 2020-05-31"
        }
      ],
      "created": "2020-04-11 16:25:30",
      "updated": "2020-04-11 20:15:53",
      "name": "戏曲入门",
      "is_online": 1,
      "popularity": 100,
      "intro": "<p>课程测试</p>",
      "price": "10000.00",
      "total_num": 1,
      "apply_num": 0,
      "age_lower": 10,
      "age_upper": 100,
      "address": {
        "id": 4,
        "name": "天津海运职业学院",
        "detail": "天津市津南区海河教育园区雅深路8号",
        "addr_type": "1",
        "lat": "39.00028",
        "lng": "117.36556"
      }
    };
    var grades = result.grades;
    var class_list = [];
    if (grades.length > 0) {
      for (var int = 0; int < grades.length; int++) {
        class_list.push(grades[int].name);
      }
    }
    that.setData({
      course_detail: result,
      intro: result.intro,
      brief: result.teacher.brief,
      course_id: options.course_id,
      class_list: class_list
    });
    wx.hideLoading();
    return false;
    //初始化点击菜单加载相应数据
    //请求列表数据
    wx.request({
      url: servers_url + 'api/course/' + options.course_id + '/', // 仅为示例，并非真实的接口地址
      data: {},
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值application/json
        'cookie': wx.getStorageSync("sessionid") //读取cookie
      },
      success(res) {
        console.log(res.data)
        if (res.data) {
          var intro = res.data.intro.replace(/<img/gi, '<img style="max-width:100%;height:auto;float:left;display:block;padding:5px 0px;" ').replace(/<section/g, '<div').replace(/\/section>/g, '\div>');
          var brief = res.data.teacher.brief.replace(/<img/gi, '<img style="max-width:100%;height:auto;float:left;display:block;padding:5px 0px;" ').replace(/<section/g, '<div').replace(/\/section>/g, '\div>');
          //处理班级信息
          var grades = res.data.grades;
          var class_list = [];
          if (grades.length > 0) {
            for (var int = 0; int < grades.length; int++) {
              class_list.push(grades[int].name);
            }
          }
          that.setData({
            course_detail: res.data,
            intro: intro,
            brief: brief,
            course_id: options.course_id,
            class_list: class_list
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
  onReady: function() {
    this.videoContext = wx.createVideoContext('myVideo')
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
  onShareAppMessage() {
    return {
      title: this.data.course_detail.name,
      path: '/pages/course_detail/course_detail?course_id=' + this.data.course_id
    }
  },
  //点击切换
  clickTab: function(e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  //滑动切换
  changeTab: function(e) {
    console.log(e)
    var that = this;
    if (this.data.currentTab === e.detail.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.detail.current
      })
    }
  },
  //购买课程
  bayCourse: function() {
    var that = this;
    if (that.data.class_list.length == 0) {

      wx.showModal({
        content: '还没有关联班级，无法报名',
        showCancel: false,
        success: function(res) {

        }
      });
      return false;
    }
    wx.showActionSheet({
      itemList: that.data.class_list,
      success: function(resAction) {
        console.log(resAction);
        if (!resAction.cancel) {
          if (that.data.course_detail.grades.length == 0) {
            wx.showModal({
              content: '还没有关联班级，无法报名',
              showCancel: false,
              success: function(res) {

              }
            });
            return false;
          }
          wx.showLoading({
            title: '加载中...',
          });
          //先请求验证能不能买
          //请求列表数据
          wx.request({
            url: servers_url + 'open/pay/wechat/pre/', // 仅为示例，并非真实的接口地址
            data: {
              payment: parseFloat(that.data.course_detail.price),
              course_id: that.data.course_detail.id,
              grade_id: that.data.course_detail.grades[resAction.tapIndex].id
            },
            method: 'GET',
            header: {
              'content-type': 'application/x-www-form-urlencoded', // 默认值application/json
              'cookie': wx.getStorageSync("sessionid") //读取cookie
            },
            success(res_check) {
              console.log(res_check)
              if (res_check.statusCode == 200) {
                  //返回签名，调起支付
                  wx.request({
                    url: servers_url + 'open/pay/wechat/pre/', // 仅为示例，并非真实的接口地址
                    data: {
                      payment: parseFloat(that.data.course_detail.price),
                      course_id: that.data.course_detail.id,
                      grade_id: that.data.course_detail.grades[resAction.tapIndex].id
                    },
                    method: 'POST',
                    header: {
                      'content-type': 'application/x-www-form-urlencoded', // 默认值application/json
                      'cookie': wx.getStorageSync("sessionid") //读取cookie
                    },
                    success(res) {
                      console.log(res)

                        if (res.statusCode == 200) {
                          //返回签名，调起支付
                          // var timestamp = parseInt(res.data.timestamp);
                          wx.setStorageSync('payData', res.data);
                          wx.navigateTo({
                            url: '../pay_know/pay_know'
                          });

                        } else {
                          if (res.data[0]) {
                            wx.showModal({
                              content: res.data[0],
                              showCancel: false,
                              success: function(res) {

                              }
                            });
                          }else{
                            wx.showModal({
                              content: '系统错误，请联系客服',
                              showCancel: false,
                              success: function (res) {

                              }
                            });
                          }
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


                } else {
                wx.hideLoading();
                if (res_check.data[0]) {

                    wx.showModal({
                      content: res_check.data[0],
                      showCancel: false,
                      success: function(res) {

                      }
                    });
                  }
                }

            },
            fail(res) {
              // console.log("fail-->"+res);
              wx.hideLoading();
            },
            complete(res) {
              // console.log(res);
            
            }
          });
        }
      }
    });

  }
})