// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pics: []
  },
  detail:function(e){
    //获取电影id
    var id=e.target.dataset.movieid;
    wx.navigateTo({
      //关闭并并跳转
      url: '/pages/comment/comment?id='+id,
    })
  },
  loadMore:function(){
    //1.调用云函数
    wx.cloud.callFunction({
      name: "movielist",//云函数名称
      data: {
        start: this.data.pics.length,
        count: 3
      },
    }).then(res => {
      var result = JSON.parse(res.result);
      var endResult = result.subjects;
      console.log(endResult);
      this.setData({
        pics: this.data.pics.concat(endResult)
      })
    }).catch(err => {
      console.log(err);
    })
    //2.将云函数返回电影列表保存

    //3.显示当前组件
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadMore();   
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
    this.loadMore();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    this.loadMore();
    }
})