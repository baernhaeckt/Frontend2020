<template>
  <div id="app">
    <toaster/>
    <layout-main>
      <router-view/>
    </layout-main>
  </div>
</template>
<script>
import LayoutMain from '@/views/_shared/LayoutMain'
import Toaster from '@/components/Toaster'
export default {
  mounted () {
    if (this.$store.getters.isAuthenticated) {
      window.websockets.startConnection(this.$store.getters.accessToken)
    }
    this.$store.watch(
      (state, getters) => getters.isAuthenticated,
      (newValue, oldValue) => {
        if (newValue) {
          window.websockets.startConnection(this.$store.getters.accessToken)
        } else {
          window.websockets.stopConnection()
        }
      }
    )
  },
  components: {
    LayoutMain,
    Toaster
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap');

$image-path: '~@/../mdb/mdbvue/img';
@import '~@/../mdb/mdbvue/scss/mdb-free.scss';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding-bottom: 100px;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
