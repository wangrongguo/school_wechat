// pages/course/course.js
//获取应用实例
const app = getApp()
const na_backcolor = app.data.na_backcolor;//颜色
const servers_url = app.data.servers_url;//地址
Page({

  /**
   * 页面的初始数据
   * 课程
   * rongo
   * 20200309
   */
  data: {
    inputShowed: false,
    inputVal: "",
    na_tabbar: {
      na_loading: false,
      na_show: true,
      na_animated: true,
      na_back: false,
      na_backcolor: na_backcolor,
      na_text:'课程'
    }, 
    menu_left:[],
    course_items: [],
    curNav: 1,
    curIndex: 0,
    windowHeight:500
  },
  //事件处理函数  
  switchRightTab: function (e) {
    // 获取item项的id，和数组的下标值  
    var that = this;
    let id = e.target.dataset.id,
      index = parseInt(e.target.dataset.index);
    // 把点击到的某一项，设为当前index  
    that.setData({
      curNav: id,
      curIndex: index
    });
    // 获取item项的id，和数组的下标值 
    wx.showLoading({
      title: '加载中...',
    });
    var result= [
      {
        "id": 2,
        "cover": {
          "id": 90,
          "uri": "/course_img/2020/04/11/f1/a2839e-7bcd-11ea-9998-00163e308a48_L.jpg",
          "full_url": "../../images/banner.jpg"
        },
        "video": {
          "id": 91,
          "uri": "/course_video/2020/04/11/f9/484dc2-7bcd-11ea-9fd2-00163e308a48.mp4",
          "full_url": ""
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
          "brief": "123",
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
      }
    ];
    that.setData({
      course_items: result
    });
    wx.hideLoading();
    return false;
    //初始化点击菜单加载相应数据
    //请求列表数据
    wx.request({
      url: servers_url + 'api/course/', // 仅为示例，并非真实的接口地址
      data: {
        name: '',
        classify__id: id,
        is_online: 1,
        teacher__id: ''
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
          course_items: {}
        });
      },
      complete(res) {
        // console.log(res);
        wx.hideLoading();

      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //屏幕 
    wx.getSystemInfo({
      success(res) {
        console.log(res)
        that.setData({
          windowHeight: res.windowHeight
        });
      }
    }) 


    var result = [
      {
        "id": 1,
        "created": "2020-04-09 10:17:39",
        "updated": "2020-04-09 10:17:47",
        "name": "舞蹈戏曲",
        "position": 1
      },
      {
        "id": 9,
        "created": "2020-03-31 11:04:27",
        "updated": "2020-04-09 10:14:18",
        "name": "书法绘画",
        "position": 2
      },
      {
        "id": 3,
        "created": "2020-04-08 15:23:48",
        "updated": "2020-04-09 10:14:06",
        "name": "健康养生",
        "position": 3
      },
      {
        "id": 4,
        "created": "2020-04-09 10:14:41",
        "updated": "2020-04-09 10:14:41",
        "name": "声乐器乐",
        "position": 4
      },
      {
        "id": 2,
        "created": "2020-04-08 15:04:52",
        "updated": "2020-04-09 10:18:31",
        "name": "服装模特",
        "position": 5
      },
      {
        "id": 6,
        "created": "2020-04-09 10:15:19",
        "updated": "2020-04-09 10:15:19",
        "name": "创意生活",
        "position": 6
      },
      {
        "id": 7,
        "created": "2020-04-09 10:15:31",
        "updated": "2020-04-09 10:15:31",
        "name": "文史外语",
        "position": 7
      },
      {
        "id": 5,
        "created": "2020-04-09 10:14:53",
        "updated": "2020-04-09 10:19:52",
        "name": "数字媒体",
        "position": 8
      },
      {
        "id": 8,
        "created": "2020-04-09 10:15:50",
        "updated": "2020-04-09 10:18:51",
        "name": "亲子课堂",
        "position": 9
      }
    ];
    that.setData({
      menu_left: result
    });
    wx.hideLoading();
    return false;
    //初始化左侧菜单
    //请求列表数据
    wx.request({
      url: servers_url + 'api/course_classify/', // 仅为示例，并非真实的接口地址
      data: {
        ordering:'position'
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值application/json
        'cookie': wx.getStorageSync("sessionid")//读取cookie
      },
      success(res) {
        console.log(res.data.results)
        if (res.data.results) {
          that.setData({
            menu_left: res.data.results,
            curNav: res.data.results[0].id,
            curIndex: 0
          });
          //初始化第一个菜单数据
          //请求列表数据
          wx.request({
            url: servers_url + 'api/course/', // 仅为示例，并非真实的接口地址
            data: {
              name: '',
              classify__id: res.data.results[0].id,
              is_online: 1,
              teacher__id: ''
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
                course_items: {}
              });
            },
            complete(res) {
              // console.log(res);
              wx.hideLoading();

            }
          });

        }

      },
      fail(res) {
        // console.log("fail-->"+res);
        that.setData({
          menu_left: {}
        });
      },
      complete(res) {
        // console.log(res);
        wx.hideLoading();

      }
    });
    this.setData({
      search: this.search.bind(this)
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
    var that = this;
    wx.showLoading({
      title: '加载中...',
    });
    //初始化左侧菜单
    //请求列表数据
    wx.request({
      url: servers_url + 'api/course_classify/', // 仅为示例，并非真实的接口地址
      data: {
        ordering: 'position'
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值application/json
        'cookie': wx.getStorageSync("sessionid")//读取cookie
      },
      success(res) {
        console.log(res.data.results)
        if (res.data.results) {
          that.setData({
            menu_left: res.data.results,
            curNav: res.data.results[0].id,
            curIndex: 0
          });
          //初始化第一个菜单数据
          //请求列表数据
          wx.request({
            url: servers_url + 'api/course/', // 仅为示例，并非真实的接口地址
            data: {
              name: '',
              classify__id: res.data.results[0].id,
              is_online: 1,
              teacher__id: ''
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
                course_items: {}
              });
            },
            complete(res) {
              // console.log(res);
              wx.hideLoading();

            }
          });

        }

      },
      fail(res) {
        // console.log("fail-->"+res);
        that.setData({
          menu_left: {}
        });
      },
      complete(res) {
        // console.log(res);
        wx.hideLoading();
        wx.stopPullDownRefresh(); //停止下拉刷新
      }
    });
    
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
  search: function (value) {

  },
  selectResult: function (e) {
    console.log('select result', e.detail)
  },
  selectBindfocus: function (e) {
    wx.hideKeyboard();
    wx.navigateTo({
      url: '../course_search/course_search'
    });
  }
})