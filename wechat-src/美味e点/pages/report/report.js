Page({

  /**
   * 页面的初始数据
   */
    data: {
        imgUrls: [
            'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
            'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
            'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
        ],
        indicatorDots: true,
        autoplay: true,
        interval: 5000,
        duration: 1000,
        reportList:[
            {
                detail: "食物不卫生",
                selectIconPath: "../../image/select.png"
            },
            {
                detail: "食物不卫生",
                selectIconPath: "../../image/select.png"
            },
            {
                detail: "食物不卫生",
                selectIconPath: "../../image/select.png"
            }
        ]
    }


})