<template>

    <status-add @authGuard="$emit('authGuard','Only logged in users can post!')"></status-add>
    <div class="main-app-structure">
    <status-list @remove="this.$emit('remove','Post has been removed!')" @edit="$emit('edit','Post has been edited!')"></status-list>
    <chat-list @messageSent="onMessage"></chat-list>
  </div>
  
</template>

<script>
import statusAdd from '../components/status-add.vue'
import StatusList from '../components/status-list.vue'
import chatList from '../components/chat-list.vue'
export default {
  components: { statusAdd, StatusList, chatList},
  methods:{
    onMessage(user){
      this.$emit('messageSent',`Message sent to: ${user.username}`,user)
    }
  }

}
</script>

<style lang="scss">
.main-app-structure{
  width: 100%;
  display: flex;
}

</style>