<template>
	<view>
		<view class="cu-form-group margin-top">
			<view class="title">邮箱</view>
			<input placeholder="请输入您的邮箱地址" name="input"></input>
		</view>
		<view class="cu-form-group align-start">
			<view class="title">文本框</view>
			<textarea maxlength="-1" :disabled="modalName!=null" @input="textareaBInput" placeholder="请描述您遇到的问题或者直接联系在线客服"></textarea>
		</view>
		<view class="bg-red text-white text-center btn_sub margin-bottom">提交</view>
		<view class="text-sm text-gray padding">如遇问题不能解决请联系<text class="text-blue" @click="handleClickGoService">客服</text></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				modalName: null,
			}
		},
		methods: {
			textareaBInput(e) {
				this.textareaBValue = e.detail.value
			},
			handleClickGoService() {
				uni.navigateTo({
					url: "/pages/index/customer/customer"
				})
			}
		}
	}
</script>

<style>
	.btn_sub {
		width: 93%;
		line-height: 2.5;
		border-radius: 5px;
		margin: 0 auto;
	}
</style>
