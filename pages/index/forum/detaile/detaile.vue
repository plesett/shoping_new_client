<template>
	<view class="detaile_body">
		<view class="detaile">
			<view class="detaile_portrait">
				<image :src="data.portrait" mode=""></image>
			</view>
			<view class="detaile_user">
				<view style="font-size: 18px;color: #000000;">{{data.nickname}}</view>
				<view>{{data.describe}}</view>
			</view>
		</view>
		<view class="detaile_describe margin-top margin-top" v-html="data.content">
			<!-- 我这里是内容内容我这里是内容内容我这里是内容内容我这里是内容内容我这里是内容内容我这里是内容内容我这里是内容内容
			我这里是内容内容我这里是内容内容我这里是内容内容我这里是内容内容我这里是内容内容我这里是内容内容我这里是内容内容
			我这里是内容内容我这里是内容内容我这里是内容内容我这里是内容内容我这里是内容内容我这里是内容内容我这里是内容内容
			我这里是内容内容我这里是内容内容我这里是内容内容我这里是内容内容我这里是内容内容我这里是内容内容我这里是内容内容
			<image src="https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=4028601806,26437644&fm=111&gp=0.jpg" mode=""></image>
			<image src="https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=4028601806,26437644&fm=111&gp=0.jpg" mode=""></image>
			是内容内容我这里是内容内 -->
		</view>

		<view class="textarea_info padding margin-bottom">
			<textarea value="" @input="changInput" v-model="content" maxlength="50" placeholder="请输入评论" />
			<text class="count">{{count}}/50</text>
		</view>
		<view class="btn_post_sub" @click="handleSubFromForum">
			发布评论
		</view>
		<view class="margin-top" style="min-height: 350upx;">
			<view class="padding-top padding-bottom">
				评论列表
			</view>
			
			<view v-if="comment.length > 0">
				<view class="padding" style="border: 1px solid #EEEEEE;" v-for="(item, index) in comment" :key="index">
					
					<view class="flex justify-start">
						<view>
							<view class="cu-avatar round xs">
								<image :src="item.portrait" mode="" class="user_img_comment"></image>
							</view>
						</view>
						<view class="padding-left" style="line-height: 1.2;">
							<view class="text-black">{{item.nickname}} <text class="text-gray">({{item.city}})</text></view>
							<view class="text-gray text-sm flex">
								<view class="text-cut">{{$time(item.createdAt)}}</view>
							</view>
						</view>
						
					</view>
					<view class="padding-top padding-bottom">{{item.comment_Content}}</view>
				</view>
			</view>
			
			<view class="text-center text-gray margin-top" v-else>
				暂无评论
			</view>
		</view>
	</view>
</template>

<script>
	import { GetPostInfo, CommentPostInfo } from '@/api/post.js'
	export default {
		data() {
			return {
				count: 0,
				id: "",
				content: "",
				data: [],
				comment: []
			}
		},
		components: {

		},
		onLoad: function (option) {
			 this.id =  option.id
			 this.handleGetPostInfo()
		},
		methods: {
			handleGetPostInfo: function() {
				let _this = this
				 GetPostInfo(_this.id).then(res => {
					 _this.data = res.data
					 _this.comment = res.comment_list
				 })
			},
			changInput: function(e){
				this.count = e.detail.cursor
			},
			handleSubFromForum: function() {
				let _this = this
				if(_this.count > 10) {
					CommentPostInfo({
					  comment_Content: _this.content,
					  post_id: _this.data._id
					}).then(res => {
						_this.$queue.showToast(res.msg)
						_this.handleGetPostInfo()
					})
				} else {
					_this.$queue.showToast('输入内容太短，请重新输入')
				}
			}
		}
	}
</script>

<style>
	
	.detaile_body {
		padding: 30upx 30upx 80upx 30upx;
	}

	.detaile {
		display: flex;
		justify-content: start;
	}

	.detaile_portrait {
		margin-right: 35upx;
	}

	.detaile_portrait>image {
		width: 90upx;
		height: 90upx;
		border-radius: 50%;
	}

	.detaile_user {
		line-height: 1.5;
		font-size: 13px;
		color: #6a6867;
	}

	.detaile_price {
		color: #D84242;
		font-size: 20px;
		margin: 20upx 0;
	}

	.detaile_describe {
		min-height: 650upx;
		margin-bottom: 30upx;
	}

	.detaile_describe>image {
		width: 100%;
		height: 500upx;
		margin: 10upx 0;
	}
	
	.textarea_info{
		position: relative;
		border: 1px solid #007AFF;
		border-radius: 10px;
	}
	
	textarea{
		width: 100%;
		height: 100upx;
	}
	
	.count{
		position: absolute;
		right: 5%;
		bottom: 5%;
		font-size: 10px;
		color: #8A8A8A;
	}
	
	.btn_post_sub{
		width: 100%;
		line-height: 2.5;
		text-align: center;
		margin: 0 auto;
		color: #FFFFFF;
		background-color: #DD524D;
		border-radius: 8px;
	}
	
	.user_img_comment {
		width: 100%;
		height: 100%;
		overflow: hidden;
		border-radius: 50%;
	}
</style>
