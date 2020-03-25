// miniprogram/pages/index/activityAdd/activityAdd.js
import { CLOUDFUNCTION } from "../../cloudFunction/cloudfunction.js"
const cloudFunction = new CLOUDFUNCTION()
import { FILESLODA } from "../../../module/filesupdate.js"
const _filesloda = new FILESLODA()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        form_info:"",
        clear: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    activityAdd: function (e) {
        let contentData = e.detail.value
        let newImages = contentData.image
        let tmpe = {
            title: contentData.title
        }
        newImages.push(tmpe)
        _filesloda.fileUpload(newImages).then((res) => {
            let activityData = []
            let tmpe = {
                title: contentData.title,
                abstract: contentData.abstract,
                content: contentData.content,
                image: res.fileID
            }
            activityData.push(tmpe)
            cloudFunction.activityAdd(activityData[0]).then((res) => {
                if(res.errMsg == "collection.add:ok"){
                    wx.showToast({
                        title: "活动新增成功",
                        duration: 2000
                    })
                    this.setData({
                        clear:true,
                        form_info:""
                    })
                }
            }, (err) => {
                console.log(err)
            })
        }, (err) => {
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