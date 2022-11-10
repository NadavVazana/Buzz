<template>
  <section class="login">
    <div class="title">
      <img src="../assets/imgs/icon.svg" />
      <h1>Welcome back!</h1>
      <h5>Please sign in below</h5>
    </div>
    <form @submit.prevent="onSignIn">
      <div class="username">
        <h5>Username:</h5>
        <input
          autocomplete="username"
          v-model="username"
          type="text"
          placeholder="Enter your username"
        />
      </div>
      <div class="password">
        <h5>Password:</h5>
        <input
          autocomplete="current-password"
          v-model="password"
          type="password"
          placeholder="Enter your password"
        />
      </div>
      <button>Sign in!</button>
    </form>
    <h5 v-if="errorMsg" class="error-msg">{{ errorMsg }}</h5>
    <div class="sign-up">
      <p>Don't have an account?</p>
      <router-link to="/signup">Sign up</router-link>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      errorMsg: "",
    };
  },
  methods: {
    async onSignIn() {
      await this.$store.dispatch({
        type: "login",
        username: this.username,
        password: this.password,
      });
      this.errorMsg = this.$store.getters.errorMsg.msg;
      this.$router.push("/");

      this.$emit("login", "Logged in!");
    },
  },
};
</script>

<style lang="scss">
.login {
  .error-msg {
    text-align: center;
  }
  .sign-up {
    display: flex;
    align-items: center;
    gap: 10px;
    justify-content: center;
    margin-top: 10px;
    width: 100%;

    a {
      text-decoration: none;
      color: black;

      &:hover {
        color: #3b88c3;
      }
    }
  }
  .title {
    img {
      padding-bottom: 20px;
    }
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 120px;
    h1 {
      margin: 0;
    }
  }

  form {
    div {
      display: flex;
      flex-direction: column;
      gap: 10px;
      width: 100%;
      input {
        font-family: Madefor;
        padding: 10px;
      }
    }
    h5 {
      margin: 0;
    }
    gap: 20px;
    display: flex;
    width: 40%;
    margin: auto;
    flex-direction: column;
    text-align: left;

    button {
      width: 100%;
      background-color: #3b88c3;
      border: none;
      padding: 10px;
      color: whitesmoke;
      font-weight: 600;
      border-radius: 5px;
      transition: all 0.3s;

      &:hover {
        background-color: #52a8e9;
        transition: all 0.3s;
      }
    }
  }
}
</style>