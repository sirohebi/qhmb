// miniprogram/pages/index/activityDetail/activityDetail.js
import {
	CLOUDFUNCTION
} from '../../cloudFunction/cloudfunction.js'
const cloudFunction = new CLOUDFUNCTION()
var util = require("../../../utils.js")
var md5 = require('../../../md5.js')
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		idea: false,
		userId:"",
		activity: false,
		commentValue: ""
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	async onLoad(options) {
		wx.showLoading({
			title: '内容加载中',
		  })
		let id = options.id
		let getOpenid =  await wx.cloud.callFunction({
			name: 'getOpenId'
		})
		let openid = getOpenid.result.openid
		console.log(openid)
		this.setData({
			id: id
		})
		cloudFunction.getActivityData(id).then((res) => {

			this.setData({
				content: res[0]
			})
		}, (err) => {

		})
		const db = wx.cloud.database()
		db.collection('comment').where({
			activityId: id
		}).get().then((res) => {
			let commentData = res.data
			for(let i = 0; i<commentData.length; i++){
				commentData[i].islink = false
				if(commentData[i].usergroup){
					let usergroup_openid = commentData[i].usergroup
					usergroup_openid.forEach((item) => {
						if(item.openid == openid){
							commentData[i].islink = true
						}	
					})
				}
				console.log(commentData)
			}
			this.setData({
				commentData: commentData
			})
			
		}).catch(err => {
			console.log(err)
		})
		wx.hideLoading()
	},
	
	/* async _getOpenid() {
		return await wx.cloud.callFunction({
			name: 'getOpenId'
		})
	}, */

	showIdea: function(e) {
		this.setData({
			ideaShow: true
		})
	},

	ideaOff: function(e) {
		this.setData({
			ideaShow: false
		})
	},

	comment: function(e) {
		let comment = e.detail.value
		let that = this
		var date = util.formatTime(new Date())
		let username = wx.getStorageSync('username')
		let activityId = this.data.id
		if (comment.comment == "") {
			wx.showToast({
				title: "评论不可为空",
				icon: "none",
				duration: 2000
			})
		} else {
			wx.showModal({
				title: "提示",
				content: "是否匿名评论",
				success(res) {
					if (res.confirm) {
						let username_md5 = md5.b64Md5(username)
						let comment_content = []
						let temp = {
							date: date,
							comment: comment,
							username: username_md5,
							link: 0,
							activityId: activityId,
							link_conversion: true,
						}
						comment_content.push(temp)
						cloudFunction.commentAdd(comment_content).then((res) => {
							if (res.errMsg == "collection.add:ok") {
								const db = wx.cloud.database()
								db.collection('comment').where({
									activityId: activityId
								}).get().then(res => {
									that.setData({
										commentData: res.data,
										commentValue: ""
									})
								}).catch(err => {
									console.log(err)
								})
							}
						}, (err) => {

						})
					} else if (res.cancel) {
						let comment_content = []
						let temp = {
							date: date,
							comment: comment,
							username: username,
							link: 0,
							activityId: activityId,
							link_conversion: true,
						}
						comment_content.push(temp)
						cloudFunction.commentAdd(comment_content).then((res) => {
							if (res.errMsg == "collection.add:ok") {
								const db = wx.cloud.database()
								db.collection('comment').where({
									activityId: activityId
								}).get().then(res => {
									that.setData({
										commentData: res.data,
										commentValue: ""
									})
								}).catch(err => {
									console.log(err)
								})
							}
						}, (err) => {

						})
					}
				}
			})
		}

	},

	goodJob: function(e) {
		let commentId = e.currentTarget.dataset.commentid
		let list = this.data.commentData
		let comment_status = list[commentId].islink
		let linkNum = list[commentId].link
		let _id = list[commentId]._id
		let key = "commentData[" + commentId + "].islink"
		let link = "commentData[" + commentId + "].link"
		this.setData({
			[key]: !comment_status
		})
		if (!comment_status) {
			this.setData({
				[link]: linkNum + 1
			})
			wx.cloud.callFunction({
				name: 'link_add',
				data:{
					_id:_id,
					linkNum:linkNum
				}
			})
		} else {
			this.setData({
				[link]: linkNum - 1
			})
			wx.cloud.callFunction({
				name: 'link_reduce',
				data:{
					_id:_id,
					linkNum:linkNum
				}
			})
		}
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function() {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function() {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function() {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function() {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function() {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function() {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function() {

	},
})
