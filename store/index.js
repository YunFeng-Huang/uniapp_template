import Vue from 'vue';
import Vuex from 'vuex';
import api from '@/api/index.js'
import createPersistedState from 'vuex-persistedstate';
import Setting from './modules/setting.js';
// 创建持久化配置
const dataState = createPersistedState({
	storage: {
		getItem: key => uni.getStorageSync(key),
		setItem: (key, value) => uni.setStorageSync(key, value),
		removeItem: key => uni.removeStorageSync(key),
	}, // 持久化方式
	paths: ['token'], // 持久化数据 持久化token
});

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
			system: {},
			extConfig: {},
			statusBar: '',
			customBar: '',
			userInfo:uni.getStorageSync('userInfo'),
			signInfo:null,
		},
		mutations: {
			SETSTATE(state, {type,value}){
				state[type] = value
			},
			EXTCONFIG(state, value) {
				try {
					const res = uni.getSystemInfoSync();
					console.log(res, 'getSystemInfoSync')
					state.system = res
					// #ifdef MP-ALIPAY
						state.extConfig = my.getExtConfigSync() ? my.getExtConfigSync() : {}
					//#endif
					//#ifndef MP-ALIPAY
						state.extConfig = uni.getExtConfigSync ? uni.getExtConfigSync() : {}
					//#endif
					console.log(state.extConfig,'state.extConfig')
					let e = res;
					let statusBar = 0
					let customBar = 0
					// #ifdef MP
					statusBar = e.statusBarHeight
					customBar = e.statusBarHeight + 45
					if (e.platform === 'android') {
						customBar = e.statusBarHeight + 50
					}
					// #endif
					// #ifdef MP-WEIXIN
					statusBar = e.statusBarHeight
					// @ts-ignore
					const custom = wx.getMenuButtonBoundingClientRect()
					customBar = custom.bottom + custom.top - e.statusBarHeight
					// #endif
					// #ifdef MP-ALIPAY
					statusBar = e.statusBarHeight
					customBar = e.statusBarHeight + e.titleBarHeight
					// #endif
					// #ifdef APP-PLUS
					console.log('app-plus', e)
					statusBar = e.statusBarHeight
					customBar = e.statusBarHeight + 45
					// #endif
					// #ifdef H5
					statusBar = 0
					customBar = e.statusBarHeight + 45
					// #endif
					state.statusBar = statusBar
					state.customBar = customBar
					console.log(state.statusBar, 'state.statusBar')
					console.log(state.customBar, 'state.customBar')
				} catch (e) {
					console.log(e)
					uni.showToast({
						title: '设备信息获取失败',
						icon: 'none',
					})
				}
			},
		},
		actions: {
			USERLOGIN({
				commit,
				state
			}, value) {
				return new Promise((resolve,enject)=>{
					function weixin_login(code){
						console.log(code,'code',state)
						api.pages.login({
							"authCode": code,
							"appId": state.extConfig.appid,
							"scopes": "auth_base"
						}).then(res => {
							console.log('login')
							console.log(res, 'login')
							uni.setStorageSync('token', res.token)
							uni.setStorageSync('scopes', "auth_base")
							resolve()
						}).catch(()=>{
							enject()
						})
					}
					//#ifdef MP-WEIXIN
					uni.login({
						success: function(res) {
							console.log(res,'uni.login')
							weixin_login(res.code)
						}
					});
					//#endif
					//#ifdef MP-ALIPAY
					my.getAuthCode({
					  scopes: ['auth_base'],
					  success: (res) => {
						  console.log(res,'getAuthCode')
						  weixin_login(res.authCode)
					  },
					});
					//#endif
					
				})
			},
			GETUSERINGO({
				commit,
				state
			}, {encryptedData,iv}) {
				return new Promise(resolve => {
					api.pages.weixin_unionId({
						"encryptedData": encryptedData,
						"iv": iv,
					}).then(res => {
						uni.setStorageSync('token', res.token)
						uni.setStorageSync('scopes', "auth_user")
						return resolve();
					})
				})
			},
			GETLOCATION(state, value){
				return new Promise((resolve,enject)=>{
					// 获取位置信息
					uni.getSetting({
					  success: (res) => {
					    console.log(res)
					    if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {//非初始化进入该页面,且未授权
					      uni.showModal({
					        title: '是否授权当前位置',
					        content: '需要获取您的地理位置，请确认授权，否则无法获取您所需数据',
					        success(res) {
					          console.log(res)
					          if (res.cancel) {
					            uni.showToast({
					              title: '授权失败',
					              duration: 1000
					            })
											enject()
					          } else if (res.confirm) {
					            uni.openSetting({
					              success(dataAu) {
					                console.log(dataAu)
					                if (dataAu.authSetting["scope.userLocation"] == true) {
					                  uni.showToast({
					                    title: '授权成功',
					                    duration: 1000
					                  })
					                  // this.getLocation();
														resolve()
					                } else {
					                  uni.showToast({
					                    title: '授权失败',
					                    duration: 1000
					                  })
														enject()
					                }
					              }
					            })
					          }
					        }
					      })
					    } else if (res.authSetting['scope.userLocation'] == undefined) {//初始化进入
					      // that.getLocation(that);
								resolve()
					    }
					    else { //授权后默认加载
					      // that.getLocation(that);
								resolve()
					    }
					  }
					})
					
				})
			}
		},
	modules: {
		setting: Setting, // 定义子vuex模块 moduleA为模块的命名空间名
	},
	plugins: [dataState],
});
