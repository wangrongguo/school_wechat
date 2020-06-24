// pages/info/info.js
const app = getApp()
const na_backcolor = app.data.na_backcolor; //颜色
const servers_url = app.data.servers_url; //地址

Page({

  /**
   * 页面的初始数据
   */
  data: {
    infoData: {}, //个人信息数据
    firstImgUrl: "",
    secondImgUrl: "",
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
    education: ["博士", "硕士", "本科", '大专', '高中', '其他'],
    educationIndex: 2,
    gender: ["男", "女"],
    genderIndex: 0,
    birthday: ""
  },
  bindEducationChange: function (e) {

    this.setData({
      educationIndex: e.detail.value
    })
  },
  bindgenderChange: function (e) {

    this.setData({
      genderIndex: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this;
    const pages = getCurrentPages();
    const prevPage = pages[pages.length - 2]; // 上一页
    let infoData = prevPage.data.idCardInfo;
    console.log(infoData)
    that.setData({
      infoData: infoData,
      birthday: infoData.birthday
    })
    console.log(infoData.gender == '男')
    if (infoData.gender == '男'){
      this.setData({
        genderIndex: 0
      })
    }
  },

  bindDateChange: function (e) {
    console.log(e.detail.value)
    var that = this;
    that.setData({
      birthday: e.detail.value
    })
  },

  formSubmit: function (e) {
    var that = this


   

    // console.log("formSubmit:", e.detail)
    let param = e.detail.value;
    if (param.real_name.length == 0) {
      wx.showToast({
        title: '请输入用户名',
        icon: 'none'
      })
      return;
    }
    if (param.phone_number.length < 11) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none'
      })
      return;
    }
    if (param.id_num.length == 0) {
      wx.showToast({
        title: '请输入身份证号',
        icon: 'none'
      })
      return;
    }
    if (param.age.length == 0) {
      wx.showToast({
        title: '请输入年龄',
        icon: 'none'
      })
      return;
    }
  
    if (param.birthday == null) {
      wx.showToast({
        title: '请选择出生日期',
        icon: 'none'
      })
      return;
    }
    if (param.address == 0) {
      wx.showToast({
        title: '请输入家庭住址',
        icon: 'none'
      })
      return;
    }
    if (param.cur_address == 0) {
      wx.showToast({
        title: '请输入先居住地',
        icon: 'none'
      })
      return;
    }
    if (param.guardian_name.length == 0) {
      wx.showToast({
        title: '请输入紧急联系人姓名',
        icon: 'none'
      })
      return;
    }
    if (param.guardian_phone.length < 11) {
      wx.showToast({
        title: '请输入正确的紧急联系人手机号',
        icon: 'none'
      })
      return;
    }
    if (param.guardian_phone == param.phone_number) {
      wx.showToast({
        title: '紧急联系人不能是本人',
        icon: 'none'
      })
      return;
    }
    wx.request({
      url: servers_url + 'open/user_auth/',
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值application/json
        'cookie': wx.getStorageSync("sessionid") //读取cookie
      },
      data: {
        "academic": param.educationIndex + 1,
        "real_name": param.real_name,
        "phone_number": param.phone_number,
        "id_num": param.id_num,
        "birthday": param.birthday,
        "age": param.age,
        "address": param.address,
        "cur_address": param.cur_address,
        "guardian_name": param.guardian_name,
        "guardian_phone": param.guardian_phone,
        "gender": that.data.genderIndex == 0 ?'male':'female',
        "user": wx.getStorageSync("userInfo").id,
        "id_one": that.data.infoData.id_one + '',
        "id_two": that.data.infoData.id_two + ''
      },
      success(res) {
        console.log(res.data)
        if (res.statusCode == 200) {
          var pages = getCurrentPages();
          console.log(pages);
          pages[pages.length - 3].getInfoData();
         
          wx.showToast({
            title: '提交成功',
            duration: 2000,
            mask: true,
            success: function () {
              setTimeout(function () {
                //要延时执行的代码
                wx.navigateBack({
                  delta: 2
                })
              }, 1000) //延迟时间
            }
          });
        } else {
          wx.showToast({
            title: '提交失败',
            icon: 'none',

          })
        }
      }
    })
  },

  /**
   * 
   * DOCTOR = (1, "博士")
      MASTER = (2, "硕士")
      BACHELOR = (3, "本科")
      ASSOCIATE = (4, "大专")
      HIGH_SCHOOL = (5, "高中")
      OTHER = (6, "其他")
   */

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