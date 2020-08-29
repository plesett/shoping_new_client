<template>
	<view>
		<view>
			<image src="http://img4.imgtn.bdimg.com/it/u=1050497718,1051151182&fm=26&gp=0.jpg" mode="" style="width: 100%;"></image>
		</view>
		<view class="text-center text-left text-red padding">总以为岁月漫长 有大把时间来晚会和原谅。也以为 有那么几个瞬间 你喜欢我。</view>
		<Product :data="data"></Product>
	</view>
</template>

<script>
	import Product from "@/compoents/product.vue"
	import {GetProductThingList} from '@/api/product.js'
	export default {
		data() {
			return {
				data: []
			}
		},
		components:{
			Product
		},
		mounted: function(){
			GetProductThingList().then(res => {
				this.data = res
			})
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
