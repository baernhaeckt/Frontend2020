<template>
  <div class="view-login">
    <p class="h4 text-center mb-4">Einloggen bei Tuuri</p>
    <div class="grey-text">
      <mdb-input v-model="email" label="E-Mail Adresse" icon="envelope" type="email"/>
      <mdb-input v-model="password" label="Passwort" icon="lock" type="password"/>
    </div>
    <div class="text-center">
      <mdb-btn color="primary" @click="loginSubmit">Login</mdb-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    loginSubmit () {
      const data = {
        email: this.email,
        password: this.password
      }
      this.$auth.login({
        data: data,
        redirect: { name: 'About' }
      })
    }
  }
}
</script>

<style lang="scss">
.view-login {
  max-width: 350px;
  margin: 75px auto;
}
</style>
