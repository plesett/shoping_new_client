<template>
	<view style="padding: 30upx;">
		<view class="border-bottom">
			<input type="text" v-model="title" value="" placeholder="请输入帖子标题" />
		</view>
		<view class="border-bottom margin-top">
			<input type="text" v-model="desc" value="" placeholder="请输入帖子描述信息" />
		</view>
		<view class="textarea_info margin-top">
			<textarea value="" @input="changInput" v-model="content" maxlength="500" placeholder="请输入帖子内容,切勿发布违法信息!!!" />
			<text class="count">{{count}}/500</text>
		</view>
		<view class="upload_text">
			上传图片
			<text class="upload_text_son">最多上传9张,至少上传1张</text>
		</view>
		<view class="flex justify-start" style="flex-wrap: wrap;">
			<view  v-for="(item, index) in ImgArra" :key="index" style="width: 170upx; height: 170upx;position: relative;">
				<image style="width: 170upx; height: 170upx;" :src="item.url"  mode=""></image>
				<view class="closeImg" @click="handleClickClose(item.key, index)">
					<text class="lg text-white cuIcon-close"></text>
				</view>
			</view>
			<view @click="handleClickPush" class="bg-gradual-blue text-white text-center" style="width: 170upx; height: 170upx;line-height: 6; margin-right: 20upx;">
				图片上传
			</view>
		</view>
		<view class="sub_btn" @click="SubFromInfo">提交审核</view>
	</view>
</template>

<script>
	import { CreatePostInfo } from '@/api/post.js'
	import { DeleteAliOOS } from '@/api/comm.js'
	import { mapState } from 'vuex'
	export default {
		data() {
			return {
				count: 0,
				serviceArr: [],
				inputPrice: '',
				title: '',
				desc: '',
				content: '',
				ImgArra: []
			}
		},
		comments:{
			...mapState(['env'])
		},
		methods: {
			changInput: function(e){
				this.count = e.detail.cursor
			},
			getImageInfo: function(e) {
				console.log('图片返回：', e)
			},
			changInputPrice: function(e) {
				let that = this
				let arr = []
				for (var i = 0; i < that.inputPrice.length; i++) {
					let item = that.inputPrice[i]
					if(/^[0-9]+$/.test(item)) {
						arr.push(item)
					} else {
						that.inputPrice = String(arr.join(""))
						console.log(arr.join(""))
					}
				}
			},
			handleClickPush: function() {
				let _this = this
				uni.chooseImage({
				    success: (chooseImageRes) => {
				        const tempFilePaths = chooseImageRes.tempFilePaths;
						console.log(tempFilePaths)
				        uni.uploadFile({
				            url: 'http://localhost:3000/upload', //仅为示例，非真实的接口地址
				            filePath: tempFilePaths[0],
				            name: 'file',
				            success: (uploadFileRes) => {
								if(_this.env === 'h5') {
									var obj= eval("("+uploadFileRes.data+")"); 
								} else {
									var obj = JSON.parse(uploadFileRes.data)
								}
								_this.ImgArra.push({
									url: obj.url,
									key: obj.key
								})
				            }
				        });
				    }
				});
			},
			handleClickClose: function(key, index) {
				let _this = this
				DeleteAliOOS(key).then(res => {
					uni.showToast({
					    title: res.msg,
					    icon: 'none'
					});
					let obj = Object.assign({}, _this.ImgArra)
					delete obj[index]
					_this.ImgArra = obj
				})
			},
			SubFromInfo: function() {
				if(!!this.title && !!this.content && !!this.desc && this.ImgArra.length > 0){
					CreatePostInfo({
						title: this.title,
						content: this.content,
						describe: this.desc,
						cover: this.ImgArra[0].url
					}).then(res => {
						uni.showToast({
							title: '等待管理员审核',
							icon: 'none'
						})
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
							})
						}, 2000)
					})
				} else {
					uni.showToast({
						title: '请填写完整',
						icon: 'none'
					})
				}
			}
		}
	}
</script>

<style>
	body{
		background-color: #FFFFFF;
	}
	
.textarea_info{
	position: relative;
}

textarea{
	width: 100%;
}

.upload_text{
	font-size: 15px;
	color: #6c6c6c;
}

.upload_text_son{
	color: #8A8A8A;
	font-size: 10px;
	margin-left: 13upx;
}

.count{
	position: absolute;
	right: 5%;
	bottom: 5%;
	font-size: 10px;
	color: #8A8A8A;
}

.closeImg{
	position: absolute;
	right: 0;
	top: 0;
	width: 30upx;
	height: 30upx;
	background-color: #E54D42;
}

.sub_btn{
	margin: 0 auto;
	margin-top: 100upx;
	width: 80%;
	color: #FFFFFF;
	line-height: 2.5;
	text-align: center;
	border-radius: 5px;
	background-color: #e16464;
}
</style>
