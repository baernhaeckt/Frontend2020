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
import { NAVIGATION_ROUTES } from '@/router'

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
$spacer: 1em;
$header-height: 80px !default;
$header-bg: $white !default;
$header-box-shadow: 0 0 4px 0 rgba($black, 0.15) !default;

$header-logo-max-height: 50px !default;
$header-logo-text-gap: $spacer * 0.5 !default;

header[role="banner"] {
  box-shadow: $header-box-shadow;

  .header-inner {
    display: flex;
    align-items: center;
    height: $header-height;
    background-color: $header-bg;

    .seperator {
      margin-left: $spacer;
      margin-right: $spacer;
      height: 100%;
      border-left: $border-width solid $border-color;
    }

    .logo {
      display: flex;
      align-items: center;
      color: inherit;
      text-decoration: none;

      img {
        max-height: $header-logo-max-height;
      }
    }
  }
}
</style>
