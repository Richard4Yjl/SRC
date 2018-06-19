//index.js
//获取应用实例
const app = getApp()
const util = require('../../util.js');
Page({
    data: {
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        orderList: [],
        balance: 0,
    },
    getCustomer: function () {
        return new Promise(function (resolve, reject) {
            wx.request({
                url: 'https://www.sysu-easyorder.top/customers/' + app.globalData.customer_id,
                data: {

                },
                header: {
                    'content-type': 'application/json' // 默认值
                },
                success: function (res) {

                    if (res.statusCode == 200) {
                        app.globalData.wechat_id = res.data.data.wechat_id;
                        app.globalData.balance = res.data.data.balance;
                    }
                    else {
                        console.log("no user exist")
                    }
                    resolve(res.statusCode);

                },
                fail: function (res) {
                    reject('error');
                }
            })
        });

    },
    createCustomer: function () {

        var that = this;

        //create user
        return new Promise(function (resolve, reject) {
            wx.request({
                url: 'https://www.sysu-easyorder.top/customers',
                data: {
                    "customer_id": null,
                    "wechat_id": "asdf",
                    "balance": 0
                },
                method: 'POST',
                header: {
                    'content-type': 'application/json' // 默认值
                },
                success: function (res) {
                    console.log('create user');

                    app.globalData.customer_id = res.data.data.customer_id;
                    app.globalData.balance = res.data.data.balance;
                    app.globalData.wechat_id = res.data.data.wechat_id;

                    that.setData({
                        balance: app.globalData.balance
                    })
                    wx.setStorageSync("customer_id", app.globalData.customer_id);
                }
            })

        });

    },
    getOrderList: function (status) {
        var that = this;
        return new Promise(function (resolve, reject) {
            wx.request({
                url: 'https://www.sysu-easyorder.top/orders?customer_id=' + app.globalData.customer_id + '&status=' + status,
                success: function (res) {
                    if (status == 0) {
                        console.log(res);
                    }
                    var recipeSelecteds = res.data.data;

                    for (var index in recipeSelecteds) {
                        var recipeSelected = {
                            recipeFoodImgUri: [],
                            recipeDetail: [],
                            recipeMoney: [],
                            recipeCount: [],
                            recipeFoodID: [],
                            recipeFoodDescription: [],
                            moneyToPay: 0,
                            seat_id: 0,
                        };
                        for (var i in recipeSelecteds[index].foods) {
                            recipeSelected.recipeFoodImgUri.push('../../image/food.png');
                            recipeSelected.recipeDetail.push(recipeSelecteds[index].foods[i].name);
                            recipeSelected.recipeMoney.push(recipeSelecteds[index].foods[i].price);
                            recipeSelected.recipeCount.push(recipeSelecteds[index].foods[i].amount);
                            recipeSelected.recipeFoodID.push(recipeSelecteds[index].foods[i].food_id);
                            recipeSelected.recipeFoodDescription.push(recipeSelecteds[index].foods[i].description);
                            recipeSelected.moneyToPay += recipeSelecteds[index].foods[i].price * recipeSelecteds[index].foods[i].amount;
                            var year = parseInt(recipeSelecteds[index].order_time.substr(0, 4));
                            var month = parseInt(recipeSelecteds[index].order_time.substr(5, 2));
                            var day = parseInt(recipeSelecteds[index].order_time.substr(8, 2));
                            var hour = parseInt(recipeSelecteds[index].order_time.substr(11, 2));
                            var dateArrage = util.arrangeTime(year, month, day, hour);
                            year = dateArrage[0];
                            month = dateArrage[1];
                            day = dateArrage[2];
                            hour = dateArrage[3];
                            var time = "" + year + "-" + ((month < 10)?"0":"") + month + "-" + ((day < 10)?"0":"") + day + "T" + ((hour < 10)?"0":"") + hour + recipeSelecteds[index].order_time.substr(13);
                            recipeSelected['orderTime'] = time;
                        }
                        recipeSelected.seat_id = recipeSelecteds[index].seat_id;
                        app.globalData.expenseTracker.push(recipeSelected);
                    }
                    resolve(res);
                },
                fail: function (res) {
                    reject('error');
                }

            })
        });
    },
    onLoad: function () {
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true,
            })
        } else if (this.data.canIUse) {
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true,
                })
            }
        } else {
            // 在没有 open-type=getUserInfo 版本的兼容处理
            wx.getUserInfo({
                success: res => {
                    app.globalData.userInfo = res.userInfo
                    this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true,
                    })
                }
            })
        }

        var that = this;
        app.globalData.customer_id = wx.getStorageSync("customer_id");
        console.log("app.global.customer_id:")
        console.log(app.globalData.customer_id);
        that.getCustomer().then(function (res) {

            if (res != 200) {
                that.createCustomer();
            }
            else {
                that.getOrderList(1);
            }

        })


        wx.switchTab({
            url: '../home/home',
        })
    },
    onShow: function () {

        var expenseTracker = app.globalData.expenseTracker;
        var orderList = [];

        for (var index in expenseTracker) {
            var recipeSelected = expenseTracker[index];
            var detail = "";
            for (var i in recipeSelected.recipeDetail) {
                detail += recipeSelected.recipeDetail[i] + "  +  ";
            }
            detail = detail.slice(0, detail.length - 3);
            var recipeTime = recipeSelected.orderTime;
            var orderListItem = {
                recipeDetail: detail,
                recipeTime: recipeTime.substr(0, 10) + " " + recipeTime.substr(11, 5),
            }
            orderList.push(orderListItem);
        }
        this.setData({
            orderList: orderList,
            balance: app.globalData.balance,
        })
    },
    getUserInfo: function (e) {

        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
    },
    orderListItemTap: function (e) {
        var index = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: './../paid/paid?selectedIndex=' + index,
        })
    },
    balances: function (e) {
        wx.navigateTo({
            url: '../balances/balances',
        })
    }
})
