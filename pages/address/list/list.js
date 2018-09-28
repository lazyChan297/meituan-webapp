import Address from '../../../api/address.js';
const app = getApp()
Page({
  data: {

  },
  onLoad: function (options) {
    
  },
  onShow(){
    this.getList(app.globalData.userInfo.id);
  },
  getList(id){
    let that = this;
    (new Address()).list({uid:id}).then((res)=>{
      that.setData({
        list:res
      })
    })
  },
  addAddr(){
    wx.redirectTo({
      url:'../add/add'
    })
  },
  updateAddr(e){
    let data = e.currentTarget.dataset.info;
    app.globalData.updateAddr = data;
    wx.navigateTo({
      url: '../update/update'
    })
  }
})