<template>
  <div class="custom-card-wrapper">
    <div class="custom-card-header flex-wrapper">
      <div class="flex-wrapper flex-item flex-space-between flex-column-center">
        <div class="custom-header-title">
          <i v-if="icon !== ''" :class="`iconfont ${icon}`" />
          {{ title }}
        </div>
        <div>
          <slot name="header-right" />
        </div>
      </div>
      <div
        v-if="collapse"
        class="close-screen inline-block pointer"
        @click="toggleOpenScreem"
      >
        <i :class="{'el-icon-arrow-up': isOpenScreen, 'el-icon-arrow-down': !isOpenScreen}" />
        <span>{{ isOpenScreen ? '收起' : '展开' }}</span>
      </div>
    </div>
    <div v-show="isOpenScreen" class="screent-card-content">
      <slot />
    </div>
  </div>
</template>

<script>

export default {
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: '标题'
    },
    collapse: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isOpenScreen: true
    }
  },
  methods: {
    toggleOpenScreem() {
      this.isOpenScreen = !this.isOpenScreen
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'src/styles/variables.scss';
@import 'src/styles/mixin.scss';

.custom-card-wrapper {
  width: 100%;
  overflow: hidden;
  border: 1px solid $borderColor;
  .custom-card-header {
    padding: 0 20px;
    line-height: 50px;
    background-color: $focusBg;
    border-bottom: 1px solid $borderColor;
    .custom-header-title {
      @include font-style(14px, #666);
      .custom-icon {
        margin-right: 5px;
      }
    }
    .close-screen {
      margin-left: 10px;
      @include font-style(12px, #999);
    }
  }
  .screent-card-content {
    padding: 10px;
    height: auto;
    .el-select {
      width: 100%!important;
    }
  }
}
</style>
