<template>
<div>
    <!-- 搜索框 -->
    <div class="search">
        <!-- <span>搜索</span> -->
        <input type="text" placeholder="搜索">
        <icon type='search'></icon>
    </div>
    <!-- 轮播图 -->
    <swiper indicator-dots='true'>
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
</div>
</template>
<script>
import request from '../../utils/request.js';
export default {
    data (){
        return {
            swiperData : [],
            menuData : []
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
    }

}
</script>
<style lang='less' scoped>
    .search {
        // width : 100%;
        // height : 30rpx;
        padding: 15rpx;
        background : #d81e06;
        text-align : center;
        position: relative;
        input {
            background: #fff;
            vertical-align: middle;
            border-radius: 10rpx;
        }
        icon {
            position: absolute;
            left: 55%;
            top : 50%;
            transform: translateY(-50%);

        }
    }

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
</style>
