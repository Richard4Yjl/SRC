var app = getApp()
// pages/balances/balances.js
Page({
  data: {
      balance: 0,
      recharge_input: "",
      recharge_result: "",
      hiddenmodalput: true,
  },
  onLoad: function (options) {
    this.setData({
        balance: app.globalData.balance,
    })
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
  


})