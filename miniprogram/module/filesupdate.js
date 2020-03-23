class FILESLODA {
    fileUpload(imageUrl) {
        return new Promise(function(reslove, reject) {
            wx.cloud.uploadFile({
                cloudPath: "images/" + imageUrl[1].title + ".png",
                filePath: imageUrl[0].url
            }).then(res => {
                reslove(res)
            }).catch(err => {
                reject(err)
            })
        })
    }
}
export { FILESLODA }