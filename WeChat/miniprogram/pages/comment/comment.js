// pages/momment/moment.js
const db = wx.cloud.database({
  env:"web-test-01-tinqb"
})
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: {},
    movieid: 0,
    content: "",  //评论的初始值
    score: 0,     //初始化评分
    images: []  ,  //保存用户选择的图片
    fileIds:[]
  },
  submit() {
    //1.上传9张图片
    wx.showLoading({
      title: '评论中',
    });
    //console.log(this.data.content+"_"+this.data.score)
    //2.上传图片到云存储
    //3.创建promise数组
    let promiseArr = []
    //4.创建循环9次
    for (let i = 0; i < this.data.images.length; i++) {
      //5.创建promise  push数组中
      promiseArr.push(new Promise((reslove, reject) => {
        //5.1获取当前上传图片
        var item = this.data.images[i];
        //5.2创建正则表达式拆分文件后缀.png .jpg
        let suffix = /\.\w+$/.exec(item)[0]
        //5.3上传图片
        wx.cloud.uploadFile({
          cloudPath: new Date().getTime() + suffix,
          filePath: item,
          success: res => {
            console.log(res.fileID);
            //将当前文件id保存到data
            var ids = this.data.fileIds.concat(res.fileId);
            this.setData({
              fileIds:ids
            })
            //5.4上传成功将当前云存储fileID保存数组

            //5.5追加任务列表、
            reslove();

          },
          fail: err => {
            //5.6失败显示出错信息
            consoel.log(err)
          }
        })
      }))
    }

    //.一次性将图片fileID保存在集合中【集合中一条记录】
    Promise.all(promiseArr).then(res=>{
      //6.1添加数据
      db.collection("comment").add({
        data:{
          content:this.data.content,
          score:this.data.score,
          movieid:this.data.movieid,
          fileIds:this.data.fileIds
        }
      }).then(res=>{
        wx.hideLoading();
        wx.showToast({
          title: '评价成功',
        })
      }).catch(err=>{
        wx.hideLoading();
        wx.showToast({
          title: '评论失败',
        })

      })
    })
  },

  uploadImg() {
    wx.chooseImage({
      count: 9,
      sizeType: ["original", "compressed"],
      source: ["album", "camera"],
      success: res => {
        const tempFiles = res.tempFilePaths;
        //预览：将用户选中的图片保存
        this.setData({
          images: tempFiles
        })

      }
    })
  },
  onContentChange(e) {
    //console.log(e.detail)
    this.setData({
      content: e.detail
    })
  },
  onScoreChange(e) {
    //console.log(e.detail);
    this.setData({
      score: e.detail
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //1.接收电影列表传递的参数id并且保存到data中、
    console.log(options.id);
    this.setData({
      movieid: options.id
    });
    //2.提示一个数据加载的框
    wx.showLoading({
      title: '加载中',
    })
    //3.调用云函数，将电影的id传递给云函数
    wx.cloud.callFunction({
      name: "getDetail",
      data: { movieid: options.id }
    }).then(res => {
      //4.获取云函数返回的数据并且保存到data中

      //4.1将字符串转为js obj
      var obj = JSON.parse(res.result);
      //4.2保存data
      this.setData({
        detail: obj
      })
      console.log(this.data.detail);
      //5.隐藏加载框
      wx.hideLoading();
    }).catch(err => {
      wx.hideLoading();
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