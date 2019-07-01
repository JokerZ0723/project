// pages/xzmap/xzmap.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    polyline:[{
      points:[
        { longitude:116.300901, latitude:39.916085}, { longitude:116.316696, latitude:39.913509}
      ],
      color:"#FF00DD",
      width:10,
      dottedLine:true
    }],
    markers:[{
      iconPath:"/images/movie.png",
      id:0,
      longitude: 116.300901, 
      latitude: 39.916085,
      width:30,
      height:30
    }],
    controls:[{
      id:1,
      iconPath:"/images/user.png",
      position:{
        left:0,
        top:300-50,
        width:50,
        height:50
      }
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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