const wxRegister = (obj)=>{
  wx.request({
    url: 'http://127.0.0.1:8888/register',
    method: 'POST',
    data: {
      openid: obj.openid,
      username: obj.username
    },success(){
      wx.hideLoading()
    }
  })
}

module.exports = wxRegister