import { socketService } from "../../services/socket.service.js"
import { userService } from "../../services/user.service.js"

export default{
    state:{
        loggedInUser:{user:userService.getLoggedInUser()} ,
        msg:'',
        users:await userService.getUsers()

    },
    mutations:{
        setErrorMsg(state,msg){
            state.msg = msg

        },
        setLoggedInUser(state,user){
            state.msg = ''
            state.loggedInUser = {...user}
        },
        updateUser(state,{newUser}){
            let updatedUsers = JSON.parse(JSON.stringify(state.users))
            const userIdx = updatedUsers.findIndex(user=> newUser._id === user._id)
            updatedUsers.splice(userIdx,1,newUser)
            state.users = [...updatedUsers]
        },
        loadUsers(state,{users}){
            console.log(users);
            state.users = [...JSON.parse(JSON.stringify(users))]
        }
        

    },
    actions:{
        async login({commit},{username,password}){
           const user = await userService.login({username,password})
           if(!user) commit({type:'setErrorMsg',msg:'Invalid Credentials'})
           else {
               socketService.emit('user-logged-in',user)
            commit({type:'setLoggedInUser',user})
            
           }
        },
        async signUp({commit},{username,password,fullname}){
            const user = await userService.signup({username,password,fullname})
            if(!user) commit({type:'setErrorMsg',msg:'Could not signup. Please try again later'})
            else {
              
                socketService.emit('user-logged-out',user)
                commit({type:'setLoggedInUser',user})
            }
        },
        async logout({commit,state}){
            const msg = await userService.logout()
            const users = await userService.getUsers()
            commit({type:'loadUsers',users})
            socketService.emit('user-logged-out',state.loggedInUser.user)
            commit({type:'setLoggedInUser',user:null})
        },

        async sendMessage({commit},{modalInfo}){
            let addressee = {...modalInfo.users.to}
            const inbox = {from:modalInfo.users.from,content:modalInfo.content}
            addressee.inbox = [...addressee.inbox,inbox]
            
            const newUser = await userService.updateUser(addressee)
            commit({type:'updateUser',newUser})
        },


        async loadUsers({commit}){
            const users = await userService.getUsers()
            console.log(users);
            commit({type:'loadUsers',users})
        },
        async applyLoginSocket({commit},{user}){
            const users = await userService.getUsers()
            commit({type:'loadUsers',users})
        }



    },
    getters:{
        loggedInUser(state){
            return state.loggedInUser
        },
        errorMsg(state){
            return state.msg
        },
        users(state){
            return state.users
        }

    }
}