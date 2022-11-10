<template>
  <section class="inbox">
    <ul>
        <li v-for="msg in user.inbox" :key="msg">
        <message-preview :msg="msg"></message-preview></li>
    </ul>
  </section>
</template>

<script>
    import {userService} from '../services/user.service.js'
    import messagePreview from '../components/message-preview.vue'
export default {
    async created(){
        const id = this.$route.params.id
        const user= await userService.getUserById(id)
        this.user = user

    },
    data(){
        return{
            user:null

        }
    },
    components:{
        messagePreview
    }

}
</script>

<style lang="scss">
.inbox{
    ul{
        padding: 10px;
        list-style-type: none;
        display: grid;
        gap: 15px;
        grid-template-columns: repeat(auto-fill,minmax(150px,1fr));


    }
}

</style>