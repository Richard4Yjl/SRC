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
        kindSelected: -1,
        recipe: [
            {
                foodImgUrl: '../../image/food.png',
                detail: "湛江烧耗",
                count: 0,
            },
            {
                foodImgUrl: '../../image/food.png',
                detail: "湛江烧耗",
                count: 0,
            },
            {
                foodImgUrl: '../../image/food.png',
                detail: "湛江烧耗",
                count: 0,
            },
            {
                foodImgUrl: '../../image/food.png',
                detail: "湛江烧耗",
                count: 0,
            },
            {
                foodImgUrl: '../../image/food.png',
                detail: "湛江烧耗",
                count: 0,
            },
            {
                foodImgUrl: '../../image/food.png',
                detail: "湛江烧耗",
                count: 0,
            },
            {
                foodImgUrl: '../../image/food.png',
                detail: "湛江烧耗",
                count: 0,
            },
            {
                foodImgUrl: '../../image/food.png',
                detail: "湛江烧耗",
                count: 0,
            },
            {
                foodImgUrl: '../../image/food.png',
                detail: "湛江烧耗",
                count: 0,
            }
        ]
    },
    recipeKindTap: function (e) {
        console.log(e);
        this.setData({
            kindSelected: -1
        })
        if (e.currentTarget.dataset.id <= 4 && e.currentTarget.dataset.id >= 0) {
            this.setData({
                kindSelected: e.currentTarget.dataset.id
            })
        }
    }
})