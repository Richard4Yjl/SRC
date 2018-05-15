var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        deskID: 0,
        recipeSelected: [],
    },
    onLoad: function (e) {
        var index = e.selectedIndex;

        this.setData({
            deskID: app.globalData.deskID,
            recipeSelected: app.globalData.expenseTracker[index]
        })
    }

})