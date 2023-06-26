// house_pkg/pages/building/index.ts
Page({
  data: {
    point: '',
    type: '',
    size: 0,
  },

  onLoad({ point }) {
    this.generateFakeData(point)
  },
  generateFakeData(point) {
    const size = Math.floor(Math.random() * 4) + 6
    const type = size > 5 ? '号楼' : '栋'
    this.setData({ size, type, point })
  },
})
