<template>
  <header role="banner" class="header-banner">
    <mdb-navbar dark>
      <mdb-navbar-brand>
        <router-link class="logo" to="/">
          <img src="/img/logo_tuuri.png" />
          <span class="sr-only">Tuuri</span>
        </router-link>
      </mdb-navbar-brand>
      <mdb-navbar-toggler>
        <mdb-navbar-nav>
          <mdb-nav-item v-for="route in navigation" :key="`route-${route.name}`">
            <navigation-link :route="route" />
          </mdb-nav-item>
        </mdb-navbar-nav>

        <template v-if="$store.getters.isAuthenticated">
          <div class="clearfix mb-3">
            <mdb-dropdown class="float-right">
              <mdb-dropdown-toggle color="elegant" slot="toggle">
                <mdb-icon icon="user-alt" class="mr-2" />
                {{ user.email }}
              </mdb-dropdown-toggle>
              <mdb-dropdown-menu>
                <mdb-dropdown-item @click="processLogout">Ausloggen</mdb-dropdown-item>
              </mdb-dropdown-menu>
            </mdb-dropdown>
          </div>
        </template>
      </mdb-navbar-toggler>
    </mdb-navbar>
  </header>
</template>

<script>
import NavigationLink from '@/components/layout/NavigationLink'
import { NAVIGATION_ROUTES } from '@/plugins/router'
import { AUTH_LOGOUT } from '@/plugins/store/actions/auth.js'
import { USER_REQUEST } from '@/plugins/store/actions/user.js'
import { mapGetters } from 'vuex'

export default {
  name: 'HeaderMain',
  data () {
    return {
      routes: NAVIGATION_ROUTES
    }
  },
  computed: {
    ...mapGetters(['getProfile']),
    user () {
      return this.getProfile
    },
    navigation () {
      return this.routes.filter(r => !r.meta.hidden)
    }
  },
  methods: {
    processLogout () {
      this.$store.dispatch(AUTH_LOGOUT).then(() => this.$router.push('/login'))
    }
  },
  mounted () {
    if (this.$store.getters.isAuthenticated) {
      this.$store.dispatch(USER_REQUEST)
    }
  },
  components: {
    NavigationLink
  }
}
</script>

<style lang="scss">
.header-banner {
  margin-top: 15px;
  background-color: #d22831;
  .logo {
    img {
      height: 100px;
    }
  }

  .navbar-nav {
    margin-bottom: 25px;

    .nav-item {
      border-bottom: 1px solid #ccc;
       a {
         color: #fff;
       }
    }
  }

  .dropdown-toggle {
    padding: 0.84rem 1.14rem;
  }

  .dropdown-menu {
    left: inherit;
    right: 0 !important;
  }
}
</style>
