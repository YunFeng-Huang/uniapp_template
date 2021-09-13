export default {
	namespaced: true,
	state: {
		name: '',
		userInfo: {},
	},
	mutations: {
		// 保存活动信息
		saveName(state, name) {
			state.name = name;
		},
		// 保存用户信息
		saveUserInfo(state, data) {
			state.userInfo = { ...state.userInfo, ...data };
		},
	},
	getters: {
		age(state) {
			return state.userInfo.age;
		},
	},
	actions: {
		getName({ commit }, data) {
			commit('saveName', data);
		},
	},
};
