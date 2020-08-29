<template>
	<view class="content">
		<image src="../static/fenxaing.jpg" mode="" @longpress="handleClickSave"></image>
		<view class="text-center text-white">长按保存图片</view>
		<view class="text-center padding cuIcon-close text-white" style="font-size: 25px;" @click="handleClickClose"></view>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	export default {
		name: 'Poster',
		data() {
			return {
				localimg: ''
			};
		},
		onLoad() {
			this.localimg = 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2012576330,509845317&fm=26&gp=0.jpg';
		},
		computed:{
			...mapState(['env'])
		},
		methods: {
			handleClickClose: function() {
				this.$emit('handleFathClose')
			},
			handleClickSave: function() {
				let _this = this
				if(_this.env === 'h5') return;
				uni.showActionSheet({
					itemList: ["保存图片到本地"],
					success: (res) => {
						// 1 保存
						if (res.tapIndex == 0) {
							uni.showLoading({
								title: "图片保存中..."
							})
							uni.downloadFile({
							    url: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2012576330,509845317&fm=26&gp=0.jpg', // 后续应为从服务器请求过来地址
							    success: (res) => {
							        if (res.statusCode === 200) {
										let tempFilePath = res.tempFilePath
										uni.saveImageToPhotosAlbum({
										    filePath: tempFilePath,
										    success: function () {
										        uni.hideLoading();
												uni.showModal({
													title: '保存成功,快去和小伙伴们分享吧！'
												})
												_this.handleClickClose()
										    },
											fail: function() {
												uni.showModal({
													title: '保存失败',
												})
												uni.hideLoading();
											}
										});
							        }
							    }
							});
							
						}
					},
					fail: () => {
						console.log("showActionSheet 失败");
					}
				})
			}
		}
	}
</script>

<style>
	.content {
		position: fixed;
		top: 10%;
		left: 0;
		right: 0;
		width: 80%;
		height: 70%;
		margin: 0 auto;
		z-index: 10;
	}

	.content>image {
		width: 100%;
		height: 100%;
	}
</style>
