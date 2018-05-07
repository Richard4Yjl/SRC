var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    deskID: 10,
    
    recipeSelected: {
        recipeFoodImgUri: [],
        recipeDetail: [],
        recipeMoney: [],
        recipeCount: [],
        moneyToPay: 0,
    },
  },
  onShow: function(){
      this.setData({
          recipeSelected: app.globalData.recipeSelected,

      })
  },
  onHide: function (e) {
      app.globalData.recipeSelected = this.data.recipeSelected;
      console.log(app.globalData.recipeSelected);
  },
  minusIconTap: function(e){
      var recipeSelected = this.data.recipeSelected;
      var index = e.currentTarget.dataset.id;
      console.log(index);
      recipeSelected.moneyToPay -= recipeSelected.recipeMoney[index];
      recipeSelected.recipeCount[index] -= 1;
      if (recipeSelected.recipeCount[index] == 0) {
          recipeSelected.recipeFoodImgUri.splice(index, 1);
          recipeSelected.recipeDetail.splice(index, 1);
          recipeSelected.recipeMoney.splice(index, 1);
          recipeSelected.recipeCount.splice(index, 1);
      }
      this.setData({
        recipeSelected: recipeSelected,
      });
  }
 
})