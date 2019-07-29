<template>
  <custom-card class="screen-wrapper" :icon="screenIcon" :title="screenTitle">
    <div slot="header-left" class="header-left-wrapper" />
    <div slot="header-right" class="screen-btn-wrapper">
      <div class="close-screen inline-block pointer" @click="toggleOpenScreem">
        <i :class="{'el-icon-arrow-up': isOpenScreen, 'el-icon-arrow-down': !isOpenScreen}" />
        <span>{{ isOpenScreen ? '收起筛选' : '展开筛选' }}</span>
      </div>
      <el-button type="primary" size="small" @click="search">查询结果</el-button>
    </div>
    <el-row v-show="isOpenScreen" class="screent-content el-row" :gutter="40">
      <slot />
    </el-row>
  </custom-card>
</template>

<script>

export default {
  props: {
    screenIcon: {
      type: String,
      default: ''
    },
    screenTitle: {
      type: String,
      default: '筛选查询'
    }
  },
  data() {
    return {
      // 筛选收起状态
      isOpenScreen: true
    }
  },
  methods: {
    // 展开或收起筛选
    toggleOpenScreem() {
      this.isOpenScreen = !this.isOpenScreen
    },
    // 点击筛选按钮
    search() {
      this.$emit('search')
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'src/styles/variables.scss';
@import 'src/styles/mixin.scss';

.screen-wrapper {
  width: 100%;
  overflow: hidden;
  border: 1px solid $borderColor;
  .header-left-wrapper{
    color: red;
    float: left;
  }
  .screen-btn-wrapper {
    @include font-style(12px, #999);
    .close-screen {
      width: 80px
    }
  }
  .screent-content {
    padding: 10px;
    height: auto;
  }
}
</style>
