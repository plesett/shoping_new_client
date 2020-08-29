import { Request } from '@/utils/request.js'

/**
 * 获取商品列表
 */
export async function GetProductList(id) {
	return await Request(`/product?pageIndex=${id}`)
}

/**
 * 获取商品详情
 */
export async function GetProductDetaile(id) {
	return await Request(`/product/${id}`)
}

/**
 * 获取商品基本信息
 */
export async function GetProductBasics(data) {
	return await Request("/product/basics", data, 'post')
}

/**
 * 获取所有商品信息
 */
export async function GetProductClassifyList() {
	return await Request("/product/classify")
}

/**
 * 获取所有好物推荐商品信息
 */
export async function GetProductThingList() {
	return await Request("/product/thing")
}

/**
 * 参与商品
 */
export async function Ongoing(data) {
	return await Request("/ongoing", data, 'post')
}

