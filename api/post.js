import { Request } from '@/utils/request.js'

/**
 * 获取帖子列表
 */
export async function GetPostList(id) {
	return await Request(`/forum?pageIndex=${1}`)
}

/**
 * 获取用户所欲帖子列表
 */
export async function GetUserPostList() {
	return await Request("/forum/user", {}, 'post')
}

/**
 * 创建帖子
 */
export async function CreatePostInfo(data) {
	return await Request(`/forum`, data, 'post')
}

/**
 * 获取帖子详情
 */
export async function GetPostInfo(id) {
	return await Request(`/forum/${id}`, {}, 'get')
}

/**
 * 评论帖子
 */
export async function CommentPostInfo(data) {
	return await Request("/forum/comment", data, 'post')
}
