import wx from 'weixin-js-sdk'
import fetch from './fetch'
import { IRes } from './request'
import { setTimeout } from 'timers'

const ready: () => Promise<any> = async () => {
  const { data, err }: IRes = await fetch(
    'http://api.jtuntech.com/event/2015/roewe/jssdk.php?act=config'
  )
  if (err) {
    return Promise.reject(err)
  }
  wx.config({
    debug: true,
    appId: data.AppId,
    timestamp: data.Stamp,
    nonceStr: data.NonceStr,
    signature: data.Signature,
    jsApiList: [
      'onMenuShareTimeline',
      'onMenuShareAppMessage',
      // 'onMenuShareQQ',
      // 'onMenuShareWeibo',
      // 'onMenuShareQZone',
      // 'startRecord',
      // 'stopRecord',
      // 'onVoiceRecordEnd',
      // 'playVoice',
      // 'pauseVoice',
      // 'stopVoice',
      // 'onVoicePlayEnd',
      // 'downloadVoice',
      // 'chooseImage',
      // 'previewImage',
      // 'uploadImage',
      // 'downloadImage',
      // 'translateVoice',
      // 'getLocation',
      // 'hideOptionMenu',
      // 'showOptionMenu',
      // 'hideMenuItems',
      // 'showMenuItems',
      // 'hideAllNonBaseMenuItem',
      // 'showAllNonBaseMenuItem',
      // 'closeWindow',
      // 'scanQRCode',
      'chooseWXPay'
      // 'openProductSpecificView',
      // 'addCard',
      // 'chooseCard'
    ]
  })

  // wx.ready((e: any) => Promise.resolve(e))
  // wx.error((e: any) => Promise.reject(e))
  return new Promise((resolve, reject) => {
    wx.ready((e: any) => {
      console.log('wx ready')
      resolve(e)
    })
    wx.error((e: any) => {
      console.log('wx error')
      reject(e)
    })
  })
}
// setTimeout(ready, 2000)

export interface IContent {
  title?: string
  desc?: string
  link?: string
  imgUrl?: string
  [prop: string]: string | undefined
}
export default class Wx {
  public static content: IContent
  /**
   * 分享到朋友圈
   */
  public static shareTimeLine: (
    customContent?: IContent
  ) => Promise<any> = cc => {
    return new Promise((resolve, reject) => {
      const ct = { ...Wx.content, ...cc }
      wx.onMenuShareTimeline({
        success: resolve,
        cancel: reject,
        ...ct
      })
    })
  }
  /**
   * 分享给好友
   */
  public static shareAppMessage: (
    customContent?: IContent
  ) => Promise<any> = cc => {
    return new Promise((resolve, reject) => {
      const ct = { ...Wx.content, ...cc }
      wx.onMenuShareAppMessage({
        type: 'link',
        dataUrl: '',
        success: resolve,
        cancel: reject,
        ...ct
      })
    })
  }
  /**
   * 微信支付(公众号支付)
   */
  public static chooseWXPay: () => Promise<any> = () => {
    return new Promise((resolve, reject) => {
      wx.chooseWXPay({
        // x
        success: resolve
      })
    })
  }
  /**
   * 设置默认分享
   */
  public static defaultShare: (content: IContent) => any = content => {
    Wx.content = { ...Wx.content, ...content }
    Wx.shareAppMessage()
    Wx.shareTimeLine()
  }
  /* wx ready */
  public static wxReady: (content: IContent) => void = c => {
    ready()
      .then(() => {
        console.log('WxReady')
        Wx.defaultShare(c)
      })
      .catch(e => {
        console.log(e)
      })
  }
}
