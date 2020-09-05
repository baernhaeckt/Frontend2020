<template>
  <header role="banner">
    <mdb-navbar class="w-100">
      <mdb-navbar-brand>
        <router-link class="logo" to="/">
          <img src="/img/logo.png" />
          <span class="sr-only">Tuuri</span>
        </router-link>
      </mdb-navbar-brand>
      <mdb-navbar-toggler>
        <mdb-navbar-nav>
          <mdb-nav-item v-for="route in navigation" :key="`route-${route.name}`">
            <navigation-link :route="route" />
          </mdb-nav-item>
        </mdb-navbar-nav>

        <template v-if="$auth.check()">
          <div class="seperator"/>
          <mdb-btn color="primary" @click="processLogout">Logout</mdb-btn>
        </template>
      </mdb-navbar-toggler>
    </mdb-navbar>
  </header>
</template>

<script>
import NavigationLink from '@/components/layout/NavigationLink'
import { NAVIGATION_ROUTES } from '@/plugins/router'

export default {
  name: 'HeaderMain',
  data () {
    return {
      routes: NAVIGATION_ROUTES
    }
  },
  computed: {
    user () {
      return this.$store.getters['user/get'] || {}
    },
    username () {
      return this.user ? `${this.user.firstname} ${this.user.lastname}` : ''
    },
    navigation () {
      return this.routes.filter(r => !r.meta.hidden)
    }
  },
  methods: {
    processLogout () {
      this.$auth.logout()
    }
  },
  watch: {
  },
  components: {
    NavigationLink
  }
}
</script>

<style lang="scss">

</style>
