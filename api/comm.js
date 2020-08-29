import { Request } from '@/utils/request.js'

/**
 * 删除阿里云图片
 */
export async function DeleteAliOOS(key) {
	return await Request(`/delete?key=${key}`, {}, 'delete')
}

/**
 * @param {string} mobile
 */
export async function GetMobileCode(mobile) {
	return await Request(`/code/${mobile}`, {}, 'post')
}

/**
 * 用户登录
 */
export async function UserLogin(data) {
	return await Request("/user/login", data, 'post')
}

/**
 * 用户注册
 */
export async function UserRegister(code, body) {
	return await Request(`/user?code=${code}`, body, 'post')
}

/**
 * 用户支付
 */
export async function UserPayPass(data) {
	return await Request("/pay/pay_pass", data, 'post')
}

