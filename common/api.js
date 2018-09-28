const config = require('../config/config.js');
export default class Api {
  constructor(args){
    this.args = {
      showLoading:true
    }
  }
  get(api,params={}){
    return new Promise((resolve,reject)=>{
      this._request(api, resolve,reject,params);
    });
  }

  post(api,params={}){
    return new Promise((resolve, reject) => {
      this._request(api, resolve, reject, params,'POST');
    })
  }
  _request(api,resolve,reject,params={},method='GET'){
    if(this.args.showLoading){
      wx.showLoading({
        title: '请稍候'
      });
    }
    wx.request({
      url: config.default.debugApi + api,
      data:params,
      method:method,
      header: {
        'content-type': method == 'POST' ? 'application/x-www-form-urlencoded' : 'application/json'
      },
      success(res){
        resolve(res.data.retObj)
      },
      fail(){
        reject()
      },
      complete() {
        wx.hideLoading();
      }
    })
  }
}