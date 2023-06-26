// map.js
// 导入位置服务SDK
import qqMap from '../../../utils/qqmap'

Page({
  data: {
    latitude: 40.060539,
    longitude: 116.343847,
    markers: [
      {
        id: 1,
        latitude: 40.22077,
        longitude: 116.23128,
        width: 24,
        height: 30,
      },
      {
        id: 2,
        latitude: 40.225857999999995,
        longitude: 116.23246699999999,
        iconPath: '/static/images/marker.png',
        width: 40,
        height: 40,
      },
    ],
  },
  onLoad({ id }) {
    // console.log(id)
    // 获取报修详情的数据
    this.getRepairDetail(id)
    // 获取路径坐标
    this.getPolyline()
  },
  // 报修详情接口
  async getRepairDetail(id) {
    if (!id) return wx.utils.toast('参数有误!')
    // 调用接口
    const { code, data: repairDetail } = await wx.http.get('/repair/' + id)
    // 检测接口是否调用成功
    if (code !== 10000) return wx.utils.toast()
    // 渲染数据
    this.setData({ repairDetail })
  },
  // 调用位置服务（路线规划）
  getPolyline() {
    qqMap.direction({
      mode: 'bicycling',
      from: '40.227978,116.22998',
      to: '40.22077,116.23128',
      success: ({ result }) => {
        const coors = result.routes[0].polyline
        const points = []

        //坐标解压（返回的点串坐标，通过前向差分进行压缩）
        for (let i = 2; i < coors.length; i++) {
          coors[i] = Number(coors[i - 2]) + Number(coors[i]) / 1000000
        }

        // 获取经纬度
        for (let i = 0; i < coors.length; i += 2) {
          points.push({ latitude: coors[i], longitude: coors[i + 1] })
        }

        // 渲染数据
        this.setData({
          latitude: points[30].latitude,
          longitude: points[30].longitude,
          polyline: [
            {
              points,
              color: '#5591af',
              width: 4,
            },
          ],
        })
      },
    })
  },
  // 修改报个信息
  editRepair(ev) {
    wx.navigateTo({
      url: '/repair_pkg/pages/form/index?id=' + ev.mark.id,
    })
  },
  // 取消报修
  async cancelRepair(ev) {
    // 调用接口
    const { code } = await wx.http.put('/cancel/repaire/' + ev.mark.id)
    // 检测接口是否调用成功
    if (code !== 10000) return wx.utils.toast()
    // 跳转到报修列表页面
    wx.navigateTo({
      url: '/repair_pkg/pages/list/index',
    })
  },
})
