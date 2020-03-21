// miniprogram/pages/pwd_re/pwd_re.js
import { CLOUDFUNCTION } from "../cloudFunction/cloudfunction.js"
const cloudFunction = new CLOUDFUNCTION()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        rules: false,
        phoneNumRules: true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    verifyReset: function (e) {
        let Invitation_code = e.detail.value.Invitation_code
        this.setData({
            Invitation_code: Invitation_code
        })
        cloudFunction.pwd_reset(Invitation_code).then((res) => {
            console.log(res)
            if (res.data[0]) {
                this.setData({
                    rules: true,
                    phoneNumRules: false,
                    _id: res.data[0]._id
                })
            }else{
                wx.showToast({
                    title: "你输入的邀请码不存在，请重新输入",
                    icon: "none",
                    duration: 2000
                })
            }
        }, (err) => {
            console.log(err)
        })

    },

    pwdReset:function (e){
        let newpwd = e.detail.value.newpwd
        let new_pwd = e.detail.value.new_pwd
        let _id = this.data._id
        console.log(_id)
        if(newpwd == new_pwd){
            cloudFunction.pwdUpdate(newpwd, _id).then((res)=>{
                console.log(res)
            },(err)=>{
                console.log(err)
            })
        }else{
            wx.showToast({
                title: "你两次输入的密码不相符",
                icon: "none",
                duration: 2000
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