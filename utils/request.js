import { config } from '@/api/index.js'

export function Request(url, data = {}, method = 'GET') {
	return new Promise((resolve, reject) => {
		uni.request({
			url: config.api + url,
			data,
			method,
			header: {
				'Authorization': `Bearer ${uni.getStorageSync('token')}`
			},
			success: (res) => {
				// 无权限则跳转登录页
				if(res.statusCode === 401) {
					uni.navigateTo({
						url: "/pages/me/login/login"
					})
				}
				resolve(res.data)
			},
			fail: (error) => {
				reject(error)
			}
		})
	})
}
