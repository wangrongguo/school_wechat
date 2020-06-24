//index.js
//获取应用实例
const app = getApp()
const na_backcolor = app.data.na_backcolor;//颜色
const servers_url = app.data.servers_url;//地址
Page({
  data: {
    background: [],
    news_items: [],
    course_items: [],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 500,
    inputShowed: false,
    inputVal: "",
    na_tabbar: {
      na_loading: false,
      na_show: true,
      na_animated: true,
      na_back: false,
      na_backcolor: na_backcolor,
      na_text: '祺弄工作室'
    },
    topImgHeight:133
  },

  search: function (value) {
    console.log(value)
  },
  selectResult: function (e) {
    console.log('select result', e.detail)

  },
  selectBindfocus: function (e) {
    // console.log("selectBindfocus")
    wx.hideKeyboard();
    wx.navigateTo({
      url: '../course_search/course_search'
    });
  },

  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var that = this;
    // that.getDataInit(that);
    wx.getSystemInfo({
      success(res) {
        console.log(res)
        that.setData({
          topImgHeight: res.windowWidth*0.5
        });
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
    console.log(this.data.background)
    if (this.data.background == undefined || this.data.background.length == 0) {
      this.getDataInit(this);
    }
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
    this.getDataInit(this);
    wx.stopPullDownRefresh(); //停止下拉刷新
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
   * 数据初始化
   */
  getDataInit: function (that) {
    wx.showLoading({
      title: '加载中...',
    });
    wx.hideLoading();

    var result = {
      "banners": [
        {
          "id": 5,
          "cover": {
            "id": 94,
            "uri": "/banner/2020/04/16/df/61348e-7f9f-11ea-b11c-00163e308a48_L.png",
            "full_url": "../../images/banner.jpg"
          },
          "created": "2020-04-02 10:16:15",
          "updated": "2020-04-16 13:05:22",
          "explain": "健康西点",
          "position_type": "top",
          "position": 3,
          "is_online": 1,
          "link_type": "1",
          "link_id": 0
        },
        {
          "id": 6,
          "cover": {
            "id": 92,
            "uri": "/banner/2020/04/16/2a/2fb612-7f9f-11ea-b11c-00163e308a48_L.png",
            "full_url": "../../images/banner1.jpg"
          },
          "created": "2020-04-02 12:23:30",
          "updated": "2020-04-16 13:00:18",
          "explain": "健康食尚养生",
          "position_type": "top",
          "position": 2,
          "is_online": 1,
          "link_type": "1",
          "link_id": 0
        },
        {
          "id": 7,
          "cover": {
            "id": 103,
            "uri": "/banner/2020/04/17/c5/2cb30e-8076-11ea-b11c-00163e308a48_L.png",
            "full_url": "../../images/banner2.jpg"
          },
          "created": "2020-04-02 13:24:05",
          "updated": "2020-04-17 14:43:40",
          "explain": "招生",
          "position_type": "top",
          "position": 1,
          "is_online": 1,
          "link_type": "2",
          "link_id": 0
        },
        {
          "id": 7,
          "cover": {
            "id": 103,
            "uri": "/banner/2020/04/17/c5/2cb30e-8076-11ea-b11c-00163e308a48_L.png",
            "full_url": "../../images/banner3.jpg"
          },
          "created": "2020-04-02 13:24:05",
          "updated": "2020-04-17 14:43:40",
          "explain": "招生",
          "position_type": "top",
          "position": 1,
          "is_online": 1,
          "link_type": "2",
          "link_id": 0
        },
        {
          "id": 7,
          "cover": {
            "id": 103,
            "uri": "/banner/2020/04/17/c5/2cb30e-8076-11ea-b11c-00163e308a48_L.png",
            "full_url": "../../images/banner4.jpg"
          },
          "created": "2020-04-02 13:24:05",
          "updated": "2020-04-17 14:43:40",
          "explain": "招生",
          "position_type": "top",
          "position": 1,
          "is_online": 1,
          "link_type": "2",
          "link_id": 0
        },
        {
          "id": 7,
          "cover": {
            "id": 103,
            "uri": "/banner/2020/04/17/c5/2cb30e-8076-11ea-b11c-00163e308a48_L.png",
            "full_url": "../../images/banner5.jpg"
          },
          "created": "2020-04-02 13:24:05",
          "updated": "2020-04-17 14:43:40",
          "explain": "招生",
          "position_type": "top",
          "position": 1,
          "is_online": 1,
          "link_type": "2",
          "link_id": 0
        }
      ],
      "news": [
        {
          "id": 1,
          "cover": {
            "id": 101,
            "uri": "/banner/2020/04/17/80/12f9a0-8075-11ea-b11c-00163e308a48_L.png",
            "full_url": "../../images/banner5.jpg"
          },
          "created": "2020-03-31 11:02:54",
          "updated": "2020-04-17 14:34:34",
          "explain": "新闻快讯",
          "position_type": "left",
          "position": 1,
          "is_online": 1,
          "link_type": "2",
          "link_id": 0
        },
        {
          "id": 2,
          "cover": {
            "id": 102,
            "uri": "/banner/2020/04/17/12/402dd4-8076-11ea-b11c-00163e308a48_L.png",
            "full_url": "../../images/banner4.jpg"
          },
          "created": "2020-03-31 11:10:28",
          "updated": "2020-04-17 14:38:40",
          "explain": "教学成果",
          "position_type": "right",
          "position": 1,
          "is_online": 1,
          "link_type": "2",
          "link_id": 0
        }
      ],
      "courses": [
        {
          "id": 2,
          "cover": {
            "id": 90,
            "uri": "/course_img/2020/04/11/f1/a2839e-7bcd-11ea-9998-00163e308a48_L.jpg",
            "full_url": "../../images/banner5.jpg"
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
        },
        {
          "id": 1,
          "cover": {
            "id": 30,
            "uri": "/course_img/2020/04/09/38/05f2d2-7a0a-11ea-b61f-00163e308a48_L.png",
            "full_url": "../../images/banner4.jpg"
          },
          "video": {
            "id": 31,
            "uri": "/course_video/2020/04/09/54/8184ee-7a0a-11ea-b61f-00163e308a48.mp4",
            "full_url": ""
          },
          "classify": {
            "id": 4,
            "created": "2020-04-09 10:14:41",
            "updated": "2020-04-09 10:14:41",
            "name": "声乐器乐",
            "position": 4
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
              "id": 1,
              "grade_schedules": [
                {
                  "id": 3,
                  "start_time": "2020-04-09 23:19:00",
                  "end_time": "2020-05-05 23:19:00",
                  "grade": 1
                }
              ],
              "course": {
                "id": 1,
                "created": "2020-04-09 10:32:44",
                "updated": "2020-04-10 12:41:45",
                "name": "音乐美学",
                "is_online": 1,
                "popularity": 100,
                "price": "0.01",
                "total_num": 35,
                "apply_num": 9,
                "age_lower": 45,
                "age_upper": 75,
                "classify": 4,
                "cover": 30,
                "video": 31,
                "teacher": 1,
                "address": 1
              },
              "created": "2020-04-09 10:35:55",
              "updated": "2020-04-11 23:19:10",
              "name": "每周一10:00~11:00",
              "room": "5教302",
              "start_time": "2020-04-09 23:19:00",
              "end_time": "2020-05-05 23:19:00",
              "date_range": "2020-04-09 到 2020-05-05"
            }
          ],
          "created": "2020-04-09 10:32:44",
          "updated": "2020-04-10 12:41:45",
          "name": "音乐美学",
          "is_online": 1,
          "popularity": 100,
          "intro": "<p>戴老师同您一起欣赏韵律之美</p>",
          "price": "0.01",
          "total_num": 35,
          "apply_num": 9,
          "age_lower": 45,
          "age_upper": 75,
          "address": {
            "id": 1,
            "name": "景新花园社区党群服务中心",
            "detail": "天津市津南区仁恒滨河湾(雅润路8号)",
            "addr_type": "1",
            "lat": "39.008450656",
            "lng": "117.391063605"
          }
        }
      ]
    };
    that.setData({
      background: result.banners,
      news_items: result.news,
      course_items: result.courses
    });
    return false;
    //初始化首页
    //请求列表数据
    wx.request({
      url: servers_url + 'open/home/', // 仅为示例，并非真实的接口地址
      data: {
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值application/json
        'cookie': wx.getStorageSync("sessionid")//读取cookie
      },
      success(res) {
        console.log(res)
        if (res) {
          if (res.statusCode == 200){
            that.setData({
              background: res.data.banners,
              news_items: res.data.news,
              course_items: res.data.courses
            });

          }else{
            重新授权登录
            wx.navigateTo({
              url: '../logs/logs'
            });
          }
        }

      },
      fail(res) {
        // console.log("fail-->"+res);
        that.setData({
          background: [],
          news_items: [],
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
