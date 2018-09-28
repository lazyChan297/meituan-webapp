const app = getApp();
import Store from '../../api/store.js';

Page({
  data: {
    translateX: 0,
    currentMenu: 1,
    num:0,
    quantity:0,
    total:0,
    listing:{},
    modal:false,
    cartModal:false
  },
  onLoad: function (opt) {
    let store = app.globalData.currentStore
    wx.setNavigationBarTitle({
      title: store.sname
    })
    let that = this;
    that.setData({
      store:store
    })
    app.globalData.currentStore = {}
    this.getlist()
    this.getPhoneInfo()
    var query = wx.createSelectorQuery();
    query.select('.tab-item').boundingClientRect()
    query.exec(function (res) {
      that.setData({
        translateX: res[0].width
      })
    });
    wx.hideTabBar()
  },
  // 获取商品列表
  getlist(){
    let that = this, store = this.data.store;
      (new Store()).list({ sid: store.id}).then((res)=>{
        let hot = [],intro = [],comb = [];
        res.forEach((item,index)=>{
          if(item.type === 'hot'){
            hot.push(item);
          } else if(item.type === 'intro'){
            intro.push(item);
          } else {
            comb.push(item)
          }
        })
        that.setData({
          hot:hot,
          intro:intro,
          comb:comb
        })
      })
  },
  // 打开弹窗
  openModal(e){
    let currentProd = e.currentTarget.dataset.info;
    this.setData({
      currentProd: currentProd,
      modal:true
    })
  },
  // 打开购物车
  openCart(){
    // this.setData({
    //   cartModal:true
    // })
    // this.change();
  },
  // 获取设备信息
  getPhoneInfo() {
    let that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          pageHeight: res.windowHeight - 31 - 80,
          modalHeight: res.windowHeight
        })
      },
    })
  },
  // {} ==> []
  change(){
    let listing = this.data.listing, cartList = [];
    for (let k in listing) {
      cartList.push({ info: listing[k].info, total: listing[k]._price, num: listing[k].num})
    }
    this.setData({
      cartList: cartList
    })
  },
  // 切换导航栏
  switchTab(e) {
    let index = e.currentTarget.dataset.index, translateX = this.data.translateX;
    this.setData({
      move: index * translateX,
      currentIndex: index,
      current: index
    });

  },
  // 切换主体
  swiperChange(e) {
    let translateX = this.data.translateX;
    this.setData({
      move: e.detail.current * translateX,
      currentIndex: e.detail.current
    })
  },
  // 锚点
  scrollTo(e) {
    let index = e.currentTarget.dataset.index,
      id = 'scroll' + index;
    this.setData({
      scrollToView: id,
      currentMenu: index
    })
  },
  // 计算商品数量
  countNum(e){
    let val = e.detail.num,price = e.detail.price,
        quantity = this.data.quantity, 
        prod = e.detail.prod,
        _type = e.detail.type,
        total = this.data.total,
        listing = this.data.listing;
    if(_type === 'add'){
      quantity += 1;
      total = total + price;
      listing[prod.id] = { num: val, info: prod, _price: val * price}
    } else {
      quantity = quantity - 1;
      if (val===0){
        delete listing[prod.id]
      } else {
        listing[prod.id] = { num: val, info: prod, _price: val * price }
      }
      total = total - price;
    }
    this.setData({
      quantity: quantity,
      total:total
    })
    this.change();
    
    if(JSON.stringify(this.data.listing)=='{}'){
      this.setData({
        cartModal:false
      })
    }
  },
  // 提交
  submit(){
    if(this.data.total<this.data.store.qsprice){
      return false;
    }
    app.globalData.payOrder = {
      listing: this.data.listing,
      store:this.data.store
    }
    wx.navigateTo({
      url: '../order/submit/submit'
    })
  },
  // 关闭弹窗
  closeModal(){
    this.setData({
      modal:false
    })
  },
  // 点击查看评论
  clickScore(e){
    let index = e.currentTarget.dataset.index;
    this.setData({
      currentItem:index
    })
  }
})