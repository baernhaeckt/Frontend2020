<template>
  <center-box>
    <p class="h4 text-center mb-4">Einloggen bei Tuuri</p>
    <div class="grey-text">
      <mdb-input v-model="email" label="E-Mail Adresse" icon="envelope" type="email"/>
      <mdb-input v-model="password" label="Passwort" icon="lock" type="password"/>
    </div>
    <div class="text-center">
      <mdb-btn color="primary" @click="loginSubmit">Login</mdb-btn>
      <p>Noch kein Login? <router-link :to="{ name: 'register'}">Jetzt registrieren</router-link>!</p>
    </div>
  </center-box>
</template>

<script>
export default {
  name: 'login',
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
        redirect: { name: 'home' }
      })
    }
  }
}
</script>

<style lang="scss">
</style>
