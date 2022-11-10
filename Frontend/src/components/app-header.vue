<template>
  <section class="header">
    <div @click="this.$router.push('/')" class="left-header">
      <img src="../assets/imgs/icon.svg" alt="logo-icon" />
      <h1>Buzz.</h1>
    </div>
    <nav class="right-header">
      <router-link
        :key="this.$store.getters.loggedInUser.user"
        v-if="!user"
        to="/login"
        >Login</router-link
      >
      <div v-else class="user-details">
        <button @click="onLogout">Logout</button>
        <img src="../assets/imgs/user.svg" alt="" />
        <h5>{{ user.fullname }}</h5>
      </div>
    </nav>
  </section>
</template>

<script>
export default {
  updated() {
    this.user = this.$store.getters.loggedInUser.user;
  },
  async created() {
    this.user = this.$store.getters.loggedInUser.user;
  },

  data() {
    return {
      user: null,
    };
  },
  computed: {},
  methods: {
    async onLogout() {
      await this.$store.dispatch({ type: "logout" });
      this.user = null;
      this.$emit("logout", "Logged out!");
    },
  },
};
</script>

<style lang="scss">
.header {
  .user-details {
    display: flex;
    gap: 10px;
    h5 {
      color: #316f9e;
    }
    img {
      width: 30px;
    }
  }

  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-bottom: rgba(128, 128, 128, 0.236) 1px solid;
  .left-header {
    padding-inline-start: 20px;
    display: flex;
    gap: 10px;
    user-select: none;
    cursor: pointer;
  }

  .right-header {
    button {
      background-color: whitesmoke;
      border: none;
      font-weight: 600;
      font-family: Madefor;
      font-size: 1rem;
      cursor: pointer;
      &:hover {
        color: #3b88c3;
      }
    }
    a {
      text-decoration: none;
      color: black;
      &:hover {
        color: #3b88c3;
      }
      cursor: pointer;
      font-weight: 600;
    }
    padding-inline-end: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
}

@media (max-width: 800px) {
  .header {
    .right-header {
      button {
        font-size: 0.9rem;
      }
      img {
        width: 20px;
      }
      h5 {
        font-size: 0.6rem;
      }
    }
  }
}
</style>