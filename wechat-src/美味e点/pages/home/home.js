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

        recipeFoodImgUri: [
            '../../image/food.png',
            '../../image/food.png',
            '../../image/food.png',
        ],
        recipeDetail: [
            "湛江1烧耗", "湛江12烧耗", "湛江13烧耗",
        ],
        recipeCount: [
            0, 0, 0,
        ],
        isSearching: false,
        searchingRecipeFoodImgUri: [],
        searchingRecipeDetail: [],
        searchingRecipeCount: [],
        searchedIndex:[],
        searchValue: "",
    },
    onLoad: function () {

    },

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
        var recipeCount = [];
        var searchedIndex = [];
        if (this.data.searchValue == "") {
            this.setData({
                isSearching: false
            });
            searchedIndex = this.data.searchedIndex;
            recipeCount = this.data.recipeCount;
            for (var i in searchedIndex) {
                recipeCount[searchedIndex[i]] =  this.data.searchingRecipeCount[i];
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
                    recipeCount.push(this.data.recipeCount[index]);
                    searchedIndex.push(index);
                }
            }
            this.setData({
                searchingRecipeFoodImgUri: recipeFoodImgUri,
                searchingRecipeDetail: recipeDetail,
                searchingRecipeCount: recipeCount,
                searchedIndex: searchedIndex,
            });
           
        }
    },
    //缺少在搜索页面之后点击的实现
    addIconTap: function (e) {
        console.log(e);
        var index = e.currentTarget.dataset.id;
        if (!this.data.isSearching) {
            var recipeCount = this.data.recipeCount;
            recipeCount[index] += 1;
            if (recipeCount[index] >= 10) {
                //提示最大点10份
                recipeCount = 10;
            }
            this.setData({
                recipeCount: recipeCount
            })
        }
        else {
            var recipeCount = this.data.searchingRecipeCount;
            recipeCount[index] += 1;
            if (recipeCount[index] >= 10) {
                //提示最大点10份
                recipeCount = 10;
            }
            this.setData({
                searchingRecipeCount: recipeCount
            })
        }
    },
    subtractIconTap: function (e) {
        console.log(e);
        var index = e.currentTarget.dataset.id;
        if (!this.data.isSearching) {
            var recipeCount = this.data.recipeCount;
            recipeCount[index] -= 1;
            if (recipeCount[index] <= 0) {
                //提示最大点10份
                recipeCount = 0;
            }
            this.setData({
                recipeCount: recipeCount
            })
        }
        else {
            var recipeCount = this.data.searchingRecipeCount;
            recipeCount[index] -= 1;
            if (recipeCount[index] <= 0) {
                //提示最大点10份
                recipeCount = 0;
            }
            this.setData({
                searchingRecipeCount: recipeCount
            })
        }
    },
})