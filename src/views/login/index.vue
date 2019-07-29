<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >

      <div class="title-container">
        <h3 class="title">LingoAce 教学管理系统</h3>
      </div>

      <el-form-item class="username" prop="username">
        <span class="icon-container" :style="{color: themeColor}">
          <i class="iconfont ppIcon-user" />
        </span>
        <el-input
          v-model="loginForm.username"
          :placeholder="`账户`"
          name="username"
          type="text"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item class="password" prop="password">
        <span class="icon-container" :style="{color: themeColor}">
          <i class="iconfont ppIcon-pwd" />
        </span>
        <el-input
          v-model="loginForm.password"
          :type="passwordType"
          :placeholder="`密码`"
          name="password"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span
          class="show-pwd"
          :style="{color: themeColor}"
          @click="showPwd"
        >
          <i class="iconfont ppIcon-hidepwd" />
        </span>
      </el-form-item>
      <el-button
        class="btn-login"
        :style="{backgroundColor: themeColor, border: `1px solid ${themeColor}`}"
        :loading="loading"
        type="primary"
        style="width:100%;margin-bottom:30px;border-radius:10px;"
        @click.native.prevent="handleLogin"
      >登录</el-button>
    </el-form>
  </div>
</template>

<script>
import ResizeMixin from '@/views/layout/mixin/ResizeHandler'
import { mapGetters, mapMutations } from 'vuex'
import { login, userInfo } from '@/mock/'
import errRouterMap from '@/router/base/error'
import { formatMenuMap } from '@/utils/handleData'

export default {
  name: 'Login',
  mixins: [ResizeMixin],
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value.length < 1) {
        callback(new Error('账号必须填写!'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 1) {
        callback(new Error('密码必须填写!'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      passwordType: 'password',
      loading: false,
      showDialog: false
    }
  },
  computed: {
    ...mapGetters([
      'themeColor',
      'device'
    ])
  },
  created() {
    // this._getUserInfo()
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          // login(this.loginForm.username.trim(), this.loginForm.password.trim()).then(res => {
          const data = login.data
          this.setToken(data.token)

          this._getUserInfo()
          // }).catch(() => {
          //   this.loading = false
          // })
        } else {
          return false
        }
      })
    },
    _getUserInfo() {
      // userInfo().then((res) => {
      const data = userInfo.data
      this.setBaseInfo(data.baseInfo)
      const menuMap = formatMenuMap(data.permission)
      let secondMenuIndex = null
      if (menuMap[0] && menuMap[0].children[0] && menuMap[0].children[0].children[0]) {
        secondMenuIndex = menuMap[0].children[0].children[0]
      } else {
        secondMenuIndex = { url: '/page/401' }
      }

      // 获取当前版本并加载当前版本的路由
      let routers = require('@/router/admin/').default
      routers = [].concat(routers, {
        path: '/',
        redirect: secondMenuIndex.url
      }, errRouterMap)
      this.$router.addRoutes(routers)

      // 初始化菜单和默认显示菜单
      this.setMenuMap(menuMap)
      this.setMenuIndex([0, secondMenuIndex, secondMenuIndex.url])
      // })
    },
    ...mapMutations({
      setMenuMap: 'SET_MENU_MAP',
      setMenuIndex: 'SET_MENU_INDEX',
      setToken: 'SET_TOKEN',
      setBaseInfo: 'SET_BASE_INFO'
    })
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  $light_gray:#3B3B4D;
  $dark_gray: #24CBDA;
  $cursor: #fff;

  @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input{
      color: $cursor;
      &::first-line {
        color: $light_gray;
      }
    }
  }

  /* reset element-ui css */
  .login-container {
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        caret-color: $dark_gray;
        &:-webkit-autofill {
          box-shadow: 0 0 0px 1000px $cursor inset !important;
          -webkit-text-fill-color: $light_gray !important;
        }
      }
    }
    .el-form-item {
      border: 1px solid #eaeaea;
      background:$cursor;
      border-radius: 5px;
      color: #454545;
    }
  }
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg: #fff;
$dark_gray: #24CBDA;
$light_gray: #3B3B4D;

.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;
  .login-form {
    max-width: 500px;
    padding: 35px 35px 15px 35px;
    margin: 20vh auto;
    background:$bg;
    box-shadow: 0 0 25px #cac6c6;
    border-radius:20px;
    .username {
      margin: 30px 0
    }
    .password {
      margin-bottom: 30px;
    }
    .btn-login {
      height: 45px;
      font-size:14px;
    }
  }
  .icon-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    &_login {
      font-size: 20px;
    }
  }
  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .set-language {
      color: #fff;
      position: absolute;
      top: 5px;
      right: 0px;
    }
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .thirdparty-button {
    position: absolute;
    right: 35px;
    bottom: 28px;
  }
}
#bg-canvas {
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
