// miniprogram/pages/reg_user/reg_user.js
import {CLOUDFUNCTION} from '../cloudFunction/cloudfunction.js'
const cloudFunction = new CLOUDFUNCTION()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		rulesCode: [true, true, true, true, true],
		regsumbit: true
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {

	},

	registrUserName: function (event) {
		let name = event.detail.value
		let rulesCode = this.data.rulesCode
		if (name != "") {
			if (name.length < 3 | name.length > 12) {
				wx.showToast({
					title: '用户名最少3个字符，最多12个字符',
					icon: "none",
					duration: 2000
				})
				rulesCode[0] = true
				this.setData({
					rulesCode: rulesCode
				})
			} else {
				rulesCode[0] = false
				this.setData({
					rulesCode: rulesCode
				})
			}
		} else {
			wx.showToast({
				title: "用户名不可为空",
				icon: "none",
				duration: 2000
			})
			rulesCode[0] = true
			this.setData({
				rulesCode: rulesCode
			})
		}
		this._judgeRegSumbit()
	},

	registrPhoneNum: function (event) {
		let phoneNum = event.detail.value
		let rulesCode = this.data.rulesCode
		if (phoneNum != "") {
			if (phoneNum.length != 11) {
				wx.showToast({
					title: "你输出的电话号码有误",
					icon: "none",
					duration: 2000
				})
				rulesCode[1] = true
				this.setData({
					rulesCode: rulesCode
				})
			} else {
				rulesCode[1] = false
				this.setData({
					rulesCode: rulesCode
				})
			}
		} else {
			wx.showToast({
				title: "联系方式不可为空",
				icon: "none",
				duration: 2000
			})
			rulesCode[1] = true
			this.setData({
				rulesCode: rulesCode
			})
		}
		this._judgeRegSumbit()
	},

	registrUserPwd: function (event) {
		let pwd = event.detail.value
		let rulesCode = this.data.rulesCode
		if (pwd != "") {
			if (pwd.length < 6 | pwd.length > 14) {
				wx.showToast({
					title: "密码最少6位，最长14位",
					icon: "none",
					duration: 2000
				})
				rulesCode[2] = true
				this.setData({
					rulesCode: rulesCode,
					password: pwd
				})
			} else {
				rulesCode[2] = false
				this.setData({
					rulesCode: rulesCode,
					password: pwd
				})
			}
		} else {
			wx.showToast({
				title: "用户密码不可为空",
				icon: "none",
				duration: 2000
			})
			rulesCode[2] = true
			this.setData({
				rulesCode: rulesCode,
				password: pwd
			})
		}
		this._judgeRegSumbit()
	},

	_registrUserPwd: function (event) {
		let _pwd = event.detail.value
		let rulesCode = this.data.rulesCode
		let pwd = this.data.password
		if (_pwd == pwd) {
			rulesCode[3] = false
			this.setData({
				rulesCode: rulesCode
			})
		} else {
			wx.showToast({
				title: "您输入的两次密码不相符",
				icon: "none",
				duration: 2000
			})
			rulesCode[3] = true
			this.setData({
				rulesCode: rulesCode
			})
		}
		this._judgeRegSumbit()
	},

	invited_code: function (event) {
		let invitedCode = event.detail.value
		let rulesCode = this.data.rulesCode
		if (invitedCode == 'qh001' || invitedCode == 'qh002' || invitedCode == "qh003") {
			rulesCode[4] = false
			this.setData({
				rulesCode: rulesCode
			})
		} else {
			wx.showToast({
				title: "你输入的邀请码不存在",
				icon: "none",
				duration: 2000
			})
			rulesCode[4] = true
			this.setData({
				rulesCode: rulesCode
			})
		}
		this._judgeRegSumbit()
	},

	regSumbit: function (e){
		let userInfo = e.detail.value
		cloudFunction.userRegistr(userInfo)
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

	},

	_judgeRegSumbit: function () {
		let rulesCode = this.data.rulesCode
		for (var i = 0; i < rulesCode.length; i++) {
			if (!rulesCode[i]) {
				this.setData({
					regsumbit: false
				})
			} else {
				this.setData({
					regsumbit: true
				})
				break
			}
		}
	}
})