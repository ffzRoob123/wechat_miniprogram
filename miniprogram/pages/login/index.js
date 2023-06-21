import wxValidate from 'wechat-validate'

const app = getApp()
Page({
  behaviors: [wxValidate],
  rules: {
    mobile: [
      { required: true, message: '请填写手机号码！' },
      { pattern: /^1[3-8]\d{9}$/, message: '请填写正确的手机号码！' },
    ],
    code: [
      { required: true, message: '请填写验证码！' },
      { pattern: /^\d{6}$/, message: '请填写正确的验证码！' },
    ],
  },
  data: {
    countDownVisible: false,
    mobile: '',
    code: '',
  },

  onLoad({ redirectUrl }) {
    this.redirectUrl = redirectUrl
  },
  countDownChange(ev) {
    this.setData({
      timeData: ev.detail,
      countDownVisible: ev.detail.minutes === 1 || ev.detail.seconds > 0,
    })
  },
  async getSMSCode() {
    const { valid, message } = this.validate('mobile')
    if (!valid) return wx.utils.toast(message)
    this.setData({ countDownVisible: true })
    const { code, data: res } = await wx.http.get('/code', { mobile: this.data.mobile })
    if (code !== 10000) return wx.utils.toast('验证码发送失败，请稍后重试！')
    this.setData({ code: res.code })
  },
  async submitForm() {
    if (!this.validate()) return
    const { code, data: res } = await wx.http.post('/login', {
      mobile: this.data.mobile,
      code: this.data.code,
    })
    if (code !== 10000) return wx.utils.toast('登录失败，请重试')
    app.setToken('token', res.token)
    app.setToken('refreshToken', res.refreshToken)
    wx.redirectTo({
      url: this.redirectUrl,
    })
  },
})
