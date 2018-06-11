var app = getApp();
Page({
    data: {
        imgUrls: [
            'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
            'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
            'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
        ],
        indicatorDots: true,
        autoplay: true,
        interval: 3000,
        duration: 1000,
        kindSelected: 0,

        recipeKind: [
            "肉类", "蔬菜", "小吃", "饮料", "其他"
        ],

        recipeFoodImgUri: [],
        recipeDetail: [],
        recipeMoney: [],
        recipeCount: [],
        recipeFoodID: [],
        recipeFoodDescription: [],
        isSearching: false,
        searchingRecipeFoodImgUri: [],
        searchingRecipeDetail: [],
        searchingRecipeMoney: [],
        searchingRecipeCount: [],
        searchedIndex: [],
        searchValue: "",
        recipeSelected: {
            recipeFoodImgUri: [],
            recipeDetail: [],
            recipeMoney: [],
            recipeCount: [],
            recipeFoodID: [],
            recipeFoodDescription: [],
            moneyToPay: 0,
        },
    },
    onLoad:function(e) {
        wx.scanCode({
            onlyFromCamera: true,
            success: (res) => {
                var result = res.result;
                app.globalData.merchant_id = JSON.parse(result)["merchant_id"];
                app.globalData.seat_id = JSON.parse(result)["seat_id"];
                app.globalData.number = JSON.parse(result)["number"];
            },
            fail: (res)=> {

            },
            complete: (res) => {

            }
        })
        var that = this;
        wx.request({
            url: 'https://www.sysu-easyorder.top/foods?merchant_id='+app.globalData.merchant_id, 
            data: {
                x: '',
                y: ''
            },
            header: {
                'content-type': 'application/json' // 默认值
            },
            success: function (res) {
                console.log(res.data.data)
                var data = res.data.data;
                var recipeDetail = [];
                var recipeMoney = [];
                var recipeFoodImgUri = [];
                var recipeCount = [];
                var recipeFoodID = [];
                var recipeFoodDescription = [];
                for (var index in data) {
                    recipeDetail.push(data[index]['name']);
                    recipeMoney.push(data[index]['price']);
                    recipeFoodImgUri.push('../../image/food.png');
                    recipeCount.push(0);
                    recipeFoodID.push(data[index]['food_id']);
                    recipeFoodDescription.push(data[index]['description']);
                }
                
                that.setData({
                    recipeDetail: recipeDetail,
                    recipeMoney: recipeMoney,
                    recipeFoodImgUri: recipeFoodImgUri,
                    recipeCount: recipeCount,
                    recipeFoodID: recipeFoodID,
                    recipeFoodDescription: recipeFoodDescription
                })
            }
        })
        
    },
    onShow: function () {
        if (app.globalData.isPaying) {
            this.setData({
                recipeSelected: app.globalData.recipeSelected,
            });
            
            var recipeSelected = this.data.recipeSelected;
            var recipeDetail = this.data.recipeDetail;
            var recipeCount = this.data.recipeCount;
            var recipeFoodID = this.data.recipeFoodID;
            var recipeFoodDescription = this.data.recipeFoodDescription;

            for (var index in recipeCount) {
                recipeCount[index] = 0;
            }
            this.setData({
                recipeCount: recipeCount,
            })
            for (var index in recipeSelected.recipeDetail) {
                var i = recipeDetail.indexOf(recipeSelected.recipeDetail[index]);
                recipeCount[i] = recipeSelected.recipeCount[index];
            }
            this.setData({
                recipeCount: recipeCount
            })
        }
        else {
            var recipeCount = this.data.recipeCount;
            for (var index in recipeCount) {
                recipeCount[index] = 0;
            }
            this.setData({
                recipeCount: recipeCount,
            })
        }
    },
    //已作废，突然说不要分类和搜索了
    /*
    recipeKindTap: function (e) {

        this.setData({
            kindSelected: -1
        });
        //数据库返回别的菜谱
        var recipeFoodImgUri = [
            '../../image/food.png',
            '../../image/food.png',
            '../../image/food.png',
        ];
        var recipeDetail = [
            "湛江烤番薯4", "湛江烤番薯5", "湛江烤番薯6",
        ];
        var recipeCount = [
            0, 0, 0,
        ];
        this.setData({
            kindSelected: e.currentTarget.dataset.id,
            recipeFoodImgUri: recipeFoodImgUri,
            recipeDetail: recipeDetail,
            recipeCount: recipeCount,
        });

    },
    
    searchInput: function (e) {
        this.setData({
            searchValue: e.detail.value
        });
    },
    searchIconTap: function (e) {
        var recipeFoodImgUri = [];
        var recipeDetail = [];
        var recipeMoney = [];
        var recipeCount = [];
        var searchedIndex = [];
        if (this.data.searchValue == "") {
            this.setData({
                isSearching: false
            });
            searchedIndex = this.data.searchedIndex;
            recipeCount = this.data.recipeCount;
            for (var i in searchedIndex) {
                recipeCount[searchedIndex[i]] = this.data.searchingRecipeCount[i];
            }
            this.setData({
                recipeCount: recipeCount
            });
        }
        else {
            this.setData({
                isSearching: true
            });
            for (var index in this.data.recipeDetail) {
                if (this.data.recipeDetail[index].indexOf(this.data.searchValue) >= 0) {
                    recipeFoodImgUri.push(this.data.recipeFoodImgUri[index]);
                    recipeDetail.push(this.data.recipeDetail[index]);
                    recipeMoney.push(this.data.recipeMoney[index]);
                    recipeCount.push(this.data.recipeCount[index]);
                    searchedIndex.push(index);
                }
            }
            this.setData({
                searchingRecipeFoodImgUri: recipeFoodImgUri,
                searchingRecipeDetail: recipeDetail,
                searchingRecipeMoney: recipeMoney,
                searchingRecipeCount: recipeCount,
                searchedIndex: searchedIndex,
            });

        }
    },
    */
    //缺少在搜索页面之后点击的实现
    addIconTap: function (e) {
        var index = e.currentTarget.dataset.id; //在列表中的下标
        if (!this.data.isSearching) {
            var recipeCount = this.data.recipeCount;
            var recipeFoodImgUri = this.data.recipeFoodImgUri;
            var recipeDetail = this.data.recipeDetail;
            var recipeMoney = this.data.recipeMoney;
            var recipeSelected = this.data.recipeSelected;
            var recipeFoodID = this.data.recipeFoodID;
            var recipeFoodDescription = this.data.recipeFoodDescription;
            recipeCount[index] += 1;
            if (recipeCount[index] >= 10) {
                //提示最大点10份
                recipeCount[index] = 10;
            }
            this.setData({
                recipeCount: recipeCount
            })

            var i = recipeSelected.recipeDetail.indexOf(recipeDetail[index]);//selected中的下标
            if (i < 0) {
                recipeSelected.recipeFoodImgUri.push(recipeFoodImgUri[index]);
                recipeSelected.recipeDetail.push(recipeDetail[index]);
                recipeSelected.recipeMoney.push(recipeMoney[index]);
                recipeSelected.recipeCount.push(recipeCount[index]);
                recipeSelected.recipeFoodID.push(recipeFoodID[index]);
                recipeSelected.recipeFoodDescription.push(recipeFoodDescription[index]);
                recipeSelected.moneyToPay += recipeMoney[index];
            }
            else {
                recipeSelected.recipeCount[i] += 1;
                recipeSelected.moneyToPay += recipeSelected.recipeMoney[i];
            }

            this.setData({
                recipeSelected: recipeSelected
            })
        }
        else {
            var recipeCount = this.data.recipeCount;
            var recipeFoodImgUri = this.data.recipeFoodImgUri;
            var recipeDetail = this.data.recipeDetail;
            var recipeMoney = this.data.recipeMoney;
            var recipeSelected = this.data.recipeSelected;
            var recipeFoodID = this.data.recipeFoodID;
            var recipeFoodDescription = this.data.recipeFoodDescription;
            recipeCount[index] += 1;
            if (recipeCount[index] >= 10) {
                //提示最大点10份
                recipeCount[index] = 10;
            }
            this.setData({
                searchingRecipeCount: recipeCount
            })
            var i = recipeSelected.recipeDetail.indexOf(recipeDetail[index]);
            if (i < 0) {
                recipeSelected.recipeFoodImgUri.push(recipeFoodImgUri[index]);
                recipeSelected.recipeDetail.push(recipeDetail[index]);
                recipeSelected.recipeMoney.push(recipeMoney[index]);
                recipeSelected.recipeCount.push(recipeCount[index]);
                recipeSelected.recipeFoodID.push(recipeFoodID[index]);
                recipeSelected.recipeFoodDescription.push(recipeFoodDescription[index]);
                recipeSelected.moneyToPay += recipeMoney[index];
            }
            else {
                recipeSelected.recipeCount[i] += 1;
                recipeSelected.moneyToPay += recipeSelected.recipeMoney[i];
            }
            this.setData({
                recipeSelected: recipeSelected
            })
        }
    },
    subtractIconTap: function (e) {
        var index = e.currentTarget.dataset.id;
        if (!this.data.isSearching) {
            var recipeCount = this.data.recipeCount;
            var recipeFoodImgUri = this.data.recipeFoodImgUri;
            var recipeDetail = this.data.recipeDetail;
            var recipeMoney = this.data.recipeMoney;
            var recipeFoodID = this.data.recipeFoodID;
            var recipeFoodDescription = this.data.recipeFoodDescription;
            var recipeSelected = this.data.recipeSelected;
            recipeCount[index] -= 1;
            if (recipeCount[index] <= 0) {
                //提示最大点10份
                recipeCount[index] = 0;
            }
            this.setData({
                recipeCount: recipeCount
            })
            var i = recipeSelected.recipeDetail.indexOf(recipeDetail[index]);
            if (i >= 0) {
                recipeSelected.recipeCount[i] -= 1;
                if (recipeSelected.recipeCount[i] == 0) {
                    recipeSelected.recipeFoodImgUri.splice(i, 1);
                    recipeSelected.recipeDetail.splice(i, 1);
                    recipeSelected.recipeMoney.splice(i, 1);
                    recipeSelected.recipeCount.splice(i, 1);
                    recipeSelected.recipeFoodID.splice(i, 1);
                    recipeSelected.recipeFoodDescription.splice(i, 1);
                }
                recipeSelected.moneyToPay -= recipeMoney[index];
            }
            this.setData({
                recipeSelected: recipeSelected
            })
        }
        else {
            var recipeCount = this.data.recipeCount;
            var recipeFoodImgUri = this.data.recipeFoodImgUri;
            var recipeDetail = this.data.recipeDetail;
            var recipeMoney = this.data.recipeMoney;
            var recipeFoodID = this.data.recipeFoodID;
            var recipeFoodDescription = this.data.recipeFoodDescription;
            var recipeSelected = this.data.recipeSelected;
            recipeCount[index] -= 1;
            if (recipeCount[index] <= 0) {
                //提示最大点10份
                recipeCount[index] = 0;
            }
            this.setData({
                searchingRecipeCount: recipeCount
            })
            var i = recipeSelected.recipeDetail.indexOf(recipeDetail[index]);
            if (i >= 0) {
                recipeSelected.recipeCount[i] -= 1;
                if (recipeSelected.recipeCount[i] == 0) {
                    recipeSelected.recipeFoodImgUri.splice(i, 1);
                    recipeSelected.recipeDetail.splice(i, 1);
                    recipeSelected.recipeMoney.splice(i, 1);
                    recipeSelected.recipeCount.splice(i, 1);
                    recipeSelected.recipeFoodID.splice(i, 1);
                    recipeSelected.recipeFoodDescription.splice(i, 1);
                }
                recipeSelected.moneyToPay -= recipeMoney[index];
            }
            this.setData({
                recipeSelected: recipeSelected
            })
        }
    },
    onHide: function (e) {
        app.globalData.recipeSelected = this.data.recipeSelected;
        console.log(this.data.recipeSelected);
        var recipeSelected = {
            recipeFoodImgUri: [],
            recipeDetail: [],
            recipeMoney: [],
            recipeCount: [],
            recipeFoodID: [],
            recipeFoodDescription: [],
            moneyToPay: 0,
        };
        this.setData({
            recipeSelected: recipeSelected,
        })
    }
})