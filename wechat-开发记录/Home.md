# HOME.WXML

## 1. 商家宣传 swiper 
- 通过循环显示 imgUrls 来显示图片，幻灯片的播放属性在data里面设置

## 2. 搜索栏
- view  (class="search container)
- 输入栏input, 绑定输入事件  bindinput="searchInput", 在输入栏里面输入的值都会与searchValue绑定
- 搜索图标， 绑定点击事件  bindtap='searchIconTap'， 点击这个图标就会进行搜索 

## 3. 菜谱显示
<ol>
    <li>
        view (class="recipe-kind")  左边显示 菜的种类 <br>
        view (class="recipe-detail-container") 右边显示 每个种类的详细菜的种类
    </li>
</ol>

# HOME.CSS
## 1. 商家宣传 slider
- swiper 容器 

        height: 25%; // 占整个页面的25%

- slide-image
        
        //缩放充满整个slider
        width: 100%;
        height: 100%;

## 2. 搜索栏
- search-container 

        采用flex布局，行方向显示， 上下的margin 是5px， 高度为 7%， 垂直方向居中对齐

## 3. 菜谱显示
- recipe-container

    - 采用flex布局， 高度占整个页面的65%,
        行方向显示， overflow:hidden
    - 行方向显示的原因是： 种类的容器(recipe-kind) 和 每种菜的详细菜的列表的容器(recipe-detail-container) 分开左右显示
    - scroll-view

- recipe-kind 显示菜的种类的容器

        flex布局， 按列方向显示， 每种类的文字的容器平均分配， 行方向居中显示。 宽度占整个页面的15%。

- recipe-kind-selected 

        用户选定一个菜的种类背景会变成蓝色

- recipe-detail-container 显示每一种菜的详细列表 

        flex布局， 按列显示， 
        width: 83%
        height: 405px
- recipe-item

        显示的是菜单列表中详细的数据


# HOME.JS

## 1. data
- imgUrls 

        需要从数据库在第一次加载进来slider图片的链接
        在swiper里面显示
- swiper 参数

        indicatorDots: true,
        autoplay: true,
        interval: 3000,
        duration: 1000,

- 菜谱相关
        
        kindSelected
        当前选择的默认的种类0

        recipeKind
        从数据库返回的菜的种类的字符串型数组

         recipeFoodImgUri
        从数据库返回当前种类的详细菜品列表->对应的图片数组

        recipeDetail
        从数据库返回当前种类的详细菜品列表->对应的菜名数组

        recipeCount
        从数据库返回当前种类的详细菜品列表->对应的选择数量的数组

- 搜索相关

        isSearching: false,
        表示是否有在搜索

        searchingRecipeFoodImgUri: [],
        searchingRecipeDetail: [],
        searchingRecipeCount: [],
        表示搜索的结果

        searchedIndex:[],
        搜索出来的结果在当前的菜品列表的下表

        searchValue: "",

- 点击recipeKind中菜的种类
    - data.kindSelected 默认值 0， <br> 然后清除当前选择的种类，set->-1
    - 从数据库里面返回当前的种类的详细信息
    - 改变kindSelected和菜谱的详细信息

- 点击搜索图标
   - 如果搜索内容不为空
      - 改变 isSearching 的值， 从false到true,<br>搜索的时候会更新recipe-detail-container中的recipe-item的值，从recipe到searchingRecipe循环显示,
   - 搜索空表示恢复到当前类的出事详细列表
      - 记录当前的搜索到的下表然后更新count




