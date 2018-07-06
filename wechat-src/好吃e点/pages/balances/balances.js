var app = getApp()
// pages/balances/balances.js
Page({
    data: {
        balance: 0,
        recharge_input: "",
        hiddenmodalput: true,
    },
    onLoad: function (options) {
        this.setData({
            balance: app.globalData.balance,
        })
    },

    balancesinput: function (e) {
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
            app.globalData.balance = app.globalData.balance + parseInt(this.data.recharge_input);
            this.setData({
                balance: app.globalData.balance,
                recharge_input: "",
                hiddenmodalput: true,
            });
            wx.showToast({
              title: '充值成功',
              icon: 'success',
              duration: 1000,
              mask: true
            });
            wx.request({
                url: 'https://www.sysu-easyorder.top/customers/' + app.globalData.customer_id,
                data:{
                    "customer_id": app.globalData.customer_id,
                    "wechat_id": app.globalData.wechat_id,
                    "balance": app.globalData.balance
                },
                method: 'PUT',
                success: function(res) {
                    console.log("balance success");
                },
                fail: function(res) {
                    console.log("balance fail ")
                }
            })
            setTimeout(function () {
                wx.navigateBack({
                    url: './../user/user',
                })
            }, 2000);

        }
        else {
            this.setData({
                recharge_input: "",
                hiddenmodalput: true,
            });

            wx.showToast({
              title: '请输入有效数字',
              image: './../../image/warning.png',
              duration: 1000,
              mask: true
            });
        }
    },



})