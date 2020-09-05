<template>
  <footer role="contentinfo">
    <mdb-container fluid class="footer-inner">
      <!-- TBD -->
    </mdb-container>
  </footer>
</template>

<script>
export default {
  name: 'FooterMain'
}
</script>

<style lang="scss">
$spacer: 1em;
$footer-padding-y: $spacer * 0.5 !default;
$footer-bg: $gray-100 !default;

$footer-navigation-law-link-gap: $spacer !default;
$footer-navigation-law-link-font-size: $font-size-sm !default;

footer[role="contentinfo"] {
  .footer-inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: $footer-padding-y;
    padding-bottom: $footer-padding-y;
    background-color: $footer-bg;
  }
}
</style>
