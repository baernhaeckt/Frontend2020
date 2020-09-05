<template>
  <div id="Layout">
    <mdb-container fluid>
      <header-main/>
      <main>
        <slot />
      </main>

      <footer-main />
    </mdb-container>
  </div>
</template>

<script>
import HeaderMain from '@/components/layout/HeaderMain'
import FooterMain from '@/components/layout/FooterMain'

export default {
  name: 'LayoutMain',
  components: {
    HeaderMain,
    FooterMain
  }
}
</script>

<style lang="scss">
</style>
