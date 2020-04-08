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

    pwd_reset(Invitation_code) {
        return new Promise(function(reslove, reject) {
            const db = wx.cloud.database()
            db.collection('user').where({ invitedcode: Invitation_code }).get().then(res => {
                reslove(res)
            }).catch(err => {
                reject(err)
            })
        })

    }

    pwdUpdate(newPwd, _id) {
        return new Promise(function(reslove, reject) {
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
        return new Promise(function(reslove, reject) {
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

    getOpenid(openid) {
        return new Promise(function(reslove, reject) {
            const db = wx.cloud.database()
            db.collection('Invitation_code').where({
                _openid: openid
            }).get().then(res => {
                reslove(res)
            }).catch(err => {
                reject(err)
            })
        })
    }

    invitedcodeAdd(invitedCode) {
        return new Promise(function(reslove, reject) {
            const db = wx.cloud.database()
            db.collection('Invitation_code').add({
                data: {
                    invitedCode: invitedCode
                }
            }).then(res => {
                reslove(res)
            }).catch(err => {
                reject(err)
            })
        })
    }

    activityAdd(activitydata) {
        return new Promise(function(reslove, reject) {
            const db = wx.cloud.database()
            db.collection('activity').add({
                data: {
                    title: activitydata.title,
                    image: activitydata.image,
                    abstract: activitydata.abstract,
                    content: activitydata.content
                }
            }).then(res=>{
                reslove(res)
            }).catch(err=>{
                reject(err)
            })
        })
    }

    getActivityData(id){
        return new Promise(function(reslove,reject){
            const db = wx.cloud.database()
            db.collection('activity').where({_id:id}).get().then(res=>{
                reslove(res.data)
            }).catch(err=>{
                reject(err)
            })
        })
    }

    commentAdd(comment){
        return new Promise(function(reslove,reject){
            const db = wx.cloud.database()
            db.collection('comment').add({
                data:{
                    comment: comment[0].comment,
                    date:comment[0].date,
                    username: comment[0].username,
                    link: comment[0].link,
                    activityId:comment[0].activityId,
                    link_conversion: comment[0].link_conversion
                }
            }).then(res =>{
                reslove(res)
            }).catch(err =>{
                reject(err)
            })
        })
    }
}

export { CLOUDFUNCTION }