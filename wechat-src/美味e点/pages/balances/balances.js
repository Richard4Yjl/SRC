var app = getApp()
// pages/balances/balances.js
Page({
  data: {
      balance: 100,
      recharge_input: "",
      recharge_result: "",
      hiddenmodalput: true,
  },

  balancesinput: function(e) {
      this.setData({
          recharge_input: e.detail.value
      });
  },

  modalinput: function () {
      this.setData({
          hiddenmodalput: !this.data.hiddenmodalput
      });
  },
  //取消按钮  
  cancel: function () {
      this.setData({
          hiddenmodalput: true
      });
  },
  //确认  
  confirm: function () {
      var regNum = new RegExp('[0-9]', 'g');
      var rsNum = regNum.exec(this.data.recharge_input);
      
      if (rsNum) {
        var temp_money = parseInt(this.data.recharge_input);
        var new_balance = this.data.balance + temp_money;
          this.setData({
            recharge_result: "充值成功",
            recharge_input: "",
            balance: new_balance,
            hiddenmodalput: true,
          });
      } else {
          this.setData({
            recharge_result: "请输入有效数字",
            recharge_input: "",
            hiddenmodalput: true,
          });
      }
  },  
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