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

    pwdUpdate(newPwd, _id) {
        return new Promise(function (reslove, reject) {
            const db = wx.cloud.database()
            db.collection('user').doc(_id).update({
                data: {
                    password: newPwd
                }
            }).then(res => {
                reslove(res)
            }).catch(err => {
                reject(err)
            })
        })
    }

    userInfoGet(name) {
        return new Promise(function (reslove, reject) {
            const db = wx.cloud.database()
            db.collection('user').where({
                name: name
            }).get().then(res => {
                reslove(res.data)
            }).catch(err => {
                reject(err)
            })
        })
    }
}

export { CLOUDFUNCTION }