const app = getApp()
const wxAuth = require('../../../utils/wxAuth.js')
const wxLogin = require('../../../utils/wxLogin.js')
Page({
  data: {
  
  },
  onLoad: function (options) {
    
  },
  onShow(){
    if(app.globalData.userInfo){
      this.setData({
        username: app.globalData.userInfo.username,
        avatarUrl: app.globalData.userInfo.avatarUrl
      })
    } else {
      this.isLogin()
    }
  },
  isLogin(){
    let that = this;
    wxAuth(() => {
      // 授权登录成功
      wxLogin((data)=>{
        that.setData({
          username: data.username,
          avatarUrl: data.avatarUrl
        })
      })
    },()=>{
      that.setData({
        avatarUrl: '../../../images/unlogin.jpg',
        username: '登录'
      })
    })
  },
  toAuth(){
    if(this.data.username==='登录'){
      wx.navigateTo({
        url: '../../login/login'
      })
    }
  }
})