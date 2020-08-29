<template>
	<view class="cu-card case no-card" >
		<view class="cu-item shadow">
			<view class="image" @click="handleClickGoPageDetail(id)">
				<view style="height: 400upx;">
					<image
					 :src="cover"
					 style="height: 400upx;"
					 ></image>
				</view>
				<view class="cu-tag bg-blue">new</view>
				<view class="cu-bar bg-shadeBottom"> <text class="text-cut">{{title}}</text></view>
			</view>
			<view class="cu-list menu-avatar">
				<view class="cu-item">
					<view class="cu-avatar round lg">
						<image :src="portrait" mode="" style="width: 100%;height: 100%; border-radius: 50%;"></image>
					</view>
					<view class="content flex-sub">
						<view class="text-grey">{{nickname}}</view>
						<view class="text-gray text-sm flex justify-between">
							十天前
							<view class="text-gray text-sm">
								<text class="cuIcon-attentionfill margin-lr-xs"></text> {{essential.watch}}
								<text class="cuIcon-appreciatefill margin-lr-xs"></text> {{essential.give}}
								<text class="cuIcon-messagefill margin-lr-xs"></text> {{essential.comment_number}}
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'CaseCard',
		props: [
			'title',
			'cover',
			'portrait',
			'nickname',
			'essential',
			'id'
		],
		methods: {
			handleClickGoPageDetail: function(id) {
				uni.navigateTo({
					url: "/pages/index/forum/detaile/detaile?id=" + id
				})
			}
		}
	}
</script>

<style>
</style>
