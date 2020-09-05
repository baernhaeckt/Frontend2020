<template>
  <router-link class="navigation-link" :to="{ name: route.name, params: routeParams }" :event="isDisabledRoute ? null : 'click'" :disabled="isDisabledRoute">
    <mdb-icon v-if="route.meta.navi.icon" :icon="route.meta.navi.icon"/>
    {{ route.label }}
  </router-link>
</template>

<script>
export default {
  name: 'NavigationLink',
  components: {
  },
  props: {
    route: {
      type: Object,
      required: true,
      default: () => ({})
    }
  },
  computed: {
    user () {
      return this.$store.getters['user/get']
    },
    isDisabledRoute () {
      const navi = this.route.meta.navi || {}

      if (navi.calcDisabled && navi.calcDisabled()) return true

      return false
    },
    routeParams () {
      return {
      }
    }
  },
  created () {
  }
}
</script>

<style lang="scss">
</style>
