import store from '@/store'

const { body } = document
const WIDTH = 820
const RATIO = 3

export default {
  watch: {
    $route(route) {
      if (this.device === 'mobile' && this.sidebar.opened) {
        store.commit('CLOSE_SIDEBAR', { withoutAnimation: false })
      }
    }
  },
  beforeMount() {
    window.addEventListener('resize', this.resizeHandler)
  },
  mounted() {
    const isMobile = this.isMobile()
    if (isMobile) {
      store.commit('TOGGLE_DEVICE', 'mobile')
      store.commit('CLOSE_SIDEBAR', { withoutAnimation: false })
    }
  },
  methods: {
    isMobile() {
      const rect = body.getBoundingClientRect()
      return rect.width - RATIO < WIDTH
    },
    resizeHandler() {
      if (!document.hidden) {
        const isMobile = this.isMobile()
        store.commit('TOGGLE_DEVICE', isMobile ? 'mobile' : 'desktop')

        if (isMobile) {
          store.commit('CLOSE_SIDEBAR', { withoutAnimation: false })
        } else {
          store.commit('OPEN_SIDEBAR', { withoutAnimation: false })
        }
      }
    }
  }
}
