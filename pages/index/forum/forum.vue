<template>
	<view>
		<view class="postaic">
			<view class="tab_list">
				<view class="tab_title" @click="handleClickTab(index)" v-for="(item, index) in list" :key="index">
					{{item}}
					<view class="link" v-show="current === index"></view>
				</view>
			</view>
			<view class="message_warp" v-if="current === 1">请勿发表违法违规信息！审核失败可修改信息后再次提交</view>
		</view>
		<view style="height: 70upx;"></view>

		<view class="pageCom" v-if="current === 0">
			<CaseCard v-for="(item, index) in data" :key="index" :title="item.title" :cover="item.cover" :portrait="item.portrait"
			 :nickname="item.nickname" :essential="item.essential" :id="item._id"></CaseCard>
		</view>
		<view class="pageCom" style="margin-top: 70upx;" v-if="current === 1">
			<Released v-for="(item, index) in userDataList.prohibit" :key="index" :title="item.title" :time="item.createdAt"
			 :state="item.state"></Released>
		</view>
		<view class="pageCom" v-if="current === 2">
			<Released v-for="(item, index) in userDataList.examine" :key="index" :title="item.title" :time="item.createdAt"
			 :state="item.state"></Released>
		</view>
		<view class="pageCom" v-if="current === 3">
			<Released v-for="(item, index) in userDataList.adopt" :key="index" :title="item.title" :time="item.createdAt" :state="item.state"></Released>
		</view>

		<view class="text-center text-gray text-df loadingBig" @click="handleClickloading">加载更多</view>
		<view class="sub_from_post" @click="handleClickGoPageRelease">发布帖子</view>
	</view>
</template>

<script>
	import Article from '@/compoents/article.vue'
	import CaseCard from '@/compoents/caseCard.vue'
	import Released from './released.vue'
	import {
		mapState
	} from 'vuex'
	import {
		GetPostList,
		GetUserPostList
	} from '@/api/post.js'
	export default {
		data() {
			return {
				count: 10,
				current: 0,
				list: ["论坛帖子", "不通过", "待审核帖子", "审核通过"],
				pageIndex: 1,
				data: [],
				userDataList: {
					prohibit: [],
					examine: [],
					adopt: []
				}
			}
		},
		computed: {
			...mapState(['isLogin'])
		},
		components: {
			Article,
			CaseCard,
			Released
		},
		onShow: function() {
			let _this = this
			uni.showLoading({
				title: '加载中'
			})
			GetPostList(_this.pageIndex).then(res => {
				_this.data = res;
			})
			GetUserPostList().then(res => {
				let prohibit = [] // 我发布的
				let examine = [] // 审核
				let adopt = [] // 通过
				for (var i = 0; i < res.length; i++) {
					let item = res[i]
					switch (item.state) {
						case 0:
							examine.push(item)
							break;
						case 1:
							adopt.push(item)
							break;
						default:
							prohibit.push(item)
							break;
					}
				}
				_this.userDataList.prohibit = prohibit;
				_this.userDataList.examine = examine;
				_this.userDataList.adopt = adopt;
				uni.hideLoading();
			})
		},
		methods: {
			handleClickTab: function(index) {
				let that = this
				that.current = index
			},
			handleClickloading: function() {
				this.count = this.count + 10
			},
			handleClickGoPageRelease: function() {
				if (this.isLogin) {
					uni.navigateTo({
						url: "/pages/index/forum/release/release"
					})
				} else {
					uni.navigateTo({
						url: "/pages/me/login/login"
					})
				}
			}
		}
	}
</script>

<style>
	.loadingBig {
		line-height: 2.5;
	}

	.sub_from_post {
		width: 45%;
		line-height: 2.8;
		border-radius: 25px;
		text-align: center;
		color: #FFFFFF;
		background-color: #ee4f44;
		position: fixed;
		bottom: 10%;
		left: 0;
		right: 0;
		margin: 0 auto;
	}

	.postaic {
		position: fixed;
		width: 100%;
		left: 0;
		right: 0;
		z-index: 10;
	}

	.tab_list {
		display: flex;
		justify-content: space-between;
		border-bottom: 1px solid #fff2f3;
		background-color: #FFFFFF;
	}

	.tab_title {
		flex: 1;
		font-size: 14px;
		color: #969696;
		line-height: 2.5;
		text-align: center;
	}

	.link {
		width: 50%;
		height: 4upx;
		margin: 0 auto;
		background-color: #F11B09;
	}

	.release_btn {
		position: fixed;
		bottom: 10%;
		left: 0;
		right: 0;
		margin: 0 auto;
		width: 28%;
		color: #FFFFFF;
		padding: 0 25upx;
		display: flex;
		line-height: 2.5;
		align-items: center;
		justify-content: center;
		background-color: #ff5e5e;
		border-radius: 25px;
	}

	.message_warp {
		width: 100%;
		color: #F0AD4E;
		font-size: 13px;
		text-align: center;
		padding: 10upx 20upx;
		background-color: #ffe6c6;
	}

	.pageCom {
		animation: fadeout .5s ease;
		animation-iteration-count: 1;
		animation-fill-mode: forwards;
	}

	@-webkit-keyframes fadeout {

		/*设置内容由显示变为隐藏*/
		0% {
			opacity: 0;
		}

		5% {
			opacity: 0.5;
		}

		100% {
			opacity: 1;
		}
	}
</style>
