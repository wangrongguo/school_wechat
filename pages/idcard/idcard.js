// pages/idcard/idcard.js
const app = getApp()
const na_backcolor = app.data.na_backcolor; //颜色
const servers_url = app.data.servers_url; //地址

Page({

  /**
   * 页面的初始数据
   */
  data: {
    worksImgs: ['../../images/auth_id_positive.png',
      '../../images/auth_id_reverse.png'
    ],
    butDisabled: true, //默认提交按钮禁用
    isSelectedFirstImg: false, //是否上传了人面像照片
    isSelectedSecondImg: false, //是否上传了国徽面照片
    firstImgUrl: "",
    secondImgUrl: "",
    id_one: '',
    id_two: '',
    idCardInfo: {},

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
      na_text: '实名认证'
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
  onShareAppMessage: function() {

  },

  imgClickTab: function(e) {
    var that = this;

    var worksImgs = this.data.worksImgs;

    var imgId = e.currentTarget.id;

    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // console.log(res);
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        if (res.tempFilePaths.count == 0) {
          return;
        }
        if (imgId == "imgUp") {

          worksImgs[0] = res.tempFilePaths[0];
          that.setData({
            isSelectedFirstImg: true
          })
        } else {
          worksImgs[1] = res.tempFilePaths[0];
          that.setData({
            isSelectedSecondImg: true
          })
        }



        that.setData({
          worksImgs: worksImgs
        });

        if (that.data.isSelectedFirstImg && that.data.isSelectedSecondImg) {
          that.setData({
            butDisabled: false
          })
        }
      }
    })
  },
  submitClick: function() {
    var that = this;
    //上传图片 循环提交
    var data = [];
    data.i = 0;
    that.uploadImage(data);

  },

  uploadImage: function(e) {
    var i = e.i;
    var that = this;
    wx.showLoading({
      title: '提交中',
    });
    wx.uploadFile({
      url: servers_url + 'open/file/',
      filePath: that.data.worksImgs[i],
      name: 'file',
      formData: {
        'file_name': that.data.worksImgs[i],
        'catalog': 'id_card'
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值application/json
        'cookie': wx.getStorageSync("sessionid") //读取cookie
      },
      success: function(res) {
        console.log(res);

        if (res.statusCode == 200) {

          if (i == 0) {
            var d = JSON.parse(res.data);

            that.setData({
              firstImgUrl: d.full_url,
              id_one: d.id
            });
          } else if (i == 1) {
            var d = JSON.parse(res.data);

            that.setData({
              secondImgUrl: d.full_url,
              id_two: d.id
            });
          }

          i++;
          if (i == 2) { //当图片传完时，停止调用
            // console.log('成功');
            that.postImageInfos();
          } else {
            e.i = i;
            that.uploadImage(e);
          }
        } else {
          wx.hideLoading()
          wx.showToast({
            title: '提交失败',
          })
        }
      },
      fail(res) {
        wx.hideLoading()
        wx.showToast({
          title: '提交失败',
        })
      }

    })
  },
  postImageInfos: function() {
    var that = this;
    // console.log(that.data.id_one + "---" + that.data.id_two),

    wx.request({
      url: servers_url + 'open/ai/id_card/',
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值application/json
        'cookie': wx.getStorageSync("sessionid") //读取cookie
      },
      data: {
        id_one: that.data.id_one,
        id_two: that.data.id_two
      },
      success(res) {
        // console.log(res),
        wx.hideLoading();
        if (res.statusCode == 200) {

          var infoData = res.data
          infoData["id_one"] = that.data.id_one
          infoData["id_two"] = that.data.id_two
          that.setData({
            idCardInfo: infoData
          })
          console.log(infoData)
          wx.navigateTo({
            url: '../info/info',
          })
        } else {
          wx.showToast({
            title: '提交失败',
          })
        }
      },
      fail(res) {

        wx.hideLoading()
        wx.showToast({
          title: '提交失败',
        })
      }
    })
  }

})