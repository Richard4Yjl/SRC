//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        id: null,
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        orderList: [],
        balance: 0,
    },
    onLoad: function () {
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true,
                id: 10086,
                balance: app.globalData.balance,
            })
        } else if (this.data.canIUse) {
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true,
                    id: 10086,
                    balance: app.globalData.balance,
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
                        id: 10086,
                        balance: app.globalData.balance,
                    })
                }
            })
        }
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
            detail = detail.slice(0, detail.length-3);
            var orderListItem = {
                recipeDetail: detail,
                recipeTime: "2018/5/1  12:00",
            }
            orderList.push(orderListItem);
        }
        this.setData({
            orderList: orderList
        })
    },
    getUserInfo: function (e) {
        console.log(e)
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
    },
    orderListItemTap: function(e) {
        var index = e.currentTarget.dataset.id;
        var recipeSelected = app.globalData.expenseTracker[index];
        wx.navigateTo({
            url: './../paid/paid?selectedIndex=' + index,
        })
    },
    balances: function(e) {
        wx.navigateTo({
          url: '../balances/balances',
        })
    }
})
