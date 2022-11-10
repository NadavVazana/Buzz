<template>
  <section class="status-add">
    <form @submit.prevent="onPostStatus">
        <div class="post-options">
        <img @click="type='image',text=''" src="../assets/imgs/image.svg" alt="">
        <img @click="type='text',text=''" src="../assets/imgs/text.svg" alt="">
    </div>
        <input  spellcheck="false" v-model="text" type="text" :placeholder="placeholder ">
        <button>Post</button>
    
    </form>
 
  </section>
</template>

<script>
export default {
    data(){
        return{
            text:'',
            type:'text'
        }
    },
    computed:{
        placeholder(){
            switch (this.type){
                case 'text':
                    return 'What\'s on your mind?'
                case 'image':
                    return 'Paste an image url here:'    
            }
        }
    },
    methods:{

        onPostStatus(){
            if(!this.text) return
            if(!this.$store.getters.loggedInUser.user){
                this.$emit('authGuard')
                return
            }
            const status = {content:this.text,timeStamp:new Date(),user:this.$store.getters.loggedInUser.user,type:this.type}
            this.$store.dispatch({type:'addStatus',status})
            this.text = ''
        }
    }

}
</script>

<style lang="scss">

.status-add{
    position: relative;
    .post-options{
       
  
        position: relative;
        padding-bottom: 10px;


         
            display: flex;
            align-items: center;
            justify-content: center;
        gap: 10px;
            position: absolute;
            top:45%;
            left:66%;
            height: 100%;
            transform: translate(-50%,-50%);
            img{
                padding: 5px;
                cursor: pointer;
                user-select: none;
            width: 13px;
        }
        
    }
    padding-bottom: 20px;
    form{
        margin-top: 30px;
        display: flex;
        width: 100%;
        align-content: center;
        justify-content: center;

        input{
            font-family: Madefor;
            padding: 15px;
            border: none;
            width: 50%;

            &:focus{
                outline: none;
            }
        }

        button{
            &:hover{
                background-color: #3b88c3;
                color: whitesmoke;
                transition: all 0.3s;
            }
            cursor: pointer;
            font-weight: 600;
            transition: all 0.3s;
            background-color: #5a9ed3;
            font-family: Madefor;
            width: 10%;
            border: none;
        }
    }
}

@media (max-width:400px) {
    .status-add{
        .post-options{
            left:72%
        }
        form{
            button{
                width: 20%;
            }
            input{
                width: 100%;
            }

        }

        }
    }
    


</style>