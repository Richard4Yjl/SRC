var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    deskID: 10,
    recipeSelected:[],
  },
    onLoad: function(e) {
        var index = e.selectedIndex;

        this.setData({
            recipeSelected: app.globalData.expenseTracker[index]
        })
    }
 
})