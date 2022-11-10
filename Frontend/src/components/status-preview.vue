<template>
    
  <section @mouseleave="isHover = false" @mouseover="onMouseOver" v-if="status" class="status-preview">
    <div class="user-details">
        <img src="../assets/imgs/user.svg" alt="user-icon">
        <div>
        <h3>{{status.user.username}}</h3>
        <h6>{{getTime}}</h6>
    </div>

    </div>
    <h2 v-if="status.type === 'text'" spellcheck="false" ref="content" @blur="onChange" @input="onEdit"   :contenteditable="contentEdit">{{content}}</h2>
    <img class="status-img" v-if="status.type === 'image'" :src="status.content" alt="status-img">

    <div v-if="isHover" class="actions-btns">
        <img @click="onEditBtn" src="../assets/imgs/edit-btn.svg" alt="">
        <img @click="onRemove"  src="../assets/imgs/delete-btn.svg" alt="">
    </div>

  </section>
</template>

<script>
export default {
    data(){
        return{
            isHover:false,
            content:this.status.content
        }
    },
    methods:{
        onMouseOver(){
            if(this.$store.getters.loggedInUser.user._id === this.status.user._id)
            this.isHover = true
        },
        onEditBtn(){
            this.$refs.content.focus()

        },
        onEdit(ev){

            this.content = ev.target.innerText
        },
        onChange(){
            let newStatus = {...this.status}
            newStatus.content = this.content
            this.$store.dispatch({type:'editStatus',status:newStatus})
            this.$emit('edit')
        },
        onRemove(){
            if(!this.$store.getters.loggedInUser.user || this.$store.getters.loggedInUser.user._id !== this.status.user._id) return
            this.$store.dispatch({type:'removeStatus',statusId:this.status._id})
            this.$emit('remove')
        }

    },

    props:['status'],

        computed:{
    getTime(){
        const date = new Date(this.status.timeStamp)
        let hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
        let mins =  date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
        return `${hours}:${mins}`
        
    },

    contentEdit(){
        if(!this.$store.getters.loggedInUser.user) return false
        return this.$store.getters.loggedInUser.user._id === this.status.user._id
    }
  }
    

}
</script>

<style lang="scss">

.status-preview{
    .status-img{
        width: 100%;
        padding-top: 20px;
    }
    position: relative;
    .actions-btns{
        
        top:12px;
        right: 2%;
        position: absolute;
        display: flex;
        gap: 10px;
        img{
            cursor: pointer;
            width: 20px;
        }
    }
    
    h2{
        text-align: left;
        word-break: break-all;
        padding-inline: 15px;
    }

    .user-details{
        div{
            display: flex;
            flex-direction: column;

            >*{
                margin: 0;
            }

        }
        display: flex;
        gap: 10px;
        align-items: center;
        position: relative;
        h6{
            color: grey;
            font-size: .6rem;
        }
    }
    width: 90%;
    margin: auto;
    margin-bottom: 30px;
    border: 1px rgba(128, 128, 128, 0.225) solid;
    padding: 10px;
    background-color: rgb(255, 255, 255);
    img{
        width: 30px;
    }
}

</style>