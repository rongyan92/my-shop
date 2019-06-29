<template>
<div>
    <!-- 搜索框 -->
    <search-bar></search-bar>
    <!-- 商品分类 -->
    <div class="cate">
        <div class="left">
            <div @click='getCurrentId(item.cat_id)' :class='["l_item",item.cat_id===currentId ? "active" :""]' v-for='(item,index) in cateList' :key='index'>{{item.cat_name}}</div>
        </div>
        <div class="right">
            <div v-for='(item1,index1) in rightData' :key='index1'>
                <div class="r_title">{{item1.cat_name}}</div>
                <div class="r_content">
                    <div class='content_item' v-for='(brand,i) in item1.children' :key='i'>
                        <img :src="brand.cat_icon" alt="">
                        <p>{{brand.cat_name}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

</div>
</template>
<script>
import SearchBar from '../../components/SearchBar';
import request from '../../utils/request';
export default {
    computed :{
        rightData (){
            let right = this.cateList.filter( item => {
                return item.cat_id === this.currentId
            })
            return right.length > 0 ? right[0].children : [];
        }
        
    },
    components : {SearchBar},
    data (){
        return {
            currentId : 1,
            cateList :[]
        }
    },
    methods :{
        async initData (){
            const res = await request('categories');
            console.log(res);
            this.cateList = res.data.message;
        },
        getCurrentId (params){
            // console.log(params);
            this.currentId = params;
        }
    },
    created (){
        // 初始化数据
        this.initData();
    }
}
</script>
<style lang='less' scoped>
   @import './main.less';
</style>