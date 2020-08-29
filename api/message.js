import { Request } from '@/utils/request.js'

/**
 * 获取所有通知信息
 */
export async function GetMessageList() {
	return await Request("/message")
}
