var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        seat_id: 0,
        recipeSelected: [],
    },
    onLoad: function (e) {
        var index = e.selectedIndex;

        this.setData({
            seat_id: app.globalData.expenseTracker[index].seat_id,
            recipeSelected: app.globalData.expenseTracker[index]
        })
    }

})