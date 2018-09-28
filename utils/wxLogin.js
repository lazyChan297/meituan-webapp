const wxRegister = require('./wxRegister.js');
const appid = 'wx702c56643c3f0a0b';
const secret = 'bfc0a56497cf2379cf343c652732f6d5';

const wxLogin = (cb) => {
  let _this = this;
  wx.login({
    success: function (res) {
      wx.request({
        url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appid + '&secret=' + secret + '&js_code=' + res.code + '&grant_type=authorization_code',
        method: 'GET',
        success(result) {
          wx.request({
            url: 'http://127.0.0.1:8888/login',
            data: {
              openid: result.data.openid
            },
            success(r) {
              wx.showLoading({
                title: '获取用户数据',
                mask:true
              })
              /*获取用户信息*/
              wx.getUserInfo({
                success(user_res) {
                  
                  if (!r.data.retObj.userInfo) {
                    //  用户未注册
                    wxRegister({
                      openid: result.data.openid,
                      username: user_res.userInfo.nickName
                    })
                  }
                  // 将用户信息保存到全局变量
                  const data = {
                    id: r.data.retObj.userInfo.openid,
                    username: user_res.userInfo.nickName,
                    avatarUrl: user_res.userInfo.avatarUrl
                  }
                  wx.hideLoading()
                  cb && cb(data)
                }
              })
            }
          })
        }
      })
    }
  })
}

module.exports = wxLogin