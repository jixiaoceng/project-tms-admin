<template>
  <!-- 一级菜单 -->
  <div
    class="module-wrapper user-select-no"
    :style="{backgroundColor: themeColor}"
    :class="{'module-wrapper-vertical flex-wrapper flex-direction-column': direction === 'vertical'}"
  >
    <div
      v-for="(item, index) in menuMap"
      :key="index"
      :class="{'active': index == moduleMenuIndex}"
      :style="{backgroundColor: themeColor}"
      class="module-item"
      @click="clickModuleTab(index)"
    >
      <i v-show="device == 'mobile'" :class="`iconfont ${item.icon}`" />
      <span class="module-name">{{ item.name }}</span>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  props: {
    direction: {
      type: String,
      default: 'horizontal'
    }
  },
  computed: {
    ...mapGetters([
      'menuMap',
      'themeColor',
      'device',
      'moduleMenuIndex'
    ])
  },
  mounted() {
  },
  methods: {
    clickModuleTab(index) {
      this.setModuleMenuIndex(index)
      this.$emit('currentTabIndex', index)
    },
    ...mapMutations({
      'setModuleMenuIndex': 'SET_MODULE_MENU_INDEX'
    })
  }
}
</script>

<style lang="scss" scoped>
.module-wrapper {
  display: flex;
  .module-item {
    position: relative;
    padding: 0 20px;
    line-height: 80px;
    cursor: pointer;
    transition: all .3s;
    color: #fff;
    .module-name {
      margin-left: 5px;
    }
    &.active {
      background: rgba(255, 255, 255, .5)!important;
    }
  }
  &.module-wrapper-vertical {
    height: auto;
    .module-item {
      padding: 10px 0;
      width: 40px;
      line-height: inherit;
      text-align: center;
    }
  }
}
</style>

