import fetch from '@/api/request.js'
// import store from '@/store/index.js';
// import {formatGetUri} from '@/api/util.js';
// store.commit('EXTCONFIG')
let ISWX = true
//#ifndef MP-WEIXIN
ISWX = false
//#endif
// 'POST GET//必须大写，为了兼容其他应用'
let weixin_login = (params) => fetch('/api/destination/applet/weixin/member/weixin_login', params)
let member_login = (params) => fetch('/api/destination/applet/member/login', params)



export default {
	login: ISWX ? weixin_login : member_login,
}
