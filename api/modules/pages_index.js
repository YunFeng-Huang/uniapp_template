import fetch from '@/api/request.js'
let ISWX = true
//#ifndef MP-WEIXIN
ISWX = false
//#endif
// 'POST GET//必须大写，为了兼容其他应用'
let weixin_login = (params) => fetch('/api/destination/applet/weixin/member/weixin_login', params,{
	hasToken:false,
})
let member_login = (params) => {
	console.log(params,'params');
	return fetch('/api/destination/applet/member/login', params,{
		hasToken:false,
	});
};
let weixin_unionId = (...params) => fetch('/api/destination/applet/weixin/member/weixin_unionId',params,{
	hasToken:false,
})
let scenic_spot_list = (params) => fetch('/api/destination/applet/scenic_spot/page', params)



export default {
	login: ISWX ? weixin_login : member_login,
	scenic_spot_list,
}
