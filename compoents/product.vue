<template>
	<view>
		<view class="flex justify-between align-center content padding bg-white solid" style="height: 290upx;" @click="handleClickGoPageDetail(item._id)" v-for="(item, index) in data">
			<view class="proImg" style="height: 200upx;">
				<image :style="{height: name == 'foot' ? '100%' : '80%'}" :src="item.picture"
				 mode=""></image>
			</view>
			<view style="padding-right: 5upx;width: 100%;overflow: hidden;">
				<view class="title text-black cat2 text-left" style="margin-bottom: 20upx;">{{item.title}}</view>
				<view class="title cat2 text-sm text-left text-gray" style="margin-bottom: 20upx;">
					价值:
					<text class="text-price text-red">{{item.price}}</text>
				</view>
				<view class="bg-white">
					<view class="cu-progress round sm striped active">
						<view class="bg-green" :style="{width:(item.already_participation/item.total_participation)*100+'%'}"></view>
					</view>
				</view>
				<view class="flex justify-between text-sm text-gray">
					<view>
						<view class="text-orange">{{item.already_participation}}</view>
						<view>已参与</view>
					</view>
					<view class="text-center">
						<view>{{item.total_participation}}</view>
						<view>总需参与</view>
					</view>
					<view>
						<view class="text-blue">{{item.total_participation - item.already_participation}}</view>
						<view>剩余</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'Product',
		data() {
			return {
				loading: false,
				active: false
			}
		},
		props: [
			'data',
			'name'
		],
		methods: {
			handleClickGoPageDetail(id) {
				uni.navigateTo({
					url: '/pages/index/detaile/detaile?id='  + id
				})
			}
		}
	}
</script>

<style>
	.cartNull {
		width: 50%;
		height: 280upx;
		margin: 0 auto;
	}
	
	.proImg {
		width: 30%;
	}
	
	.blockCount {
		width: 50upx;
		height: 50upx;
		line-height: 50upx;
		text-align: center;
		background-color: #EEEEEE;
	}
	
	.settlement {
		position: fixed;
		bottom: 120upx;
		width: 10%;
		height: 6%;
		color: #FFFFFF;
		line-height: 2.6;
		text-align: center;
		border-radius: 50%;
		right: 5%;
		box-shadow: 1px 2px 7px 0px #8d8d8d;
		background-color: #f37b1d;
	}

</style>
