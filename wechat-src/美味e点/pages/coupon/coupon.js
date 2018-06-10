var app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        couponList: null,
        payRequestCoupon: false,
        balance: 0,
        moneyToPay: 0,
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
    confirmButtonTap: function () {

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
            // 发送订单
            var recipeSelected = app.globalData.recipeSelected;
            var foods = [];
            var food = {
                "food_id": 1,
                "name": "那碗粉",
                "description": "那碗粉。。。",
                "price": "9.99",
                "merchant_id": app.globalData.merchant_id,
                "amount": 2
            };
            for (var index in recipeSelected) {
                var food = {
                    "food_id": recipeSelected.recipeFoodID[index],
                    "name": recipeSelected.recipeDetail[index],
                    "description": recipeSelected.recipeFoodDescription[index],
                    "price": recipeSelected.recipeMoney[index],
                    "merchant_id": app.globalData.merchant_id,
                    "amount": recipeSelected.recipeCount[index]
                };
                foods.push(food);
            }
            wx.request({
                url: 'https://www.sysu-easyorder.top/orders',
                data: {
                    "order_id": null,
                    "status": 0,
                    "seat_id": app.globalData.seat_id,
                    "customer_id": 1,
                    "merchant_id": app.globalData.merchant_id,
                    "order_time": "2018-01-01T12:00:00+08:00",
                    "complete_time": "2018-01-02T12:00:00+08:00",
                    "foods": foods
                },
                method: 'POST',
                header: {
                    'content-type': 'application/json' // 默认值
                },
                success: function (res) {
                    console.log("发送完成");
                }
            })

            app.globalData.balance -= this.data.moneyToPay;

            app.globalData.expenseTracker.push(app.globalData.recipeSelected);
            app.globalData.recipeSelected = {
                recipeFoodImgUri: [],
                recipeDetail: [],
                recipeMoney: [],
                recipeCount: [],
                recipeFoodID: [],
                recipeFoodDescription: [],
                moneyToPay: 0,
            };

            app.globalData.isPaying = false;
        }
        setTimeout(function () {
            wx.switchTab({
                url: './../user/user',
            })
        }, 2000);
    }

})