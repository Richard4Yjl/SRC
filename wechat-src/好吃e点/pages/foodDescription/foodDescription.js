// pages/foodDescription.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        recipeItem: null
    },
    onLoad: function(e){
        this.setData({
            recipeItem: e.recipeItem.split(',')
        })
    },


})