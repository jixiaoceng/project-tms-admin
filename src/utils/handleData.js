/**
 * 根据id获取当前数据
 * @param {Number, String} id id值
 * @param {String} idName id名字，比如id，brandId
 * @param {Array} arrData 数据数组
 */
export function getInfoById(id, idName, arrData) {
  for (let j = 0, len = arrData.length; j < len; j++) {
    if (Number(id) === Number(arrData[j][idName])) {
      return arrData[j]
    }
  }
}

/**
 * 过滤传参中无效的key-value
 * @param {Object} obj 参数集合
 */
export function sortParams(obj) {
  const newObj = obj
  for (const item in newObj) {
    if (newObj[item] === null || newObj[item] === '' || newObj[item] === [] || newObj[item] === undefined) {
      delete newObj[item]
    }
  }
  return newObj
}

/**
 * 取字节长度
 * @param {String} str 需要获取字节长度的字符串
 */
export function getByteLength(str) {
  if (str === '') return 0
  let len = 0
  for (let i = 0, length = str.length; i < length; i++) {
    var c = str.charCodeAt(i) > 255 ? 2 : 1
    len += c
  }
  return len
}

/**
 * 过滤menuMap
 * @param {Object} menuMap
 */
export function formatMenuMap(menuMap) {
  const newMenuMap = []
  for (let i = 0, length = menuMap.length; i < length; i++) {
    if (menuMap[i].children && menuMap[i].children.length > 0) {
      newMenuMap.push(menuMap[i])
    }
  }
  return newMenuMap
}

/**
 * 生成menuIndex
 * @param {Object} menuMap
 */
export function getMenuIndex(menuMap) {
  const newMenuMap = formatMenuMap(menuMap)
  const menuIndex = {}
  for (let i = 0, length = newMenuMap.length; i < length; i++) {
    const secondMenuMap = newMenuMap[i].children
    if (!secondMenuMap) continue
    for (let l = 0, length = secondMenuMap.length; l < length; l++) {
      const thirdMenuMap = secondMenuMap[l].children
      if (!thirdMenuMap) continue
      for (let m = 0, length = thirdMenuMap.length; m < length; m++) {
        const key = thirdMenuMap[m]['url']
        const value = [i, thirdMenuMap[m], key]
        menuIndex[key] = value
      }
    }
  }
  return menuIndex
}
