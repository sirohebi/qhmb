class CLOUDFUNCTION {
    userRegistr(userInfo) {
        const db = wx.cloud.database()
        db.collection('user').add({
            data: {
                name: userInfo.username,
                password: userInfo.userpwd,
                phonenum: userInfo.phonenum,
                invitedcode: userInfo.invitedcode
            }
        }).then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        })
    }

    pwd_reset(phoneNum) {
        return new Promise(function (reslove, reject) {
            const db = wx.cloud.database()
            db.collection('user').where({ phonenum: phoneNum }).get().then(res => {
                reslove(res)
            }).catch(err => {
                reject(err)
            })
        })

    }

    pwdUpdate(newPwd){
        return new Promise(function(reslove,reject){
            const db = wx.cloud.database()
            db.collection('user').where
        })
    }
}

export { CLOUDFUNCTION }