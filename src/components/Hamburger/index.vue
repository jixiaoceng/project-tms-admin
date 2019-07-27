<template>
  <div
    :class="{'desktop-active':!isActive && device !== 'mobile', 'mobile-active':!isActive && device === 'mobile', 'desktop': device !== 'mobile', 'mobile': device === 'mobile'}"
    class="hamburger flex-wrapper flex-direction-column flex-space-between"
    @click="toggleClick"
  >
    <div class="line line1" />
    <div class="line line2" />
    <div class="line line3" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Hamburger',
  props: {
    isActive: {
      type: Boolean,
      default: false
    },
    toggleClick: {
      type: Function,
      default: null
    }
  },
  computed: {
    ...mapGetters([
      'device'
    ])
  }
}
</script>

<style lang="scss" scoped>
.hamburger {
  cursor: pointer;
  width: 26px;
  height: 20px;
  .line {
    width: 100%;
    height: 3px;
    background-color: #333;
    transition: all .38s;
    -webkit-transition: all .38s;
  }
  &.desktop {
    .line {
      transform: rotate(0deg);
      opacity: 1;
    }
  }
  &.desktop-active {
    .line1 {
      transform: rotate(45deg) translate(6px, 6px);
    }
    .line2 {
      opacity: 0;
      transform: rotate(90deg);
    }
    .line3 {
      transform: rotate(-45deg) translate(6px, -6px);
    }
  }
  &.mobile {
    .line1 {
      transform: rotate(45deg) translate(6px, 6px);
    }
    .line2 {
      opacity: 0;
      transform: rotate(90deg);
    }
    .line3 {
      transform: rotate(-45deg) translate(6px, -6px);
    }
  }
  &.mobile-active {
    .line {
      transform: rotate(0deg);
      opacity: 1;
    }
  }
}
</style>
