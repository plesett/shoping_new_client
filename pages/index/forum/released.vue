<template>
	<view class="released">
		<view class="released_body">
			<view class="released_body_title">{{title}}</view>
			<view class="right_text audit" v-if="state==0">审核中</view>
			<view class="right_text text-red" v-if="state==2">不通过</view>
			<view class="right_text text-green" v-if="state==1">审核通过</view>
			<view class="price_info">{{time2}}</view>
			<view></view>
		</view>
		<view class="released_bottom" v-if="true">
			<view style="color: #007AFF;">修改信息</view>
			<view class="deleteFa">
				<view class="delete">
					<text class="cuIcon-delete"></text>
				</view>
				<view>
					删除
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import dayjs from 'dayjs'
	export default {
		name: "Released",
		data() {
			return {
				time2: this.time
			}
		},
		// state 0 -> 审核 1 -> 审核失败 2 -> 审核通过 3 -> 商品已售出
		props:[
			'title',
			'time',
			'state'
		],
		mounted: function() {
			console.log(this.state)
			this.time2 = dayjs(this.time).format('YYYY-MM-DD HH:mm:ss')
		}
	}
</script>

<style>
	.released {
		margin: 40upx;
		padding: 20upx;
		border-radius: 5px;
		border: 1px solid #008cff;
		background-color: #FFFFFF !important;
	}

	.released_body_title {
		float: left;
		font-size: 17px;
		overflow: hidden;
		line-height: 1.5;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		width: 80%;
		margin-bottom: 20upx;
	}

	.price_info {
		color: #AAAAAA;
		width: 100%;
		clear: both;
	}

	.right_text {
		width: 18%;
		float: right;
		font-size: 13px;
		line-height: 70px;
		height: 55px;
	}

	.fts10 {
		font-size: 10px;
		color: #AAAAAA;
	}

	.audit {
		color: #F0AD4E;
	}
	
	.failure{
		color: #D84242;
	}

	.released_bottom {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 14px;
		padding-top: 15upx;
		margin-top: 15upx;
		border-top: 1px solid #EEEEEE;
	}

	.deleteFa {
		color: #cdcdcd;
		display: flex;
		justify-content: space-between;
	}

	.delete {
		width: 16px;
		height: 16px;
		margin-right: 2upx;
	}

	.delete>image {
		width: 100%;
		height: 100%;
	}
</style>
