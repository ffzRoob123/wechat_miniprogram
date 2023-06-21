// pages/profile/index.ts
const pageStack = getCurrentPages()
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.setData({ ...app.userProfile })
  },

  getUserNickname(ev) {
    this.updateNickname(ev.detail.value)
  },
  async updateNickname(nickName) {
    if (nickName === '') return
    // 调用接口更新用户昵称
    const { code } = await wx.http.put('/userInfo', { nickName })
    // 检测接口是否调用成功
    if (code !== 10000) return wx.utils.toast('更新昵称失败!')
    // 借助于页面栈实例来更新数
    pageStack[0].setData({ nickName })

    // 同步数据到应用实例中
    app.userProfile.nickName = nickName
  },
  getUserAvatar(ev) {
    this.updateAvatar(ev.detail.avatarUrl)
  },
  // 更新用户头像
  updateAvatar(avatar) {
    // 调用 API 上传文件
    wx.uploadFile({
      // 接口地址
      url: wx.http.baseURL + '/upload',
      // 待上传的文件路径
      filePath: avatar,
      name: 'file',
      header: {
        // 用户登录状态
        Authorization: 'Bearer ' + getApp().token,
      },
      formData: {
        type: 'avatar',
      },
      success: (result) => {
        // console.log(result);
        // 处理返回的数据
        const data = JSON.parse(result.data)
        // 检测接口是否调用成功
        if (data.code !== 10000) return wx.utils.toast('上传头像失败!')
        // 渲染头像
        pageStack[0].setData({ avatar: data.data.url })

        // 在当前页面渲染头像
        this.setData({ avatar: data.data.url })
        // 同步更新数据到应用实例中
        app.userProfile.avatar = data.data.url
      },
    })
  },
})
