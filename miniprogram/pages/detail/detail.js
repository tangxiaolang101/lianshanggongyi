// miniprogram/pages/detail/detail.js
const app = getApp();
import base64 from './base64.js';




Page({

  /**
   * 页面的初始数据
   */
  data: {
      ALICE: {
          bcname: 'hackathon_test_chain_1',
          from_addr: 'Qs86VUufSnvYRtQWR6udeMGeSLF4t2KqP',
          from_pubkey: "{\"Curvname\":\"P-256\",\"X\":36736386634720011818436550464316326485563747804054808451648239094304649038268,\"Y\":27542503378751205168977832155863702862296545317985758115489453943046398231859}",
          from_scrkey: "{\"Curvname\":\"P-256\",\"X\":36736386634720011818436550464316326485563747804054808451648239094304649038268,\"Y\":27542503378751205168977832155863702862296545317985758115489453943046398231859,\"D\":73996212855244161880263027141519688064782010821453650888847863338499355124972}",
          account: [{
              address: 'esf2ndvHRBmnLSVDgo5AWV6Wi1GubzeQT',
              amount: '1'
          }],
          nonce: "1532007621",
          timestamp: 1532007621000000000,
          desc: "5rWL6K+V5Y+R56Wo",
          header: {
              logid: '10087'
          }
      },
      BOB: {
          bcname: 'hackathon_test_chain_1',
          from_addr: 'esf2ndvHRBmnLSVDgo5AWV6Wi1GubzeQT',
          from_pubkey: "{\"Curvname\":\"P-256\",\"X\":97561622396630001589535411987234111828555769263828475743670874703574782987279,\"Y\":24482651956706389974853658167461778898779178036276826647221287548208112334847}",
          from_scrkey: "{\"Curvname\":\"P-256\",\"X\":97561622396630001589535411987234111828555769263828475743670874703574782987279,\"Y\":24482651956706389974853658167461778898779178036276826647221287548208112334847,\"D\":20324970831647479434416828077494401770330025920617621063044653637450446222377}",
          account: [{
              address: 'Qs86VUufSnvYRtQWR6udeMGeSLF4t2KqP',
              amount: '1'
          }],
          nonce: "1532007621",
          timestamp: 1532007621000000000,
          desc: "5rWL6K+V5Y+R56Wo",
          header: {
              logid: '10086'
          }
      }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  payIcon() {
      let deSr = app.globalData.userInfo.nickName + "捐赠 2000 元，来自" + app.globalData.userInfo.country;
      let desBase = base64.prototype.encode(deSr);
      this.data.ALICE.desc = desBase;
      wx.request({
          url: 'http://10.195.78.33:8084/v1/generate_tx',
          method: 'POST',
          data: this.data.ALICE,
          success: res => {
              console.log('111', res);
              this.data.postData = res.data;
              wx.request({
                  url: 'http://10.195.78.33:8084/v1/post_tx',
                  method: "POST",
                  data: this.data.postData,
                  success: res => {
                      console.log('333', res);
                  }
              })
          },
          fail: err => {
              console.log('222', err)
          }
      })
  },

  checkIcon() {
      wx.request({
          url: 'http://10.195.78.33:8084/v1/query_tx',
          method: 'POST',
          data: {
              bcname: 'hackathon_test_chain_1',
              txid: this.data.postData.tx.txid
          },
          success: res => {
              console.log('4444', res);
              wx.showModal({
                  title: '查询结果',
                  content: res.data.tx.desc + ' 解码：' + base64.prototype.decode(res.data.tx.desc),
              })
          }
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})