<template>
  <div :class="['loader', { 'is-small': small, 'is-content': content, 'is-inline': inline }]">
    <b-spinner class="loader-spinner" :variant="variant"/>
    <div class="loader-description">{{ loaderDescription }}</div>
  </div>
</template>

<script>
export default {
  name: 'Loader',
  props: {
    variant: {
      type: String,
      default: 'primary'
    },
    description: String,
    small: Boolean,
    content: Boolean,
    inline: Boolean
  },
  computed: {
    loaderDescription () {
      return this.description !== undefined ? this.description : 'Lade daten...'
    }
  }
}
</script>

<style lang="scss">
$spacer: 1em;
$white: #fff;
$loader-padding: $spacer * 3 !default;
$loader-bg: rgba($white, 0.6) !default;

$loader-spinner-size: 3em !default;
$loader-spinner-border-width: 0.1em !default;

.loader-container {
  position: relative;
}

.loader {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: $loader-padding;
  background-color: $loader-bg;
  text-align: center;
  z-index: 2000;

  .loader-spinner {
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: $loader-spinner-size * -0.5;
    margin-left: $loader-spinner-size * -0.5;
    width: $loader-spinner-size;
    height: $loader-spinner-size;
    border-width: $loader-spinner-border-width;
  }

  &.is-small {
    padding: 0;

    .loader-spinner {
      width: 1em;
      height: 1em;
    }

    .loader-description {
      display: none;
    }
  }

  &.is-content {
    display: block;
    position: static;
    padding: 0;
    background: none;

    .loader-spinner {
      position: static;
      margin: 0 auto;
    }
  }

  &.is-inline {
    display: inline-block;
    position: static;
    padding: 0;
    background: none;
    vertical-align: text-bottom;

    .loader-spinner {
      position: static;
      margin: 0;
      width: 1em;
      height: 1em;
    }

    .loader-description {
      display: none;
    }
  }
}
</style>
