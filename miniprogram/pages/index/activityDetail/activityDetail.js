// miniprogram/pages/index/activityDetail/activityDetail.js
import { CLOUDFUNCTION } from '../../cloudFunction/cloudfunction.js'
const cloudFunction = new CLOUDFUNCTION()
var util = require("../../../utils.js")
var md5 = require('../../../md5.js')
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		idea: false,
		activity: false
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		let id = options.id
		cloudFunction.getActivityData(id).then((res) => {
			this.setData({
				content: res[0]
			})
		}, (err) => {

		})
		const db = wx.cloud.database()
		db.collection('comment').where({}).get().then(res =>{
			this.setData({
				commentData: res.data
			})
		}).catch(err =>{
			console.log(err)
		})
	},

	showIdea: function (e) {
		this.setData({
			ideaShow: true
		})
	},

	ideaOff: function (e) {
		this.setData({
			ideaShow: false
		})
	},

	comment: function (e) {
		let comment = e.detail.value
		var date = util.formatTime(new Date())
		let username = wx.getStorageSync('username')
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
							link: 0
						}
						comment_content.push(temp)
						cloudFunction.commentAdd(comment_content).then((res)=>{
							
						},(err)=>{
							
						})
					} else if (res.cancel) {
						let comment_content = []
						let temp = {
							date: date,
							comment: comment,
							username: username,
							link: 0
						}
						comment_content.push(temp)
						cloudFunction.commentAdd(comment_content).then((res)=>{

						},(err)=>{
							
						})
					}
				}
			})
		}

	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function () {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	}
})