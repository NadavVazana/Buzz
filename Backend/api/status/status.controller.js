const statusService = require('./status.service.js')

module.exports={
    getStatuses,
    addStatus,
    getMorePosts,
    removeStatus,
    editStatus
}

async function getStatuses(req,res){
    try{
        const statuses =await statusService.query()
        res.send(statuses.slice(0,5))

    }
    catch(err){
        console.log(err);
    }
}

async function editStatus(req,res){
    try{
        await statusService.editStatus(req.body)
        res.send('Status has updated!')

    }
    catch(error){
        console.log(error);
    }
}

async function getMorePosts(req,res){
    const pageCount = +req.query.pageCount
    const statuses =await  statusService.query()
    let currStatuses = statuses.slice(pageCount,pageCount+5)
    if(!currStatuses.length){
        res.status(404).send('No more posts')
        
    } 
    else res.send(currStatuses)

}

async function addStatus(req,res){
    try{
        const status = req.body
        await statusService.add(status)
        res.send('Status has been added!')
    }
    catch(err){
        console.log(err);
    }
}

async function removeStatus(req,res){
    try{
        const {statusId} = req.body
        await statusService.remove(statusId)
        res.send('Status removed!')

    }
    catch(err){
        console.log(err);
    }


}