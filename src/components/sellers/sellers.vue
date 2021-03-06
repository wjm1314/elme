<template>
<div class="seller" ref="seller">
  <div class="seller-content">
    <div class="overview">
      <h1 class="title">{{seller.name}}</h1>
      <div class="desc">
        <star :size="36" :score="seller.score"></star>
        <span class="text">({{seller.ratingCount}})</span>
        <span class="text">月售{{seller.sellCount}}单</span>
      </div>
      <ul class="remark">
        <li class="block">
          <h2>起送价</h2>
          <div class="content">
            <span class="stress">{{seller.minPrice}}</span>元
          </div>
        </li>
        <li class="block">
          <h2>商家配送</h2>
          <div class="content">
            <span class="stress">{{seller.deliveryPrice}}</span>元
          </div>
        </li>
        <li class="block">
          <h2>平均配送时间</h2>
          <div class="content">
            <span class="stress">{{seller.deliveryTime}}</span>分钟
          </div>
        </li>
      </ul>
      <div class="favorite" @click="toggleFavorite">
        <span class="icon-favorite" :class="{'active': favorite}"></span>
        <span class="text">{{favoriteText}}</span>
      </div>
    </div>
    <split></split>
    <div class="bulletin">
      <h1 class="title">公告与活动</h1>
      <div class="content-wrapper">
        <p class="content">{{seller.bulletin}}</p>
      </div>
      <ul class="supports" v-if="seller.supports">
        <li class="support-item" v-for="(item, index) in seller.supports" :key="index">
          <span class="icon" :class="classMap[item.type]"></span>
          <span class="text">{{item.description}}</span>
        </li>
      </ul>
    </div>
    <split></split>
    <div class="pics">
      <h1 class="title">商家实景</h1>
      <div class="pic-wrapper" ref="picWrapper">
        <ul class="pic-list" ref="picList">
          <li class="pic-item" v-for="(pic, index) in seller.pics" :key="index">
            <img :src="pic" width="120" height="90">
          </li>
        </ul>
      </div>
    </div>
    <split></split>
    <div class="info">
      <h1 class="title">商家信息</h1>
      <ul>
        <li class="info-item" v-for="(info, index) in seller.infos" :key="index">{{info}}</li>
      </ul>
    </div>
  </div>
</div>
</template>

<script>
import BScroll from 'better-scroll'
import {saveToLocal, loadFromLocal} from '../../common/js/store'
import star from '../star/star.vue'
import split from '../split/split.vue'
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      favorite: (() => {
        return loadFromLocal(this.seller.id, 'favorite', false)
      })()
    }
  },
  computed: {
    favoriteText () {
      return this.favorite ? '已收藏' : '收藏'
    }
  },
  created () {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    this._init()
  },
  methods: {
    toggleFavorite () {
      this.favorite = !this.favorite
      saveToLocal(this.seller.id, 'favorite', this.favorite)
    },
    _init () {
      this.$nextTick(() => {
        this.sellerScroll = new BScroll(this.$refs.seller, {
          click: true
        })
        this._initPicScroll()
      })
    },
    _initPicScroll () {
      const PIC_WIDTH = 120
      const MARGIN = 6
      let picLen = this.seller.pics.length
      this.$refs.picList.style.width = PIC_WIDTH * picLen + MARGIN * (picLen - 1) + 'px'
      this.picsScroll = new BScroll(this.$refs.picWrapper, {
        scrollX: true
      })
    }
  },
  components: {
    star,
    split
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
@import '../../common/stylus/mixin.styl'
.seller
  position absolute
  top: 174px
  bottom 0px
  left 0px
  width 100%
  overflow hidden
  .overview
    position relative
    padding 18px
    .title
      margin-bottom 8px
      line-height 14px
      color rgb(7, 17, 27)
      font-size 14px
    .desc
      padding-bottom 18px
      font-size 0px
      border-1px(rgba(7, 17, 27, 0.1))
      .star
        display inline-block
        margin-right 8px
        vertical-align top
      .text
        display inline-block
        margin-right 12px
        line-height 18px
        vertical-align top
        font-size 10px
        color rgb(77, 85, 93)
    .remark
      display flex
      padding-top 18px
      .block
        flex 1
        text-align center
        border-right 1px solid rgba(7, 17, 27, 0.1)
        &:last-child
          border none
        h2
          margin-bottom 4px
          line-height 10px
          font-size 10px
          color rgb(147, 153, 159)
        .content
          line-height 24px
          font-size 10px
          color rgb(7, 17, 27)
          .stress
            font-size 24px
    .favorite
      position absolute
      width 50px
      right 11px
      top 18px
      text-align center
      .icon-favorite
        margin-bottom 4px
        display block
        color #d4d6d9
        line-height 24px
        font-size 24px
        &.active
          color rgb(240, 20, 20)
        .text
          line-height 10px
          font-size 10px
          color rgb(77, 85, 93)
  .bulletin
    padding 18px 18px 0 18px
    .title
      margin-bottom 8px
      line-height 14px
      color rgb(7, 17, 27)
      font-size 14px
    .content-wrapper
      padding 0 12px 16px 12px
      border-1px(rgba(7, 17, 27, 0.1))
      .content
        line-height 24px
        font-size 12px
        color rgb(240, 20, 20)
    .supports
      .support-item
        padding 16px 12px
        font-size 0px
        border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
        .icon
          display inline-block
          vertical-align top
          width: 16px
          height 16px
          margin-right 6px
          background-size 16px 16px
          background-repeat no-repeat
          &.decrease
            bg-image('decrease_4')
          &.discount
            bg-image('discount_4')
          &.guarantee
            bg-image('guarantee_4')
          &.invoice
            bg-image('invoice_4')
          &.special
            bg-image('special_4')
        .text
          line-height 16px
          font-size 12px
          color rgb(7, 17, 27)
  .pics
    padding 18px
    .title
      margin-bottom 12px
      line-height 14px
      color rgb(7, 17, 27)
      font-size 14px
    .pic-wrapper
      width 100%
      overflow hidden
      white-space nowrap
      .pic-list
        font-size 0px
        .pic-item
          display inline-block
          margin-right 6px
          width 120px
          height 90px
          &:last-child
            margin 0px
  .info
    padding 18px 18px 0 18px
    color rgb(7, 17, 27)
    .title
      padding-bottom 12px
      line-height 14px
      border-1px(rgba(7, 17, 27, 0.1))
      font-size 14px
    .info-item
      padding 16px 12px
      line-height 16px
      border-1px(rgba(7, 17, 27, 0.1))
      font-size 12px
      &:last-child
        border-none()
</style>
