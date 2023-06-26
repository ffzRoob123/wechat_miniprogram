const utils = {
  /**
   * 消息反馈（轻提示）
   * @param {string} title 文字提示内容
   */
  toast(title = '数据加载失败...') {
    wx.showToast({
      title,
      mask: true,
      icon: 'none',
    })
  },
  // 格式化显示时间
  dataFormat(timestamp) {
    // 创建时间对象
    const date = new Date(timestamp)
    // 获取年月日，以年月日的形式展示数据
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    // 日期格式为年-月-日
    return [year, month, day].map((item) => (item > 9 ? item : '0' + item)).join('-')
  },
}

// 正常模块导出
export default utils
// 挂载到全局对象
wx.utils = utils
