// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
	const wxContext = cloud.getWXContext()
	const openid = wxContext.OPENID
	const userdata = {
		openid
	}
	try{
		return await db.collection('comment').doc(event._id).update({
			data:{
				link: _.inc(1),
				usergroup:_.push([userdata])
			}
		})
	}catch (e) {
		console.log(e)
	}
}