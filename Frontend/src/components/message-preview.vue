<template>
  <section class="message-preview">
    <img src="../assets/imgs/user.svg" alt="">
    <h5>From: {{msg.from.username}}</h5>
    <h4>{{msg.content}}</h4>
  </section>
</template>

<script>
export default {
    props:['msg'],

    

}
</script>

<style lang="scss">
.message-preview{
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    h5,h4{
        word-break: break-all;
    }
    img{
        width: 30px;
    }
}

</style>