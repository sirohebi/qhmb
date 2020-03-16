class CLOUDFUNCTION{
    userRegistr(userInfo){
        const db = wx.cloud.database()
        console.log(userInfo)
        db.collection('user').add({
            data:{
                name: userInfo.username,
                password: userInfo.userpwd,
                phonenum: userInfo.phonenum,
                invitedcode: userInfo.invitedcode
            }
        }).then(res =>{
            console.log(res)
        }).catch(err =>{
            console.log(err)
        })
    }
}

export {CLOUDFUNCTION}