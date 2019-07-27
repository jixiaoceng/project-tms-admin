const lingoUI = {
  state: {
    // 表格选中数组
    tableSelectArr: [],
    // 预览数据
    previewOptions: {
      isShow: false,
      fileType: 1,
      previewData: [],
      index: 0
    }
  },
  mutations: {
    // 设置表格选中数组
    SET_TABLE_SELECT_ARR(state, arr) {
      state.tableSelectArr = arr
    },
    // 设置预览参数
    SET_PREVIEW_OPTIONS(state, options) {
      state.previewOptions = options
    }
  }
}

export default lingoUI
