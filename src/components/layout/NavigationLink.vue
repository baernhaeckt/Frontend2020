<template>
  <router-link class="navigation-link" :to="{ name: route.name, params: routeParams }" :event="isDisabledRoute ? null : 'click'" :disabled="isDisabledRoute">
    <mdb-icon v-if="route.meta.navi.icon" :icon="route.meta.navi.icon"/>
    {{ route.name }}
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
$spacer: 1em;
$navigation-link-padding-y: $spacer * 0.6 !default;
$navigation-link-padding-x: $spacer * 1.5 !default;
$navigation-link-font-family: $font-family-base !default;
$navigation-link-font-size: $font-size-base !default;
$navigation-link-font-weight: $font-weight-bold !default;
$navigation-link-color: inherit !default;
$navigation-link-line-height: 1.1 !default;
$navigation-link-icon-gap: $spacer !default;
$navigation-link-icon-size: $spacer * 1.5 !default;
$navigation-link-icon-color: inherit !default;

$navigation-link-hover-color: $primary !default;
$navigation-link-hover-icon-color: inherit !default;

$navigation-link-active-color: $navigation-link-hover-color !default;
$navigation-link-active-icon-color: $navigation-link-hover-icon-color !default;

$navigation-link-exact-active-color: $navigation-link-hover-color !default;
$navigation-link-exact-active-icon-color: $navigation-link-hover-icon-color !default;

$navigation-link-disabled-color: $gray-300 !default;
$navigation-link-disabled-icon-color: $navigation-link-disabled-color !default;

.navigation-link {
  display: flex;
  align-items: center;
  padding: $navigation-link-padding-y $navigation-link-padding-x;
  font-family: $navigation-link-font-family;
  font-size: $navigation-link-font-size;
  font-weight: $navigation-link-font-weight;
  color: $navigation-link-color;
  line-height: $navigation-link-line-height;
  text-align: left;
  text-decoration: none;

  > .bi {
    flex: 0 0 auto;
    height: 100%;
    margin-right: $navigation-link-icon-gap;
    font-size: $navigation-link-icon-size;
    color: $navigation-link-icon-color;
  }

  > .state-completeness {
    flex: 0 0 auto;
    margin-right: $navigation-link-icon-gap;
  }

  &.dropdown {
    > .dropdown-toggle {
      padding: 0;
      text-align: inherit;
      font-family: inherit;
      font-size: inherit;
      font-weight: inherit;
      color: inherit;
      line-height: inherit;
      text-align: inherit;
      text-decoration: inherit;
    }
  }

  &:hover {
    color: $navigation-link-hover-color;
    text-decoration: none;
    svg.bi { color: $navigation-link-hover-icon-color; }
  }

  &.router-link-active {
    color: $navigation-link-active-color;
    svg.bi { color: $navigation-link-active-icon-color; }
  }

  &.router-link-exact-active {
    color: $navigation-link-exact-active-color;
    svg.bi { color: $navigation-link-exact-active-icon-color; }
  }

  &.disabled,
  &[disabled],
  &:disabled {
    color: $navigation-link-disabled-color;
    cursor: default;
    svg.bi { color: $navigation-link-disabled-icon-color; }
  }
}
</style>
