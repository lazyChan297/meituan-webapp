const app = getApp()
const wxAuth = require('../../../utils/wxAuth.js')
const wxLogin = require('../../../utils/wxLogin.js')
Page({
  data: {
    translateX:0,
    currentMenu:1
  },
  onLoad: function (options) {
    wxAuth(()=>{

    },()=>{
      wx.navigateTo({
        url: '../../login/login'
      })
    })
    let that = this;
    this.getPhoneInfo()
  },
  // 获取设备信息
  getPhoneInfo(){
    let that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          pageHeight:res.windowHeight - 31
        })
      },
    })
  },
  // 切换导航栏
  switchTab(e){
    let index = e.currentTarget.dataset.index,translateX = this.data.translateX;
    this.setData({
      move:index*translateX,
      currentIndex:index,
      current:index
    });
    
  },
  // 切换主体
  swiperChange(e){
    let translateX = this.data.translateX;
    this.setData({
      move: e.detail.current * translateX,
      currentIndex: e.detail.current
    })
  },
  // 锚点
  scrollTo(e){
    let index = e.currentTarget.dataset.index,
        id = 'scroll' + index;
    this.setData({
      scrollToView:id,
      currentMenu:index
    })
  }
})