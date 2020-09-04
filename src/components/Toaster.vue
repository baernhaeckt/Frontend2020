<template>
  <div/>
</template>

<script>
let toast = function () {}

export default {
  name: 'Toaster',
  methods: {
    toast (options = {}) {
      if (this.$bvToast && this.$bvToast.toast) {
        this.$bvToast.toast(this.transformMessage(options.message), Object.assign({
          autoHideDelay: 5 * 1000,
          toaster: 'b-toaster-top-right',
          variant: 'info',
          appendToast: false
        }, options))
      }
    },
    transformMessage (message = '') {
      if (typeof message === 'object') {
        const h = this.$createElement

        return [h(
          'dl',
          Object.keys(message).reduce((vNodes, key) => {
            vNodes.push(h('dt', key))
            vNodes.push(h('dd', message[key]))
            return vNodes
          }, [])
        )]
      } else {
        return message || ''
      }
    }
  },
  mounted () {
    this.$root.$on('toast', this.toast)
    toast = this.toast
  }
}

export {
  toast
}
</script>

<style lang="scss">
$spacer: 1em;
$toaster-padding-top: 80px !default;
$toaster-padding-bottom: $spacer * 2.25 !default;
$toaster-padding-x: $spacer * 1.5 !default;
$toaster-close-size: 1.5em !default;

body {
  .b-toaster {
    .toast {
      backdrop-filter: none;

      .toast-header {
        .close {
          font-size: $toaster-close-size;
        }
      }

      .toast-body {}
    }

    &.b-toaster-top-right,
    &.b-toaster-top-left,
    &.b-toaster-top-center,
    &.b-toaster-top-full,
    &.b-toaster-bottom-right,
    &.b-toaster-bottom-left,
    &.b-toaster-bottom-center,
    &.b-toaster-bottom-full {
      left: $toaster-padding-x;
      right: $toaster-padding-x;
    }

    &.b-toaster-top-right,
    &.b-toaster-top-left,
    &.b-toaster-top-center,
    &.b-toaster-top-full {
      top: $toaster-padding-top;
    }

    &.b-toaster-bottom-right,
    &.b-toaster-bottom-left,
    &.b-toaster-bottom-center,
    &.b-toaster-bottom-full {
      bottom: $toaster-padding-bottom;
    }
  }
}
</style>
