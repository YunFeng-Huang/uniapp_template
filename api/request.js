// const baseUrl = 'https://d-applet.iuctrip.com';
import store from '@/store/index.js';
import queue from '@/api/queue.js';

// type config:{
// 	hasToken :bool，
//  leaveQueue :false
// }
const fetch = async (url, data, config) => {
	const {
		domain,
		merchantId
	} = store.state.extConfig;
	
	
	const fn = () => new Promise(async (resolve, reject) => {
	let token = uni.getStorageSync('token'); 
	console.log(token,data)
	if (!token && (config?.hasToken ?? true)) {
		await store.dispatch('USERLOGIN');
	}
	let header = {
		'Content-Type': 'application/json;charset=UTF-8',
		'token': uni.getStorageSync('token'),
		'gray-version': 'develop-3.56',
		'merchant-id': merchantId
	}
	
	data = {
		...data,
		...{
			merchantId
		}
	}
	
	if (data.qs) {
		header['Content-Type'] = 'application/x-www-form-urlencoded'
	}
	
	let option = {
		...{
			method: 'POST',
			header: header,
			dataType: 'json',
		},
		...data,
		...{
			url: domain + url,
			data,
		}
	}
		
		uni.request(option).then((res) => {
			if (!res[0]) {
				if (res[1].data.success) {
					resolve(res[1].data)
				} else {
					reject(res[1].data)
				}
			} else {
				reject(res[0].errMsg)
			}
		})
	});
	return queue(fn,config);
};
export default fetch;
