<template>
  <div>
    <!-- 搜索 -->
    <div class="search">
      <!-- 搜索框 -->
      <div class="input-box">
        <input type="text" placeholder="请输入商品">
      </div>
      <!-- 搜索结果 -->
      <div class="result"></div>
    </div>
    <!-- 焦点图 -->
    <swiper class="banner" indicator-dots indicator-color="rgba(255, 255, 255, 0.6)" indicator-active-color="#fff">
      <swiper-item :key="key" v-for="(list, key) in bannerList">
        <navigator :url="list.navigator_url">
          <image :src="list.image_src"></image>
        </navigator>
      </swiper-item>
    </swiper>
    <!-- 导航 -->
    <div class="navs">
      <navigator :key="key" :url="list.navigator_url" v-for="(list, key) in navList">
        <image :src="list.image_src"></image>
      </navigator>
    </div>
    <!-- 楼层 -->
    <div class="floors">
      <div class="floor" :key="key" v-for="(list, key) in floorList">
        <!-- 楼层标题 -->
        <div class="title">
          <image :src="list.floor_title.image_src"></image>
        </div>
        <div class="pics">
          <navigator :key="index" :url="item.navigator_url" v-for="(item, index) in list.product_list">
            <image :src="item.image_src"></image>
          </navigator>
        </div>
      </div>
    </div>
    <!-- 回顶部 -->
    <span class="gotop" @click="goTop" v-show="!isTop"></span>
  </div>
</template>

<script>

import request from '@/utils/request'

export default {
  data(){
    return{
      bannerList: [],
      navList: [],
      floorList: [],
      isTop: true
    }
  },
  methods: {
  //焦点图接口
    async getBanner () {
      let {message} = await request({
        url:'/api/public/v1/home/swiperdata'
      })
      this.bannerList = message
    },
    //导航接口
    async getNavs () {
      let {message} = await request({
        url: '/api/public/v1/home/catitems'
      })
      this.navList = message
    },
    //楼层接口
    async getFloors () {
      let {message} = await request({
        url: '/api/public/v1/home/floordata'
      })
      this.floorList = message
    },
    //回顶部
    goTop () {
      mpvue.pageScrollTo({
        scrollTop: 0
      })
    }
  },
  mounted () {
    // console.log('这里可以发起网络请求了...')
    this.getBanner()
    this.getNavs()
    this.getFloors()
  },
  // 这里可以直接写小程序页面的事件监听
  onPullDownRefresh () {
    // console.log('有人下拉操作呢')
    this.getBanner()
    this.getNavs()
    this.getFloors()

    // 当请求完毕时，主动关闭加载动效
    mpvue.stopPullDownRefresh()
  },

  onReachBottom () {
      // 上拉加载...
  },

  onPageScroll (ev) {
    // console.log(ev);
    // 当大于 200 时，显示回到顶部
     this.isTop = ev.scrollTop < 200
  }
}

</script>

<style scoped lang="less">

  // 在 vue 中使用 less 需要安装
  // less-loader、less 并且还需要进行配置 (webpack)

  // 在 mpvue 中使用 less 同样需要安装
  // less-loader、less 但是无须配置

  .search {

  }

  .search {

    .input-box {
      background-color: #ea4451;
      padding: 20rpx 30rpx;
    }
  }

  .search .input-box input {
    height: 75rpx;
    background-color: #FFF;
    padding-left: 15rpx;
    border-radius: 8rpx;
    font-size: 27rpx;
    color: #666;
  }

  /*焦点图*/
  .banner {
    width: 750rpx;
    height: 340rpx;
  }

  .banner navigator {
    width: 100%;
    height: 100%;
  }

  /*导航*/
  .navs {
    display: flex;
    justify-content: space-between;
    padding: 30rpx 40rpx;
  }

  .navs navigator {
    width: 128rpx;
    height: 140rpx;
  }

  /*楼层*/
  .floors {

  }

  .floors .title {
    width: 750rpx;
    height: 60rpx;
    padding-top: 27rpx;
    padding-left: 15rpx;
    background-color: #f4f4f4;
  }

  .floors .pics {
    padding: 20rpx 18rpx;
    overflow: hidden;
  }

  .floors .pics navigator {
    height: 188rpx;
    margin-left: 10rpx;
    margin-bottom: 10rpx;
    float: left;
  }

  .floors .pics navigator:first-child {
    width: 232rpx;
    height: 386rpx;
    margin-left: 0;
  }

  .floors .pics navigator:nth-child(2) {
    width: 273rpx;
  }

  .floors .pics navigator:nth-child(3) {
    width: 193rpx;
  }

  .floors .pics navigator:nth-child(4) {
    width: 193rpx;
  }

  .floors .pics navigator:last-child {
    width: 273rpx;
  }

  // 回顶部
  .gotop {
    position: fixed;
    bottom: 60rpx;
    right: 30rpx;

    // display: block;
    width: 88rpx;
    height: 88rpx;
    border-radius: 50%;
    background-color: pink;
  }

</style>
