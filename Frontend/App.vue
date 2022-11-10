<template>
  <app-header @logout="setUserMsg"></app-header>
  <router-view
    @messageSent="setUserMsg"
    @remove="setUserMsg"
    @edit="setUserMsg"
    @authGuard="setUserMsg"
    @login="setUserMsg"
  ></router-view>

  <user-msg :msg="userMsg"></user-msg>
</template>

<script>
import appHeader from "./src/components/app-header.vue";
import statusAdd from "./src/components/status-add.vue";
import statusList from "./src/components/status-list.vue";
import userMsg from "./src/components/user-msg.cmp.vue";
import { socketService } from "./src/services/socket.service";

export default {
  components: { appHeader, statusAdd, statusList, userMsg },
  data() {
    return {
      userMsg: "",
    };
  },
  methods: {
    setUserMsg(msg,user=null) {
      console.log(msg);
      this.userMsg = msg;
      if(user){
        socketService.emit('send-message',{to:user,from:this.$store.getters.loggedInUser.user})
      }
    },
  },
  created() {
    //SOCKETS
    socketService.on("apply-load-status", (statuses) => {

      this.$store.dispatch({ type: "applySocket", statuses });
    })
    socketService.on('apply-user-login',(user)=>{
      this.$store.dispatch({type:'applyLoginSocket',user})
    })

    socketService.on('message-notification',(from)=>{
      console.log(from);
      this.setUserMsg(`You\'ve got a new message from: ${from.username}`)
    })
  },
};
</script>


<style lang="scss">
.scroll {
  height: 10px;
}
</style>