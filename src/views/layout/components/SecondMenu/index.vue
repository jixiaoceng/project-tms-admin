<template>
  <!-- 二级三级菜单 -->
  <el-scrollbar wrap-class="scrollbar-wrapper" class="second-wrapper user-select-no">
    <el-menu
      v-if="isShow"
      class="second-wrapper user-select-no"
      :active-text-color="themeColor"
      :default-active="currentPath"
      :background-color="variables.menuBg"
      :text-color="variables.menuText"
    >
      <el-submenu
        v-for="(item, index) in secondMenuMap"
        :key="index"
        :index="String(index)"
      >
        <template slot="title">
          <i :class="`iconfont ${item.icon}`" />
          <span>{{ item.name }}</span>
        </template>
        <el-menu-item
          v-for="(subItem, subIndex) in secondMenuMap[index].children"
          :key="subIndex"
          :index="subItem.url"
          @click="clickSecondMenu(subItem)"
        >{{ subItem.name }}</el-menu-item>
      </el-submenu>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import variables from '@/styles/variables.scss'

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
    variables() {
      return variables
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
  width: 150px;
  background-color: #304156;
  border-right: 1px solid #dcdcdc;
  margin-bottom: 50px;
  .menu-group {
    .group-name {
      padding-left: 10px;
      height: 50px;
      line-height: 50px;
      background-color: #f1f1f1;
      border-top: 1px solid #DCDCDC;
      border-bottom: 1px solid #DCDCDC;
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
