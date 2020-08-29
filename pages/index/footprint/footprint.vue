<template>
	<view>
		<view>
			<Product
				:data="data"
				name="foot"
			></Product>
		</view>
		<view class="text-center margin-top" v-if="data.length == 0">
			空空如也，赶快去浏览吧！
		</view>
	</view>
</template>

<script>
	import Product from '@/compoents/product.vue'
	import { GetProductBasics } from '@/api/product.js'
	export default {
		data() {
			return {
				data: []
			}
		},
		components: {
			Product
		},
		onShow: function() {
			let _this = this
			const value = uni.getStorageSync('footprint');
			if(!!value) {
				GetProductBasics(value.reverse()).then(res => {
					_this.data = res
				})
			} else {
				uni.showToast({
					title: '赶快去浏览商品吧！',
					icon: 'none'
				})
			}
		},
		methods: {

		}
	}
</script>

<style>

</style>
