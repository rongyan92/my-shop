<template>
<div>
 <!-- 搜索框 -->
    <div class="search">
        <!-- <span>搜索</span> -->
        <span>搜索</span>
        <icon type='search'></icon>
    </div>
</div>
</template>
<script>
export default {

}
</script>
<style lang='less' scoped>
    // 搜索框
    .search {
        // width : 100%;
        // height : 30rpx;
        padding: 15rpx;
        background : #d81e06;
        text-align : center;
        position: relative;
        span {
            background: #fff;
            display: block;
            // vertical-align: middle;
            border-radius: 10rpx;
        }
        icon {
            position: absolute;
            left: 55%;
            top : 50%;
            transform: translateY(-50%);

        }
    }
</style>
