var app = getApp();
const util = require('../../util.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        //用户扩展的优惠券的图片，功能未添加
        couponList: null,
        payRequestCoupon: false,

        balance: 0,
        moneyToPay: 0,
        orderTime: null,
    },
    onLoad: function (e) {
        
        var couponList = [
            { imgUri: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg' },
            { imgUri: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg' },
            { imgUri: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg' },
        ];
        this.setData({
            couponList: couponList,
            payRequestCoupon: app.globalData.payRequestCoupon,
            balance: app.globalData.balance,
            moneyToPay: e.moneyToPay,
        })

    },
    //创建订单
    createOrder: function() {
        // 发送订单
        var recipeSelected = app.globalData.recipeSelected;
        //格林威治时间改成北京时间
        var orderTime = util.formatTime(new Date());
        
        this.setData({
            orderTime: orderTime,
        })
        var foods = [];
        for (var index in recipeSelected.recipeFoodID) {
            var food = {
                "food_id": recipeSelected.recipeFoodID[index],
                "name": recipeSelected.recipeDetail[index],
                "description": recipeSelected.recipeFoodDescription[index],
                "price": recipeSelected.recipeMoney[index],
                "merchant_id": app.globalData.merchant_id,
                "amount": recipeSelected.recipeCount[index],
                'icon_url':recipeSelected.recipeFoodImgUri[index].substr(30)
            };

            foods.push(food);
        }
      
        var that = this;
        // 实现同步发送订单
        return new Promise(function (resolve, reject) {
            wx.request({
                url: 'https://www.sysu-easyorder.top/orders',
                data: {
                    "order_id": null,
                    "status": 0,
                    "seat_id": app.globalData.seat_id,
                    "customer_id": app.globalData.customer_id,
                    "merchant_id": app.globalData.merchant_id,
                    "order_time": orderTime,
                    "complete_time": orderTime,
                    "foods": foods
                },
                method: 'POST',
                header: {
                    'content-type': 'application/json' // 默认值
                },
                success: function (res) {
             
                    app.globalData.balance -= that.data.moneyToPay;
                    //历史订单要添加
                    var tracker = app.globalData.recipeSelected;
                    tracker['orderTime'] = that.data.orderTime;
                    app.globalData.expenseTracker.push(tracker);
                    app.globalData.recipeSelected = {
                        recipeFoodImgUri: [],
                        recipeDetail: [],
                        recipeMoney: [],
                        recipeCount: [],
                        recipeFoodID: [],
                        recipeFoodDescription: [],
                        moneyToPay: 0,
                        seat_id: 0,
                    };
                    app.globalData.isPaying = false;
                    resolve(app.globalData.balance);
                },
                fail: function (res) {
                    reject('error')
                }
            })
        })

    },
    //充值函数
    updateBalance: function(res){
        return new Promise(function (resolve, reject) {
            wx.request({
                url: 'https://www.sysu-easyorder.top/customers/' + app.globalData.customer_id,
                data: {
                    "customer_id": app.globalData.customer_id,
                    "wechat_id": app.globalData.wechat_id,
                    "balance": res
                },
                method: 'PUT',
                success: function (res) {
                    console.log("balance success");
                },
                fail: function (res) {
                    console.log("balance fail ")
                }
            })
        })
        
    },
    //确认支付函数
    confirmButtonTap: function () {
        var that = this;
        //金额对比
        if (this.data.moneyToPay > this.data.balance) {
            wx.showToast({
                title: '余额不足',
                image: './../../image/warning.png',
                duration: 1000,
                mask: true
            });
        }
        else {
            wx.showToast({
                title: '支付成功',
                icon: 'success',
                duration: 1000,
                mask: true
            });
            //金额足够就创建订单，扣除对应的钱
            that.createOrder().then(function(res) {
                that.updateBalance(res);
            })
        }
        //2秒后自动切回个人信息页面
        setTimeout(function () {
            wx.switchTab({
                url: './../user/user',
            })
        }, 2000);
    }

})