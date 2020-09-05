<template>
  <center-box>
    <p class="h4 text-center mb-4">Einloggen bei Tuuri</p>
    <div class="grey-text">
      <mdb-input v-model="form.email" label="E-Mail Adresse" icon="envelope" type="email"/>
      <mdb-input v-model="form.password" label="Passwort" icon="lock" type="password"/>
    </div>
    <div class="text-center">
      <mdb-btn color="primary" @click="loginSubmit">Login</mdb-btn>
      <p>Noch kein Login? <router-link :to="{ name: 'register'}">Jetzt registrieren</router-link>!</p>
    </div>
  </center-box>
</template>

<script>
import { AUTH_REQUEST } from '@/plugins/store/actions/auth'

export default {
  name: 'login',
  data () {
    return {
      isLoading: false,
      form: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    loginSubmit () {
      const data = {
        email: this.form.email,
        password: this.form.password
      }
      this.isLoading = true
      this.$store
        .dispatch(AUTH_REQUEST, data)
        .then(() => {
          this.isLoading = false
          this.$router.push('/')
        })
        .catch(error => {
          this.isLoading = false
          this.form.email = ''
          this.form.password = ''
          this.$snack.danger({
            text: error.message,
            button: 'schliessen'
          })
        })
    }
  }
}
</script>

<style lang="scss">
</style>
