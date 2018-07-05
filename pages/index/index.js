Page({
  data: {
    tempFilePaths: ''
  },
  onLoad: function () {
    var status = wx.getStorageSync('status')
    var usertype = wx.getStorageSync('usertype')
    // console.log(usertype)  
    if (!status && !usertype) {
      wx.navigateTo({
        url: '/pages/denglu/denglu?lineid=' + lineid
      })
    } else if (status == false && usertype == 1) {
      wx.navigateTo({
        url: '/pages/denglu/denglu?lineid=' + lineid
      })
    }  
  },
  chooseimage: function () {
    var that = this;
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#CED63A",
      success: function (res) {
        if (!res.cancel) {  
          if (res.tapIndex == 0) {
            that.chooseWxImage('album')
          } else if (res.tapIndex == 1) {
            that.chooseWxImage('camera')
          }
        }
      }
    })

  },
goresult:function(event)
{ 

  wx.navigateTo({
    url: '../result/result',
  })


},
  
 //上传图片
  

  chooseWxImage: function (type) {
    
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      success: function (res) {
        var tempFilePaths=res.tempFilePaths[0];               
       that.setData({
          tempFilePaths: res.tempFilePaths[0],//回传数据
        })
        console.log(res.tempFilePaths)
        wx.setStorage({
          key: 'card',
          data: 'tempFilePaths[0]',
        })
      }

    })
   
  },
        uploadimage: function (e){
   var that=this;
   var card = wx.getStorageSync('card');
   wx.uploadFile({
     url: '',//服务器地址
     filePath: 'card',
     name: 'card',
     header: {
       'content-type': 'multipart/form-data'
     },
     success:function(res){
       console.log('返回搜索结果'+res.data.result)
       console.log('返回图片'+res.data.image)
       wx.setStorage({
         key: 'image',
         data: 'res.data.image',
       })
       wx.setStorage({
         key: 'result',
         data: 'res.data.result',
       })

     },
   })

        },

 
  

}) 