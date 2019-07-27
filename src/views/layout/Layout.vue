<template>
  <div :class="classObj" class="app-wrapper">
    <!-- 移动端打开菜单时的遮罩层 -->
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <!-- 头部导航栏 -->
    <navbar />
    <!-- 主要内容 -->
    <el-container>
      <!-- 侧边栏 -->
      <sidebar class="sidebar-container" />
      <!-- 右侧主要内容 -->
      <el-container class="main-container">
        <app-main />
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { Navbar, Sidebar, AppMain } from './components'
import ResizeMixin from './mixin/ResizeHandler'

export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  mixins: [ResizeMixin],
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    handleClickOutside() {
      this.closeSideBar({ withoutAnimation: false })
    },
    ...mapMutations({
      'closeSideBar': 'CLOSE_SIDEBAR'
    })
  }
}
</script>
