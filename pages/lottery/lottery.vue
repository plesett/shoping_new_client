<template>
	<view class="flex justify-start flex-wrap">

		<view class="basis-df solid-right solid-bottom padding bg-white" style="width: 50%;" v-for="(item, index) in 25" :key="index">
			<image class="top_pro" src="https://img11.360buyimg.com/cms/jfs/t1/4609/37/3522/134740/5b997beeE4750d52c/c13c9b603ff5083d.jpg!q95.webp"
			 mode=""></image>
			<view v-if="item !== 1">
				<view class="flex p-xs mb-sm">
					<view class="flex-sub" style="padding: 8upx 0;">
						<image class="userImg" src="http://img4.imgtn.bdimg.com/it/u=2174841972,2476842566&fm=26&gp=0.jpg" mode=""></image>
					</view>
					<view class="flex-twice text-sm" style="line-height: 2;">
						<view class="text-black">来阿富汗找哥</view>
						<view class="text-gray"><text class="text-orange">547</text>人次获得</view>
					</view>
				</view>
				<view>
					<view class="flex-twice text-sm text-gray">
						<view>中奖号码: 1000131</view>
						<view>中奖时间: 11分钟前</view>
					</view>
				</view>
			</view>

			<view v-else>
				<view class="text-black text-sm text-cut">
					(第12332期)黄金打牌黄金打牌黄金打牌黄金打牌黄金打牌
				</view>
				<view class="text-gray text-sm">
					<view>价值:¥322.00</view>
					<view>揭晓倒计时:</view>
				</view>
				<CountdownTimer :time="time">
					<template v-slot="{day, hour, minute, second}">
						<view class="flex justify-center text-orange margin-top">
							<view class="time">{{hour}}0</view>
							<text class="dian">:</text>
							<view class="time">{{minute}}</view>
							<text class="dian">:</text>
							<view class="time">{{second}}</view>
						</view>
					</template>
				</CountdownTimer>
			</view>
		</view>

	</view>
</template>

<script>
	import CountdownTimer from '@/compoents/countdown-timer/countdown-timer.vue'
	export default {
		data() {
			return {
				time: new Date('2020/04/24 01:00:00').getTime() - new Date('2020/04/24 00:20:00').getTime()
			}
		},
		components: {
			CountdownTimer
		},
		methods: {

		}
	}
</script>

<style>
	.top_pro {
		width: 80%;
		padding: 10upx 0;
		height: 250upx;
		display: block;
		margin: 0 auto;
	}

	.userImg {
		width: 80upx;
		height: 80upx;
		border-radius: 50%;
	}

	.time {
		font-size: 12px;
		padding: 2px;
		text-align: center;
		border-radius: 4px;
		border: 1px solid #f37b1d;
	}

	.dian {
		margin: 0 5upx;
	}
</style>
