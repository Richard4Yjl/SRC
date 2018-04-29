var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    deskID: 10,
    moneyToPay: 0,
    recipeFoodImgUri:[], 
    recipeDetail:[], 
    recipeMoney:[],
    recipeCount: [],
  },
  onLoad: function(){
      var moneyToPay = 0;
      for (var index in app.globalData.recipeSelected.recipeMoney) {
          moneyToPay += app.globalData.recipeSelected.recipeMoney[index];
      }
      this.setData({
          recipeFoodImgUri: app.globalData.recipeSelected.recipeFoodImgUri,
          recipeDetail: app.globalData.recipeSelected.recipeDetail,
          recipeMoney: app.globalData.recipeSelected.recipeMoney,
          recipeCount: app.globalData.recipeSelected.recipeCount,
          moneyToPay: moneyToPay,
      })
  }
 
})