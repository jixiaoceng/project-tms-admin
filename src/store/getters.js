const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  themeColor: state => state.app.themeColor,
  pageTitle: state => state.app.pageTitle,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  introduction: state => state.user.introduction,
  status: state => state.user.status,
  roles: state => state.user.roles,
  userId: state => state.user.userId,
  setting: state => state.user.setting,
  department: state => state.user.department,
  userName: state => state.user.userName,
  menuMap: state => state.tabs.menuMap,
  menuIndexObj: state => state.tabs.menuIndexObj,
  moduleMenuIndex: state => state.tabs.moduleMenuIndex,
  secondMenuIndex: state => state.tabs.secondMenuIndex,
  currentPath: state => state.tabs.currentPath,
  tableSelectArr: state => state.lingoUI.tableSelectArr,
  previewOptions: state => state.lingoUI.previewOptions
}
export default getters
