<template>
  <section @click="$emit('open-modal',user)"  class="chat-preview">
    <div class="user-details">
    <img src="../assets/imgs/user.svg" alt="user-chat-icon">
    <h4>{{user.username}}</h4>
    <div v-if="user.isLoggedIn" class="user-logged-in"></div>
    <div v-if="!user.isLoggedIn" class="user-logged-out"></div>
</div>

  </section>
</template>

<script>
export default {
    props:['user'],
    computed:{
        loggedInUser(){
            this.$store.getters.loggedInUser.user
        }
    },
  
}
</script>

<style lang="scss">
.chat-preview{
    .user-logged-in{
        border-radius: 50%;
        background-color: lightgreen;
        width: 10px;
        height: 10px;
    }
    .user-logged-out{
        border-radius: 50%;
        width: 10px;
        height: 10px;
        background-color: lightcoral;
    }
    padding: 5px;
    cursor: pointer;
    width: 100%;
    outline: #316f9e00  1px solid ;
    transition: all 0.3s;
    &:hover{
     
        transition: all 0.3s;
        outline:#316f9e2e  1px solid ;
    }
    .user-details{
        display: flex;
        align-items: center;
        justify-content: center;
    gap: 10px;
    img{
        width: 25px;
    }

    }
   
}

@media (max-width:800px) {
    .chat-preview{
        width: 100%;
    }
    
}

</style>