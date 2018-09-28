const app = getApp()
import Address from '../../../api/address.js';
import Order from '../../../api/order.js';
Page({
  data:{
    currentTab:1,
    isSlide:false,
    addressList:[],
    modal:false
  },
  onLoad(){
    this.getOrder();
    this.getList(app.globalData.userInfo.id);
    // this.createAnimation();
    
  },
  getAddrHeight(){
    let that = this;
    let query = wx.createSelectorQuery();
    query.select('.modal-window').boundingClientRect()
    query.exec(function (res) {
      that.setData({
        y: res[0].height
      })
    });
  },
  getOrder(){
    let listing = [], 
        l = app.globalData.payOrder.listing,
        s = app.globalData.payOrder.store,
        total = 0;
    for (let k in l) {
      listing.push(l[k]);
      total += l[k]._price;
    }
    total += s.psprice;
    this.setData({
      store: s,
      listing: listing,
      total:total
    })
  },
  switchTab(e){
    this.setData({
      currentTab:e.currentTarget.dataset.index
    })
  },
  getList(id) {
    let that = this;
    (new Address()).list({ uid: id }).then((res) => {
      that.setData({
        addressList: res
      });
      that.getAddrHeight();
    })
  },
  createAnimation(){
    let animation = wx.createAnimation({
      duration: 800,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation;
  },
  openAddr(){
    let animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation;
    let y = this.data.y
    animation.bottom(0).step();
    this.setData({
      modal:true,
      addrAnimation: this.animation.export()
    })
  },
  chooseAddr(e){
    let data = e.currentTarget.dataset.info;
    this.setData({
      address:data
    })
    this.closeAddr()
  },
  closeAddr(){
    let animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation;
    let y = this.data.y
    animation.bottom(-y).step();
    this.setData({
      modal: false,
      addrAnimation: this.animation.export()
    })
  },
  submit(){
    if(!this.data.address){
      wx.showToast({
        title: '请选择地址',
        icon:'none'
      })
      return false;
    }
    let data = this.data;
    let param = {
      address:data.address.addr,
      uid: data.address.uid,
      uname:data.address.name,
      phone:data.address.phone,
      sid:data.store.id,
      sname:data.store.sname,
      slogo:data.store.logo,
      listing:data.listing,
      price:data.total,
      listing:data.listing
    };
    console.log(param);
    (new Order()).add(param).then((res)=>{
      
    })
  }
})