// miniprogram/pages/reg_user/reg_user.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		rulesCode: [true, true, true, true],
		regsumbit: true
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		
	},

	registrUserName: function (event) {
		let name = event.detail.value
		let param = {}
		let rulesCode = this.data.rulesCode
		if (name != "") {
			if (name.length < 3 | name.length > 12) {
				wx.showToast({
					title: '用户名最少3个字符，最多12个字符',
					icon: "none",
					duration: 2000
				})
				
			}else{
				param[rulesCode[0]] = false
				this.setData(param)
			}
		}else{
			wx.showToast({
				title: "用户名不可为空",
				icon: "none",
				duration: 2000
		})
	}
	this._judgeRegSumbit()
	},

	registrPhoneNum: function (event) {
		let phoneNum = event.detail.value
	},

	registrUserPwd: function (event) {
		let pwd = event.detail.value
	},

	_registrUserPwd: function (event) {
		let _pwd = event.detail.value
	},

	invited_code: function (event) {
		let invitedCode = event.detail.value
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
		for(var i = 0; i < rulesCode.length;i++){
			if(!rulesCode[i]){
				this.setData({
					regsumbit: false
				})
			}else{
				this.setData({
					regsumbit: true
				})
				break
			}
		}
	}
})