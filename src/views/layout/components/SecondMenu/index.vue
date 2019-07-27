<template>
  <el-scrollbar wrap-class="scrollbar-wrapper" class="second-wrapper user-select-no">
    <el-menu
      v-if="isShow"
      class="second-wrapper user-select-no"
      background-color="#444"
      text-color="#fff"
      :active-text-color="themeColor"
      :default-active="currentPath"
    >
      <el-submenu
        v-for="(item, index) in secondMenuMap"
        :key="index"
        :index="String(index)"
      >
        <template slot="title">
          <span>{{ item.title }}</span>
        </template>
        <el-menu-item
          v-for="(subItem, subIndex) in secondMenuMap[index].children"
          :key="subIndex"
          :index="subItem.url"
          @click="clickSecondMenu(subItem)"
        >{{ subItem.title }}</el-menu-item>
      </el-submenu>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  data() {
    return {
      isShow: true
    }
  },
  computed: {
    secondMenuMap() {
      if (this.menuMap[this.moduleMenuIndex].children) {
        return this.menuMap[this.moduleMenuIndex].children
      } else {
        return []
      }
    },
    ...mapGetters([
      'menuMap',
      'themeColor',
      'moduleMenuIndex',
      'secondMenuIndex',
      'currentPath'
    ])
  },
  watch: {
    secondMenuMap(newVal, oldVal) {
      this.isShow = false
      setTimeout(() => {
        this.isShow = true
      }, 380)
    }
  },
  methods: {
    clickSecondMenu(secondMenu) {
      this.setSecondMenuIndex(secondMenu)
    },
    ...mapMutations({
      'setSecondMenuIndex': 'SET_SECOND_MENU_INDEX'
    })
  }
}
</script>

<style lang="scss" scoped>
.second-wrapper {
  width: 190px;
  background-color: #444;
  border-right: 1px solid #444;
  margin-bottom: 50px;
  .menu-group {
    .group-name {
      padding-left: 10px;
      height: 50px;
      line-height: 50px;
      background-color: rgba(242, 242, 242, 1);
      border-top: 1px solid rgba(220, 220, 220, 1);
      border-bottom: 1px solid rgba(220, 220, 220, 1);
      font-size: 14px;
      color: #999;
      &:first-child {
        border-top:none;
      }
    }
    .second-item {
      padding-left: 10px;
      height: 40px;
      line-height: 40px;
      font-size: 12px;
      color: #666;
      cursor: pointer;
      &.active {
        background: #fff;
      }
    }
  }
}
</style>
