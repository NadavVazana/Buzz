<template>
    <section class="signup">
        <div class="title">
    <img src="../assets/imgs/icon.svg" alt="">
  <h1>Lets sign up!</h1>
  <h5>Fill the fields and submit</h5>
</div>
  <form @submit.prevent="onSignUp">
    <div class="username">
    <h5>Username:</h5>
    <input v-model="username" type="text" placeholder="Enter the username">
</div>
<div class="password">
    <h5>Password:</h5>
    <input  v-model="password" type="password" placeholder="Enter the password">
</div>
<div class="fullname">
    <h5>Full name:</h5>
    <input  v-model="fullname" type="text" placeholder="Enter your full name">

</div>
<button>Sign up</button>
  </form>
</section>
</template>

<script>
export default {
    data(){
        return{
            username:'',
            password:'',
            fullname:''
        }
    },
    methods:{
        async onSignUp(){
            await this.$store.dispatch({type:'signUp',username:this.username,password:this.password,fullname:this.fullname})
            this.$router.push('/')
        }
    }

}
</script>

<style lang="scss">

    .signup{
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        justify-content: center;
        margin-top: 10px;
        width: 100%;

        a{
            text-decoration: none;
            color: black;

            &:hover{
                color: #3b88c3;
            }
        }

    .title{
        img{
            padding-bottom: 20px;
        }
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 120px;
        h1{
            margin: 0;
        }
    }
    
    form{
    
        div{
            display: flex;
            flex-direction: column;
            gap: 10px;
            width: 100%;
            input{
                padding: 10px;
                font-family: Madefor;
            }
        }
        h5{
            margin: 0;
        }
        gap:20px;
        display: flex;
        width: 40%;
        margin: auto;
        flex-direction: column;
        text-align: left;

        button{
            width: 100%;
            background-color: #3b88c3;
            border: none;
            padding: 10px;
            color: whitesmoke;
            font-weight: 600;
            border-radius: 5px;
            transition: all 0.3s;

            &:hover{
                background-color: #52a8e9;
                transition: all 0.3s;
            }
        }
    }    }



</style>