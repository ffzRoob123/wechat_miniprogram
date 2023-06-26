// house_pkg/pages/locate/index.ts
import QQMap from '../../../utils/qqmap'

Page({
  data: {
    point: [],
    address: '',
  },
  onLoad() {
    this.getLocation()
  },
  async getLocation() {
    const { latitude, longitude } = await wx.getLocation({
      isHighAccuracy: true,
    })
    this.getPoint(latitude, longitude)
  },
  async chooseLocation() {
    const { latitude, longitude } = await wx.chooseLocation()
    this.getPoint(latitude, longitude)
  },
  getPoint(latitude, longitude) {
    console.log(latitude, longitude)
    wx.showLoading({
      title: '正在获取...',
    })
    QQMap.reverseGeocoder({
      location: `${latitude},${longitude}`,
      success: ({ result: { address } }) => {
        console.log(address)
        this.setData({ address })
      },
    })
    QQMap.search({
      keyword: '泰合百花公园',
      location: `${latitude},${longitude}`,
      page_size: 5,
      success: (res) => {
        const point = res.data.map(({ id, title, _distance }) => {
          return { id, title, _distance }
        })
        this.setData({ point })
      },
      fail: (err) => {
        console.log(err)
      },
      complete: () => {
        wx.hideLoading()
      },
    })
  },
})
