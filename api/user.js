import { Request } from '@/utils/request.js'

/**
 * 获取用户信息
 */
export async function GetUserInfo() {
	return await Request("/user/info", {}, 'post')
}

/**
 * 用户注销
 */
export async function UserLonginOut() {
	return await Request("/user/login/out", {}, 'post')
}

