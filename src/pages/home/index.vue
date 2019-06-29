<template>
<div>
    <!-- 搜索框 -->
    <search-bar></search-bar>
    <!-- 轮播图 -->
    <swiper indicator-dots='true' autoplay circular>
        <swiper-item :key='index' v-for='(item,index) in swiperData'>
            <image :src='item.image_src'></image>
        </swiper-item>
    </swiper>
    <!-- 菜单导航 -->
    <div class='menu'>
        <div class="menu-item" :key='index' v-for='(item,index) in menuData'>
            <img :src="item.image_src" alt="">
        </div>
    </div>
    <!-- 楼层数据 -->
    <div class='floor' :key='index' v-for='(item,index) in floorData1'>
        <div class="floor-title">
            <image :src="item.floor_title.image_src"></image>
        </div>
        <div class="floor-content">
            <div class='content-left'>
                <img :src="item.leftImagePath" alt="">
            </div>
            <div class='content-right'>
                <img :key='i' v-for='(img,i) in item.product_list' :src="img.image_src" alt="">
            </div>
        </div>
    </div>

    <!-- 返回顶部 -->
    <div class="top" @click='toTop' v-show='flag'>
        ToTop
    </div>

</div>
</template>
<script>
import SearchBar from '../../components/SearchBar';
import request from '../../utils/request.js';
export default {
    components : {SearchBar},
    data (){
        return {
            swiperData : [],
            menuData : [],
            floorData : [],
            // 控制回到顶部按钮
            flag : false
        }
    },
    computed : {
        floorData1 (){
            // 对源数据进行操作
            return this.floorData.map( item => {
                // 拿到数组中第一项
                item.leftImagePath = item.product_list[0].image_src;
                // 利用过滤器取出其余4项
                item.product_list = item.product_list.filter( (item,index) => {
                    return index > 0
                })
                
                return item;
                
            })
        }
    },
    methods : {
        // 初始化数据
        async initData (){
            // 轮播图数据
            const swiperRes = await request('home/swiperdata');
            this.swiperData = swiperRes.data.message;
            // 分类菜单数据
            const menuRes = await request('home/catitems');
            this.menuData = menuRes.data.message;
            // 楼层数据
            const floorRes = await request('home/floordata');
            this.floorData = floorRes.data.message;
            // console.log(this.floorData);
            
        },
        // 回到顶部
        toTop (){
            wx.pageScrollTo({
                scrollTop:0
            })
        }
    },
    created (){
        this.initData();
        // 获取数据
        // 轮播图数据
        // wx.request({
        //     url:'https://www.ehomespace.com/api/public/v1/home/swiperdata',
        //     method:'get',
        //     success: res => {
        //         // console.log(res);
        //         this.swiperData = res.data.message;
        //     }
        // }),
        // Promise对象优化
        // request('home/swiperdata').then(
        //     res => {
        //         this.swiperData = res.data.message
        //     }
        // ),

        // async、await优化
        // const swiperRes = await request('home/swiperdata');
        // this.swiperData = swiperRes.data.message;

        // wx.request({
        //     url:'https://www.ehomespace.com/api/public/v1/home/catitems',
        //     method:'get',
        //     success: res => {
        //         console.log(res);
        //         this.menuData = res.data.message;
        //     }
        // })
        // request('home/catitems').then(
        //     res => {
        //         this.menuData = res.data.message;
        //     }
        // )
    },
    // 下拉刷新
    onPullDownRefresh(){
        this.initData();
    },
    // 监听页面滚动事件
    onPageScroll(params){
        console.log(params.scrollTop);
        this.flag = params.scrollTop > 100
    }

}
</script>
<style lang='less' scoped>
    // 轮播图
    swiper {
        height: 300rpx;
        swiper-item {
            image {
                width: 750rpx;
                height: 100%;
            }
        }
    }
    // 分类菜单
    .menu {
        display: flex;
        margin: 15rpx 0;
        .menu-item {
            flex: 1;
            width :140rpx;
            height : 160rpx;
            img {
                width:100%;
                height: 100%;
            }
        }
    }
    // 楼层
    .floor {
        .floor-title {
            margin: 10rpx;
            height: 80rpx;
            image {
                height: 100%;
            }
        }
        .floor-content {
            display: flex;
            .content-left {
                margin-right: 8rpx;
                margin-left: 14rpx;
                img {
                    width:232rpx;
                    height:385rpx;
                }
            }
            .content-right {
                flex: 1;
                flex-wrap: wrap;
                img {
                    width:232rpx;
                    height:188rpx;
                    padding: 0 8rpx;
                }
            }

        }
    }
    // 返回顶部
    .top {
        width: 100rpx;
        height: 100rpx;
        border-radius: 50%;
        background: #d81e06;
        text-align: center;
        line-height: 100rpx;
        font-size: 16px;
        color: #fff;
        position: fixed;
        bottom: 100rpx;
        right: 20rpx;
        // display:none;
    }
</style>
