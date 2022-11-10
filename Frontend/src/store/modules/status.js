import { socketService } from "../../services/socket.service.js";
import { statusService } from "../../services/status.service.js";

export default{
    state:{
        statuses:await statusService.query(),
        loaderText:'Loading more posts...'

    },
    mutations:{
        
        addStatus(state,{status}){
            // let newStatuses = JSON.parse(JSON.stringify(state.statuses))
            state.statuses.push(status)
            // state.statuses = [status.status,...state.statuses]
        },
        setCount(state){
            state.postCount = state.statuses.length

        },
        addPosts(state,posts){
            state.statuses = [...state.statuses,...posts.posts]
        },
        setLoaderText(state,msg){
            state.loaderText = msg.msg
        },
        setStatuses(state,{updatedStatuses}){
            state.statuses = updatedStatuses

        },
        addSocketStatus(state,{status}){
            state.statuses = [...state.statuses,status]
        },
        removeSocketStatus(state,{statusId}){
            let newStatuses = JSON.parse(JSON.stringify(state.statuses))
            newStatuses = newStatuses.filter(status=> status._id !== statusId)
            
            
            state.statuses = [...newStatuses]
        },
        editSocketStatus(state,{status}){
            const statusIdx = state.statuses.findIndex(currStatus=> currStatus._id === status._id)
            let newStatuses = [...state.statuses]
            newStatuses.splice(statusIdx,1,status)
            state.statuses = [...newStatuses]

        },
        removeStatus(state,{statusId}){
            const statusIdx = state.statuses.findIndex(status=> status._id === statusId)
            let newStatuses = JSON.parse(JSON.stringify(state.statuses))
            newStatuses.splice(statusIdx,1)
            state.statuses = [...newStatuses]
        }
     

    },
    actions:{
        async addStatus({commit},{status}){
            await statusService.addStatus(status)
            const updatedStatuses = await statusService.query()
            socketService.emit('load-statuses',updatedStatuses)
            commit({type:'setStatuses',updatedStatuses})
        },
   

        async getMorePosts({commit}){
            try{
                const posts = await statusService.getMorePosts()
                commit({type:'addPosts',posts})

            }
            catch(error){
                commit({type:'setLoaderText',msg:'No more posts'})
            }
        },
        async removeStatus({commit},{statusId}){
            await statusService.removeStatus(statusId)
            const statuses = await statusService.query()
            socketService.emit('load-statuses',statuses)
            commit({type:'removeStatus',statusId})
        },
        async editStatus({commit},{status}){
            await statusService.editStatus(status)
            const statuses = await statusService.query()
            socketService.emit('load-statuses',statuses)

        },
        async applySocket({commit},{statuses}){
            const updatedStatuses = await statusService.query()
            commit({type:'setStatuses',updatedStatuses})
        }

      


    },
    getters:{
        statuses(state){
            
            return state.statuses
        },

        loaderText(state){
            return state.loaderText
        }

      

    }
}