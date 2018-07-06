var app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        seat_id: 0,

        recipeSelected: {
            recipeFoodImgUri: [],
            recipeDetail: [],
            recipeMoney: [],
            recipeCount: [],
            recipeFoodID: [],
            recipeFoodDescription: [],
            moneyToPay: 0,
            seat_id: 0,
        },
    },
    onLoad: function(e) {
        this.setData({
            seat_id: app.globalData.seat_id
        })
    },
    onShow: function () {
        this.setData({
            recipeSelected: app.globalData.recipeSelected,
        })
        
    },
    //隐藏页面的时候要更新选好的菜的数据
    onHide: function (e) {
        app.globalData.recipeSelected = this.data.recipeSelected;
    },
    //减少菜的时候要home页面的数据保持一致
    minusIconTap: function (e) {
        var recipeSelected = this.data.recipeSelected;
        var index = e.currentTarget.dataset.id;

        recipeSelected.moneyToPay -= recipeSelected.recipeMoney[index];
        recipeSelected.recipeCount[index] -= 1;
        //数量为0删除菜品
        if (recipeSelected.recipeCount[index] == 0) {
            recipeSelected.recipeFoodImgUri.splice(index, 1);
            recipeSelected.recipeDetail.splice(index, 1);
            recipeSelected.recipeMoney.splice(index, 1);
            recipeSelected.recipeCount.splice(index, 1);
            recipeSelected.recipeFoodID.splice(index, 1);
            recipeSelected.recipeFoodDescription.splice(index, 1);
        }
        this.setData({
            recipeSelected: recipeSelected,
        });
    },
    //确认支付
    confirmButtonTap: function (e) {
        //存在菜的时候才能跳转
        if (app.globalData.isPaying && this.data.recipeSelected.moneyToPay > 0) {
            wx.navigateTo({
                url: './../coupon/coupon?&moneyToPay=' + this.data.recipeSelected.moneyToPay,
            });
            app.globalData.payRequestCoupon = true;
        }
    },

})