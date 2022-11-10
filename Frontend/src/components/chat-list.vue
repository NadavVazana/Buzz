<template>
    <section v-if="this.$store.getters.loggedInUser.user"  class="chat-list">
        <div class="inbox">
            <h5 @click="this.$router.push(`/inbox/${this.$store.getters.loggedInUser.user._id}`)">Your Inbox</h5>
        </div>
            <ul  :key="this.$store.getters.users">
                <li  v-for="user in users" :key="user._id">
                <chat-preview v-if="user._id !== this.$store.getters.loggedInUser.user._id" @open-modal="onOpenModal" :user="user"></chat-preview>
            </li>
            </ul>
            <div v-if="modal" class="message-modal">
                <h1>Send a message to {{modal.to.username}}!</h1>
                <img src="../assets/imgs/icon.svg" alt="modal-icon">
                <form @submit="onSend">
                    <textarea spellcheck="false" v-model="textMessage" maxlength="250" id="" cols="30" rows="10"></textarea>
                    <button>Send</button>
                </form>
            </div>
            <div v-if="modal" @click="modal=null" class="black-screen"></div>
</section>
</template>

<script>
import chatPreview from './chat-preview.vue'
export default {
    created(){
        this.users = this.$store.getters.users
        this.loggedInUser = this.$store.getters.loggedInUser.user
    },
    updated(){
        this.users = this.$store.getters.users
    },
  



    data(){
        return{
            modal:null,
            textMessage:'',
            users:this.$store.getters.users,
            loggedInUser:this.$store.getters.loggedInUser.user
            
        }
    },
    components:{
        chatPreview
    },
    methods:{
        async onSend(){
           await  this.$store.dispatch({type:'sendMessage',modalInfo:{users:this.modal,content:this.textMessage}})
           await this.$store.dispatch({type:'loadUsers'})
           this.$emit('messageSent',this.modal.to)
        
           this.modal = null
            
        },
        async onOpenModal(user){
            await this.$store.dispatch({type:'loadUsers'})
            const from = this.$store.getters.loggedInUser.user
            this.modal = {to:user,from}
        }
    }

}
</script>

<style lang="scss">
.chat-list{
    .black-screen{
        background-color: rgba(0, 0, 0, 0.286);
        position: fixed;
        left: 0;
        z-index: 1;
        top: 0;
        width: 100vw;
        height: 100vh;
        cursor: pointer;
    }
    .message-modal{
        padding: 60px;
        padding-inline: 100px;

        form{
            padding-top: 20px;

            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 20px;

            textarea{
                font-family: Madefor;
                resize: none;
                outline: 1px #316f9e62 solid;
                transition: all 0.5s;

                &:focus{
                    transition: all 0.5s;
                    outline: 1px #316f9e solid;
                }
            }
            button{
                background-color:#316f9e ;
                padding-block: 10px;
                border-radius: 5px;
                border: none;
                width: 100%;
                color: whitesmoke;
                font-weight: 700;
                font-family: Madefor;
            }
        }
        background-color: rgb(251, 250, 250);

        position: fixed;
        z-index: 2;
        top:50%;
        left:50%;
        transform: translate(-50%,-50%);  
    
    }
    .inbox{
        border-bottom: rgba(128, 128, 128, 0.35) 1px solid;
        h5{
            cursor: pointer;
            &:hover{
                color:#316f9e ;
            }
        }
    }
    height: fit-content;
    ul{
        li{
            width: 100%;
        }
        width: 100%;
        
        list-style-type: none;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-inline: 0;
    }
    text-align: center;
    background-color: white;
    border: 1px rgba(128, 128, 128, 0.22) solid;
    width:20%;

    
}
@media (max-width: 800px){
        .chat-list{
            display: none;
        }
    }

</style>