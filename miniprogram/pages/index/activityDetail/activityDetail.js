// miniprogram/pages/index/activityDetail/activityDetail.js
import {CLOUDFUNCTION} from '../../cloudFunction/cloudfunction.js'
const cloudFunction = new CLOUDFUNCTION()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		idea:false,
		activity:false
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		let id = options.id
		cloudFunction.getActivityData(id).then((res)=>{
			console.log(res)
			this.setData({
				content: res[0]
			})
		},(err)=>{

		})
	},

	showIdea: function(e){
		this.setData({
			ideaShow:true
		})
	},

	ideaOff: function(e){
		this.setData({
			ideaShow:false
		})
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