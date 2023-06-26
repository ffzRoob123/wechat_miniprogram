// components/authorization/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {
    isLogin: false,
  },

  lifetimes: {
    attached() {
      const isLogin = !!getApp().token
      this.setData({ isLogin })
      const pageStack = getCurrentPages()
      const currentPage = pageStack.pop()
      if (!isLogin) {
        currentPage.onLoad = () => {}
        currentPage.onShow = () => {}
        wx.redirectTo({
          url: '/pages/login/index?redirectUrl=/' + currentPage.route,
        })
      }
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {},
})
