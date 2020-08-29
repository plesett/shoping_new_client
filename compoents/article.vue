<template>
	<view>
		
		<view class="cu-card article no-card solid-bottom borderBottom" @click="handClickGoPageDetail()" v-for="(item, index) in data" :key="index">
			<view class="cu-item shadow">
				<view class="title"><view class="text-cut">{{item.title}}</view></view>
				<view class="content">
					<image :src="item.cover"
					 mode="aspectFill"></image>
					<view class="desc">
						<view class="text-content">{{item.content}}</view>
						<view>
							<view class="cu-tag bg-green light sm round" v-for="(son, indexSon) in item.tag">{{son[0]}}</view>
							<view class="cu-tag sm text-orange round">{{$time(item.createdAt)}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import {GetMessageList} from "@/api/message.js"
	export default {
		name: 'Article',
		data() {
			return {
				data: []
			}
		},
		mounted: function() {
			let _this = this
			GetMessageList().then(res => {
				_this.data = res
			})
		},
		methods:{
			handClickGoPageDetail() {
				// uni.navigateTo({
				// 	url: "/pages/index/forum/detaile/detaile"
				// })
			}
		}
	}
</script>

<style>
	
	.borderBottom{
		border-bottom: 25upx solid #EEEEEE;
	}
</style>
