<template>
  <div class="welcome-page">
    <h1>Welcome to Renting Management System</h1>
    <p>Please log in to access the system.</p>
    <form class="login-form" @submit.prevent="login">
      <div class="form-group">
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" />
      </div>
      <button class="btn btn-primary">Log In</button>
    </form>
    <div class="info">
      <div class="info-item">
        <div class="info-label">Total Users:</div>
        <div class="info-value">{{ totalUsers }}</div>
      </div>
      <div class="info-item">
        <div class="info-label">Total Properties:</div>
        <div class="info-value">{{ totalProperties }}</div>
      </div>
      <div class="info-item">
        <div class="info-label">Total Orders:</div>
        <div class="info-value">{{ totalOrders }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "WelcomePage",
  data() {
    return {
      username: "",
      password: "",
      totalUsers: 0,
      totalProperties: 0,
      totalOrders: 0,
    };
  },
  methods: {
    login() {
      // TODO: perform login operation
      console.log("Login button clicked");
    },
  },
  created() {
    // TODO: fetch and display statistics data
    this.totalUsers = 100;
    this.totalProperties = 200;
    this.totalOrders = 300;
  },
};
</script>

<style scoped>
.welcome-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px;
  text-align: center;
}

h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.login-form {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}

label {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

input {
  padding: 0.5rem;
  font-size: 1.2rem;
  border-radius: 0.5rem;
  border: none;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  font-size: 1.2rem;
  border-radius: 0.5rem;
  border: none;
  background-color: #3f51b5;
  color: #fff;
  cursor: pointer;
  transition: all 0.3s ease;
}

button:hover {
  background-color: #1a237e;
}

.info {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
}
</style>