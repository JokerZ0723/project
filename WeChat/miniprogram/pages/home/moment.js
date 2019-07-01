// pages/momment/moment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail:{},
    movieid:0,
    content:"",  //评论的初始值
    score:3,     //初始化评分
    images:[]    //保存用户选择的图片
  },
  submit(){
    console.log(111)
  },
  uploadImg(){
    wx.chooseImage({
      count:9,
      sizeType:["original","compressed"],
      source:["album","camera"],
      success:res=>{
        const tempFiles=res.tempFilePaths;
        //预览：将用户选中的图片保存
        this.setData({
          images:tempFiles
        })

      }
    })
  },
  onContentChange(e){
    //console.log(e.detail)
    this.setData({
      content:e.detail
    })
  },
  onScoreChange(e){
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
      movieid:options.id
    });
    //2.提示一个数据加载的框
    wx.showLoading({
      title: '加载中',
    })
    //3.调用云函数，将电影的id传递给云函数
    wx.cloud.callFunction({
      name:"getDetail2",
      data:{movieid:options.id}
    }).then(res=>{
      //4.获取云函数返回的数据并且保存到data中
      
      //4.1将字符串转为js obj
      var obj=JSON.parse(res.result);
      //4.2保存data
      this.setData({
        detail:obj
      })
      console.log(this.data.detail);
      //5.隐藏加载框
      wx.hideLoading();
    }).catch(err=>{
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