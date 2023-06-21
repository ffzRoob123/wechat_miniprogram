// app.js
import './utils/utils'
import './utils/http'

App({
  globalData: {},
  onLaunch() {
    this.getToken()
  },
  getToken() {
    this.token = wx.getStorageSync('token')
    this.refreshToken = wx.getStorageSync('refreshToken')
  },
  setToken(key, token) {
    this[key] = token
    wx.setStorageSync(key, token)
  },
})
