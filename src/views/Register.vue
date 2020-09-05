<template>
  <div class="view-register">

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
.view-register {
  max-width: 350px;
  margin: 75px auto;
}
</style>
