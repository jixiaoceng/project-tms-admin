import store from '@/store'

export function $showPreview(options) {
  store.commit('SET_PREVIEW_OPTIONS', options)
}

export function $setPageTitle(title) {
  store.commit('SET_PAGE_TITLE', title)
}
