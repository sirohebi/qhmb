// miniprogram/pages/logins/logins.js
import {CLOUDFUNCTION} from '../cloudFunction/cloudfunction.js'
const cloudFunction = new CLOUDFUNCTION()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		nameNotNull: true,
		pwdNotNull: true
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {

	},

	userName: function (event){
		let userName = event.detail.value
		if(userName != ""){
			this.setData({
				nameNotNull: false,
				name: userName
			})
		}else{
			this.setData({
				nameNotNull: true
			})
		}
	},

	userPwd: function (event){
		let userPwd = event.detail.value
		if(userPwd != ""){
			this.setData({
				pwdNotNull: false,
				password: userPwd
			})
		}else{
			this.setData({
				pwdNotNull: true
			})
		}
	},
	
	user_reg: function (){
		wx.navigateTo({
			url: '../reg_user/reg_user'
		})
	},

	pwd_re: function (){
		wx.navigateTo({
			url: '../pwd_re/pwd_re'
		})
	},

	userLogin: function (){
		let name = this.data.name
		let password = this.data.password
		cloudFunction.userInfoGet(name).then((res)=>{
			if(name == res[0].name && password == res[0].password){
				wx.switchTab({
					url: '../index/index',
				})
			}else{
				wx.showToast({
					title: "你输入的密码或账号不正确，请重新输入",
					icon: "none",
					duration: 2000
				})
			}
		},(err)=>{
			console.log(err)
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