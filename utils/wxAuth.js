// 判断授权

const wxAuth =  (resolve, reject) =>{
  wx.getSetting({
    success(res) {
      if (!res.authSetting['scope.userInfo']) {
        // 弹框引导用户授权
        reject()
      } else {
        // 已授权
        resolve(res);
      }
    }
  })
} 

module.exports = wxAuth