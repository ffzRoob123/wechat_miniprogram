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
}

// 正常模块导出
export default utils
// 挂载到全局对象
wx.utils = utils
