
const { ObjectId } = require('mongodb')
const dbService = require('../../services/db.service.js')
module.exports={
    query,
    add,
    remove,
    editStatus
}

async function query(){
    const collection = await dbService.getCollection('status')
    return  collection.find({}).toArray()


}

async function editStatus(status){
    const collection = await dbService.getCollection('status')
    const newStatus = {
        content: status.content,
        timeStamp:status.timeStamp,
        user:status.user,
    }
   await collection.updateOne({ '_id': ObjectId(status._id) }, { $set: newStatus })

}

async function remove(statusId){
    const collection = await dbService.getCollection('status')
    await collection.deleteOne({ '_id': ObjectId(statusId) })

}



async function add(status){
    const collection = await dbService.getCollection('status')
   await collection.insertOne(status)

}