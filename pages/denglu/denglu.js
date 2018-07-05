Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:'',
    password:'',
    userInfo:''
  },
 


   gozhuce:function (options)
    {
          
        wx.navigateTo({
        url: '../zhuce/zhuce',
    })
    },   //注册BUTTON跳转
  /**
   * 生命周期函数--监听页面加载
   */
      onLoad: function (options) {
        
     var that = this
     //调用应用实例的方法获取全局数据
     app.getUserInfo(function (userInfo) {
       //更新数据
       that.setData({
         userInfo: userInfo
       })
     })
   },
      PhoneInput: function (e) {
        this.data.phone = e.detail.value;

      },  //获取输入账号
      PasswordInput: function (e) {
        this.data.password = e.detail.value;
      },//获取输入密码


      login: function () {
        //打印收入账号和密码
        console.log('账户: ', this.data.phone);
        console.log('密码: ', this.data.password);

        if (this.data.phone.length == 0 || this.data.password.length == 0) {
          wx.showToast({
            title: '用户名和密码不能为空',
            icon: 'none',
            duration: 2000
          })
        } else if (this.data.phone == "admin" && this.data.password == "admin") {
            
          wx.showToast({
            title: '登录成功',
            icon: 'success',
            duration: 2000,
            success: function () { 
              wx.navigateTo({
                url: '../index/index'// 跳转的页面
              })
            }
          })
        } else {
          wx.showToast({
            title: '登录失败',
            icon: 'none',
            duration: 2000
          })
        }
        //上传数据
        wx.request({
          url: 'http://10.14.4.133:8088/OPOT1/servlet/testServlet',   //服务器接口地址
          data: {
            tel:'phone',
            pass: 'password',
            userinfo:'userInfo'
            
          },
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8;',
           
          },
          success: function (res) {
            console.log(res.data.code)
        if(res.data.code=='1'){
         wx.navigateTo({
           url: '../index/index',
         })



        }
            
            
          },
          fail: function () {
            console.log('服务器请求失败!')
          },
      
      
        })
      },



  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})