<template>
  <div class="side-wrapper flex-wrapper">
    <module-menu v-if="device === 'mobile'" direction="vertical" />
    <second-menu class="second-menu" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ModuleMenu from '../ModuleMenu'
import SecondMenu from '../SecondMenu'

export default {
  components: { ModuleMenu, SecondMenu },
  computed: {
    ...mapGetters([
      'permission_routers',
      'sidebar',
      'routerMap',
      'themeColor',
      'device'
    ]),
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>

<style lang="scss" scoped>
// .side-wrapper {
//   height: 100%;
// }
</style>

