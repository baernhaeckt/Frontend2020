<template>
  <div class="view-register">
    <p class="h4 text-center mb-4">Erstelle Dein Tuuri Profil als Guide</p>
    <div class="grey-text">
      <mdb-input v-model="email" label="E-Mail Adresse" icon="envelope" type="email"/>
      <mdb-input v-model="password" label="Passwort" icon="lock" type="password"/>
    </div>
    <div class="text-center">
      <mdb-btn color="primary" @click="registerSubmit">Registrieren</mdb-btn>
      <p>Du hast bereits ein Login? <router-link :to="{ name: 'login'}">Hier direkt einloggen</router-link>!</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'register',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    registerSubmit () {
      const data = {
        email: this.email,
        password: this.password
      }
      this.$auth.register({
        data: data,
        redirect: { name: 'home' }
      })
    }
  }
}
</script>

<style lang="scss">
.view-register {
  max-width: 350px;
  margin: 75px auto;
}
</style>
