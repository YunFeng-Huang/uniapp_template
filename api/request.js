

// const baseUrl = 'https://d-applet.iuctrip.com';
import store from '@/store/index.js';

const fetch = async (url,data,config) => {
	let token = uni.getStorageSync('token')
	const baseUrl = store.state.extConfig.domain;
	if(!token && (config?.hasToken ?? true )) {
		await store.dispatch('USERLOGIN');
		token = uni.getStorageSync('token')
	}
	console.log(config?.hasToken,token,url);
	return new Promise(function(resolve, reject) {
		let header = {
			'Content-Type': 'application/json;charset=UTF-8',
			'token': token,
			'gray-version': 'develop-3.56',
		}
		if(data.qs){
			header['Content-Type'] = 'application/x-www-form-urlencoded'
		}
		let option = {...{
			method: 'POST',
			header: header,
			dataType: 'json',
		},...data,...{
			url:baseUrl + url,
			data,
		}}
		console.log(option,'option')
		uni.request(option).then((res) => {
			console.log(res,'res')
			if(!res[0]){
				if(res[1].data.success){
					resolve(res[1].data)
				}else{
					reject(res[1].data.message,res[1].data)
				}
			}else{
				// uni.hideLoading();
				// NOLOGIN && needToast && uni.showToast({
				// 	title:res[0].errMsg,
				// 	icon:'none'
				// })
				reject(res[0].errMsg)
			}
		})
	})
};
export default fetch
