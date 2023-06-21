// import utils from '../../utils/utils'
// utils.toast('test')
Page({
  data: {
    announcement: [],
  },
  onLoad() {
    this.getAnnouncement()
  },
  async getAnnouncement() {
    const { code, data: res } = await wx.http.get('/announcement')
    if (code !== 10000) return wx.utils.toast()
    this.setData({ announcement: res })
  },
})
