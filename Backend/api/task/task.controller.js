const taskService = require('./task.service')

async function getTasks(req,res){
    const tasks = taskService.query()
    
}

module.exports={
    getTasks
}