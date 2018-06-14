var app = getApp();
const Promise = require('../../promise.js');
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

        recipeFoodImgUri: [],
        recipeDetail: [],
        recipeMoney: [],
        recipeCount: [],
        recipeFoodID: [],
        recipeFoodDescription: [],

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
        throughQRCode: false,
        QRCodeValid: false,
    },
    //初始化数据中的全局变量
    initialData: function (result) {
        app.globalData.merchant_id = result["merchant_id"];
        app.globalData.seat_id = result["seat_id"];
        app.globalData.number = result["number"];
    },
    //测试二维码中的数据可以访问
    testScanResult: function () {
        var that = this;
        var foods = [];
        
        var result = wx.getStorageSync('result');
        that.initialData(result);
        return new Promise(function (resolve, reject) {
            wx.request({
                url: 'https://www.sysu-easyorder.top/foods?merchant_id=' + result['merchant_id'],
                data: {
                    x: '',
                    y: ''
                },
                header: {
                    'content-type': 'application/json' // 默认值
                },
                success: function (res) {
                        wx.setStorageSync('QRCodeValid', true);
                        resolve(res);
                

                },
                fail: function (res) {
                    wx.showToast({
                        title: '二维码错误',
                        duration: 1000,
                        image: '../../image/warning.png',
                        mask: true
                    });
                    return;
                    reject("error");
                }

            })
        });

    },
    //保存二维码的解析result
    getScanResult: function () {
        
        let that = this;
        return new Promise(function (resolve, reject) {
            wx.scanCode({
                onlyFromCamera: true,
                success: function (res) {
                    try {
                        var result = JSON.parse(res.result);

                        if (result.hasOwnProperty("seat_id") && result.hasOwnProperty("number") &&
                            result.hasOwnProperty("qr_code_url") && result.hasOwnProperty("merchant_id")
                            && Object.keys(result).length == 4 && typeof (result["seat_id"]) == "number"
                            && typeof (result["number"]) == "string" && typeof (result["qr_code_url"]) == "string"
                            && typeof (result["merchant_id"]) == "number") {
                            
                            //格式符合就存储result
                            wx.setStorageSync('result', result);
                            console.log(result);
                            resolve(result);

                        }
                        else {
                            wx.showToast({
                                title: '二维码错误',
                                duration: 1000,
                                image: '../../image/warning.png',
                                mask: true
                            });
                            return;
                        }
                    } catch (e) {
                        wx.showToast({
                            title: '二维码错误',
                            duration: 1000,
                            image: '../../image/warning.png',
                            mask: true
                        });
                        return;
                    }


                },
                fail: (res) => {
                    reject('error');
                },
                complete: (res) => {
                }
            });
        });
    },
    getMerchant: function () {
        var that = this;
        wx.request({
            url: 'https://www.sysu-easyorder.top/foods?merchant_id=' + app.globalData.merchant_id,
            data: {
                x: '',
                y: ''
            },
            header: {
                'content-type': 'application/json' // 默认值
            },
            success: function (res) {
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
                });

            },
            fail: function(res) {
                wx.showToast({
                    title: '未知错误',
                    duration: 1000,
                    image: '../../image/warning.png',
                    mask: true
                });
            }
        })

    },
    onLoad: function (e) {
        var that = this;
        //扫描二维码
        //1011 表示第一次扫码进入小程序， true模拟进入方便电脑debug
        if (app.globalData.scene == 1011) {
            
            that.getScanResult().then(function (res) {

                that.testScanResult().then(function (res) {

                    var QRCodeValid = wx.getStorageSync('QRCodeValid');
                    if (QRCodeValid == true) {
                        that.getMerchant();
                        that.setData({
                            QRCodeValid: true,
                            throughQRCode: true,
                        })
                    }
                })
            })

        }
        else {
            this.setData({
                throughQRCode: false
            })
        }

    },

    onShow: function () {
        app.globalData.isPaying = true;
        if (!this.data.throughQRCode) {
            var recipeDetail = [];
            var recipeMoney = [];
            var recipeFoodImgUri = [];
            var recipeCount = [];
            var recipeFoodID = [];
            var recipeFoodDescription = [];
            this.setData({
                recipeDetail: recipeDetail,
                recipeMoney: recipeMoney,
                recipeFoodImgUri: recipeFoodImgUri,
                recipeCount: recipeCount,
                recipeFoodID: recipeFoodID,
                recipeFoodDescription: recipeFoodDescription
            })

        }
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

    scanTap: function (e) {
        //需要一个判断二维码是否合法
        var that = this;
        that.getScanResult().then(function (res) {
            
            that.testScanResult().then(function (res) {

                var QRCodeValid = wx.getStorageSync('QRCodeValid');

                if (QRCodeValid == true) {
                    that.getMerchant();
                    that.setData({
                        QRCodeValid: true,
                        throughQRCode: true,
                    })
                }

            })
        })


    },
    //缺少在搜索页面之后点击的实现
    addIconTap: function (e) {
        var index = e.currentTarget.dataset.id; //在列表中的下标

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
            recipeSelected.seat_id = app.globalData.seat_id;
        }
        else {
            recipeSelected.recipeCount[i] += 1;
            recipeSelected.moneyToPay += recipeSelected.recipeMoney[i];
        }

        this.setData({
            recipeSelected: recipeSelected
        })


    },
    subtractIconTap: function (e) {
        var index = e.currentTarget.dataset.id;

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

    },
    onHide: function (e) {
        app.globalData.recipeSelected = this.data.recipeSelected;
        var recipeSelected = {
            recipeFoodImgUri: [],
            recipeDetail: [],
            recipeMoney: [],
            recipeCount: [],
            recipeFoodID: [],
            recipeFoodDescription: [],
            moneyToPay: 0,
            seat_id: 0,
        };
        this.setData({
            recipeSelected: recipeSelected,
        })
    }
})