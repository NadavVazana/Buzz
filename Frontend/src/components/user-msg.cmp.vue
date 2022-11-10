<template>
    <section :class="isOpen" class="user-msg">
        <h4>{{msg}}</h4>
        <img src="../assets/imgs/user-msg.gif" alt="">

    </section>
</template>

<script>
export default {
    props:['msg'],
    updated(){
        if(this.currMsg !== this.msg){
            this.stop = false
        }
        if(this.msg && !this.stop) {
            this.currMsg = this.msg
            this.stop = true
            this.isUserMsg = true
            setTimeout(() => {
                this.isUserMsg = false
            }, 3000);
        }


    },
    data(){
        return{
            currMsg:'',
            isUserMsg:false,
            stop:false

        }
    },
    computed:{
        isOpen(){
            return {open:this.isUserMsg,close:!this.isUserMsg}
        }
    }


}
</script>

<style lang="scss">

.open{
     right: 0;
     transition: right 0.4s;

}

.close{
    right:-100%;
    transition: right 0.4s;
}

.user-msg{
    justify-content: center;
    bottom: 0;

    
    display: flex;
    align-items: center;
    color: whitesmoke;
    padding: 10px;
    position: fixed;
    width: fit-content;
    height: 80px;
    background-color:#316f9e ;

    img{
        width: 50px;
        height: 50px;
    }
}

</style>