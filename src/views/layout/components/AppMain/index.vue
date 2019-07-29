<template>
  <section class="app-main flex-wrapper flex-direction-column">
    <!-- 页面头部标题 -->
    <div v-if="currentPage !== '/page/401'" ref="pageTitle" :style="titleStyle" class="page-title flex-wrapper flex-space-between flex-column-center">
      <div class="line" :style="{borderLeft: `5px solid ${themeColor}`}">{{ pageTitle == '' ? secondMenuIndex.title : pageTitle }}</div>
      <div class="page-title-right">
        <el-button v-if="pageTitle !== ''" class="text-right" plain @click="goBack">返回</el-button>
        <el-button class="text-right" plain @click="refresh">刷新</el-button>
      </div>
    </div>
    <div ref="scrollDom" class="flex-item" style="padding: 20px">
      <transition name="fade-transform" mode="out-in">
        <keep-alive :include="cachedViews">
          <router-view :key="key" />
        </keep-alive>
      </transition>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'AppMain',
  data() {
    return {
      scrollDom: null
    }
  },
  computed: {
    currentPage() {
      return this.$route.fullPath
    },
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.fullPath
    },
    titleStyle() {
      return `left: ${this.device === 'mobile' ? '0px' : this.isCollapse ? '0px' : '180px'}`
    },
    isCollapse() {
      return !this.sidebar.opened
    },
    ...mapGetters([
      'secondMenuIndex',
      'themeColor',
      'pageTitle',
      'sidebar',
      'device'
    ])
  },
  methods: {
    // 返回
    goBack() {
      this.$router.go(-1)
    },
    // 刷新
    refresh() {
      // window.location.href = window.location.href
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'src/styles/mixin.scss';

.app-main {
  padding-top: 50px;
  position: relative;
  overflow: hidden;
  flex: 1;
  box-sizing: border-box;
  .page-title {
    position: fixed;
    z-index: 9;
    right: 0;
    top: 80px;
    left: 190px;
    padding: 0 20px;
    height: 50px;
    background-color: #f2f2f2;
    border-bottom: 1px solid rgba(220, 220, 220, 1);
    transition: all .3s;
    @include font-style(14px, #999);
    .line {
      padding-left: 6px;
      height: 20px;
      line-height: 20px;
    }
  }
}
</style>
