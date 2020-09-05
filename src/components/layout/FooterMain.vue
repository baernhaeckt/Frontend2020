<template>
  <footer role="contentinfo" class="fixed-bottom-footer">
    <mdb-container fluid class="text-center">
      <p class="mb-0">eine Initiative von</p>
      <a href="https://www.madeinbern.com/" class="mib-logo">
        <img src="/img/logo_mib.png" />
      </a>
    </mdb-container>
  </footer>
</template>

<script>
export default {
  name: 'FooterMain'
}
</script>

<style lang="scss">
.fixed-bottom-footer {
  background: rgba($color: #000000, $alpha: 0.6);
  padding: 10px 0;
  color: #fff;
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1030;
}
.mib-logo {
  img {
    height: 50px;
  }
}
</style>
