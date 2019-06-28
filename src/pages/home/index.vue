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
export default {
    data (){
        return {
            swiperData : [],
            menuData : []
        }
    },
    created (){
        // 获取数据
        wx.request({
            url:'https://www.ehomespace.com/api/public/v1/home/swiperdata',
            method:'get',
            success: res => {
                // console.log(res);
                this.swiperData = res.data.message;
            }
        }),
        wx.request({
            url:'https://www.ehomespace.com/api/public/v1/home/catitems',
            method:'get',
            success: res => {
                console.log(res);
                this.menuData = res.data.message;
            }
        })
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
            padding: 0;
            margin: 0;
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
            width :145rpx;
            height : 160rpx;
            img {
                width:100%;
                height: 100%;
            }
        }
    }
</style>
