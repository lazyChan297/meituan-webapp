const app = getApp()
const wxAuth = require('../../utils/wxAuth.js')
const wxLogin = require('../../utils/wxLogin.js');
import Index from '../../api/index.js';
Page({
  data: {
    currentTop:0
  },
  onLoad: function () {
    var that = this;
    let _this = this;
    
    this.getlist()
  },
  onShow(){
    if(!app.globalData.userInfo){
      wxAuth(() => {
        wxLogin((data) => {
          app.globalData.userInfo = data;
        })
      }, () => {
        wx.navigateTo({
          url: '../login/login'
        })
      });
    }
  },
  scroll(e){
    var currentTop = e.detail.scrollTop,
        scrollTop = this.data.scrollTop;
    this.setData({
      currentTop: currentTop
    })
    currentTop = this.data.currentTop;
    if(currentTop >= scrollTop){
    }
  },
  getlist(){
    let that = this;
    (new Index()).list().then((res)=>{
      that.setData({
        list: res
      })
    })
  },
  getListBy(e){
    let that = this;
    let c = e.currentTarget.dataset.num==1?'sold':'speed';
    (new Index()).listBy({condition:c}).then((res)=>{
      that.setData({
        list: res
      })
    });
  },
  test(e){
    
    wx.navigateTo({
      url:'../shop/index',
      success(){
        app.globalData.currentStore = e.currentTarget.dataset.info
      }
    })
  }
})
