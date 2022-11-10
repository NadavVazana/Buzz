import {createStore} from 'vuex'
import user from './modules/user'
import status from './modules/status'
import chat from './modules/chat'


const storeOptions  = { 
    strict:true,
    state(){
        return {

        }
    },
    mutations:{

    },
    getters:{

    },

    modules:{
        user,
        chat,
        status

    }




}

const store = createStore(storeOptions)

export default store