//app.js
App({
  
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: function (res) {

        console.log(res)
        if (res.code) {
          //存在code
          wx.request({
            url: '',   //服务器接口地址
            data: {
               code  : res.code },
            method: 'POST',
            header: {
              "content-type": "application/x-www-form-urlencoded"
            },
            success: function (res) {
              that.globalData.userId = res.data.info
            },
            fail: function () {
              console.log('服务器请求失败!')
            },
          })
        } else {
          console.log('获取用户信息失败!' + res.errMsg)
        }
      }
    })
    wx.setStorageSync('status', false),
    wx.setStorageSync('usertype', 1), //新用户初始化缓存存入
      queryUser.get(currentUserId, {
        success: function (result) {
          var status = result.attributes.status;
          var usertype = result.attributes.usertype;
          wx.setStorageSync('status', status)
          wx.setStorageSync('usertype', usertype)
          console.log(status);
        },
        error: function (object, error) {
          console.log(result);
        },//老用户获取参数进行缓存存入
      });   
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },

 
  globalData: {
    tempFilePaths: '',
    userInfo: null
  }
})