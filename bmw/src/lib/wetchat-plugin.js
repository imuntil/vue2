/**
 * Created by 斌 on 2017/5/16.
 */
import axios from 'axios'
const wx = require('weixin-js-sdk')
import _ from 'lodash'
const configUrl = 'http://api.jtuntech.com/event/2015/roewe/jssdk.php?act=config'

export default {
  config (debug = true) {
    let that = this
    axios.get(configUrl)
      .then(res => {
        let data = res.data
        that.__setConfig(data, debug)
        wx.ready(function () {
          that.shareOne()
          that.shareAll()
        })
      })
      .catch(err => {
        console.log(err)
      })
  },
  shareOne (_cw) {
    let cw = !_.isEmpty(_cw) ? Object.assign(this.cw, _cw) : this.cw
    wx.onMenuShareAppMessage({
      title: cw.title,
      desc: cw.desc,
      link: cw.link,
      imgUrl: cw.imageUrl,
      success () {
        return true
      },
      error (err) {
        throw new Error(err)
      }
    })
  },
  shareAll (_cw) {
    let cw = !_.isEmpty(_cw) ? Object.assign(this.cw, _cw) : this.cw
    wx.onMenuShareTimeline({
      title: cw.title,
      link: cw.link,
      imgUrl: cw.imageUrl,
      success () {
        return true
      },
      error (err) {
        throw new Error(err)
      }
    })
  },
  __setConfig (data, debug) {
    wx.config({
      debug: debug,
      appId: data['AppId'],
      timestamp: data['Stamp'],
      nonceStr: data['NonceStr'],
      signature: data['Signature'],
      jsApiList: [
        'onMenuShareTimeline',
        'onMenuShareAppMessage'
      ]
    })
  },
  /**
   * @param cw {object} [title, desc, link, imageUrl]
   * @private
   */
  setCopyWriter (cw) {
    this.cw = Object.assign(this.cw, cw)
  },
  cw: {
    title: 'bmw...',
    desc: '...',
    link: location.href,
    imageUrl: 'http://api.jtuntech.com/event/2017/Q2/wind-tunnel/static/qr-code.png'
  }
}
