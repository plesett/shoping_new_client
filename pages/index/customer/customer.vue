<template>
	<view>
		<view class="cu-form-group">
			客服QQ: <text class="text-orange">15409077804</text>
			<text class="cu-form-group text-gray text-center" @click="paste(1549080780)">
				<!-- #ifdef H5 -->
					长按复制
				<!-- #endif -->
				<!-- #ifndef H5 -->
					点击复制
				<!-- #endif -->
			</text>
		</view>
		<view class="cu-form-group">
			客服微信: <text class="text-orange">EXuuue</text>
			<text class="cu-form-group text-gray text-center" @click="paste('EXuuue')">
				<!-- #ifdef H5 -->
					长按复制
				<!-- #endif -->
				<!-- #ifndef H5 -->
					点击复制
				<!-- #endif -->
			</text>
		</view>
		<view class="cu-form-group"></view>
	</view>
</template>

<script>
	import { mapState } from 'vuex';
	export default {
		data() {
			return {

			}
		},
		computed:{
			...mapState(['env'])
		},
		methods: {
			paste(name) {
				if(this.env === 'h5') {
					
				} else {
					uni.setClipboardData({
						data: name
					});
				}
			},
			copyTXT: function(){

			}
		}
	}
</script>

<style>

</style>
