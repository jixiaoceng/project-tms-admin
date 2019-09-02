<template>
  <div class="flex-wrapper flex-column-center navbar" :style="{backgroundColor: themeColor}">
    <div
      v-if="device !== 'mobile'"
      :style="{backgroundColor: themeColor}"
      class="brand"
    >LingoAce <br> 教学管理系统</div>
    <hamburger
      :toggle-click="toggleSideBar"
      :is-active="sidebar.opened"
      class="hamburger-container"
    />
    <div
      class="flex-wrapper flex-space-between flex-item"
      mode="horizontal"
    >
      <module-menu
        v-if="device !== 'mobile'"
        @currentTabIndex="getCurrentTabIndex"
      />
      <div class="right-menu flex-wrapper flex-column-center" style="color: #fff">
        <!-- 个人信息 -->
        <el-dropdown class="avatar-container" trigger="hover" style="color: #fff;cursor: pointer">
          <span>
            <i class="el-icon-user-solid" style="font-size: 20px; vertical-align: bottom" />
            <span class="" style="font-size: 15px;display: inline-block;line-height: 20px;">{{ user }}</span>
          </span>
          <el-dropdown-menu slot="dropdown">
            <!-- <router-link to="/systemManage/changePassword">
              <el-dropdown-item>修改密码</el-dropdown-item>
            </router-link> -->
            <el-dropdown-item>
              <span style="display:block;" @click="logout">退出登录</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <!-- 下拉 -->
        <!-- 换肤 -->
        <el-tooltip content="换肤" effect="dark" placement="bottom">
          <theme-picker class="right-menu-item" />
        </el-tooltip>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import Hamburger from '@/components/Hamburger'
import ThemePicker from '@/components/ThemePicker'
import ModuleMenu from '../ModuleMenu'
import { getStorage } from '@/utils/handleStorage'
import { logout } from '@/api/base/'
import HandleToken from '@/utils/auth'
const handleToken = new HandleToken()

export default {
  name: 'Navbar',
  components: {
    Hamburger,
    ThemePicker,
    ModuleMenu
  },
  data() {
    return {
      user: this.userName || getStorage('userName')
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'themeColor',
      'device',
      'userName'
    ])
  },
  methods: {
    toggleSideBar() {
      this.toggleSideBar()
    },
    logout() {
      logout().then(res => {
        handleToken.removeToken()
        this.$router.push({ path: '/login' })
        localStorage.clear()
      })
    },
    getCurrentTabIndex(index) {
      this.$emit('currentTabIndex', index)
    },
    ...mapMutations({
      toggleSideBar: 'TOGGLE_SIDEBAR'
    })
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  border-radius: 0px !important;
  height: 80px;
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  right: 0;
  .brand {
    width: 160px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    line-height: 30px;
  }
  .hamburger-container {
    margin: 0 20px
  }
  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }
  .right-menu {
    &:focus{
     outline: none;
    }
    .right-menu-item {
      display: inline-block;
      margin: 0 10px;
    }
    .international{
      vertical-align: top;
    }
    .avatar-container {
      .avatar-wrapper {
        cursor: pointer;
        position: relative;
        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .el-icon-caret-bottom {
          position: absolute;
          right: -20px;
          top: 0;
          bottom: 0;
          margin: auto;
          height: 15px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
