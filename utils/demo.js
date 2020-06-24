wx.showLoading({
  title: '加载中...',
});

wx.hideLoading();

//页面跳转
wx.navigateTo({
  url: '../register/register'
});

//请求列表数据
wx.request({
  url: servers_url + 'Inspect/getInspectSummaryForDeviceList', // 仅为示例，并非真实的接口地址
  data: {
    days: 1,
    page: 0
  },
  header: {
    'content-type': 'application/x-www-form-urlencoded' // 默认值application/json
  },
  success(res) {
    console.log(res.data)
    if (res.data) {
      that.setData({
        inspectListData: res.data
      });
    }

  },
  fail(res) {
    // console.log("fail-->"+res);
    that.setData({
      inspectListData: {}
    });
  },
  complete(res) {
    // console.log(res);
    wx.hideLoading();

  }
});

//二级更新数据
var a = 'na_tabbar.na_text';

  //评价
  that.setData({
    [a]: '评价列表'
  });