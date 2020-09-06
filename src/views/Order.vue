<template>
    <div class="order-view" v-if="loaded">
        <h1>Dein Angebot</h1>
        <h2 class="h4">{{selectedOffer.name}}</h2>
        <p>{{selectedOffer.description}}</p>
        <h2 class="h4">Inbegriffen sind:</h2>
        <ul class="included-items">
            <li v-for="incl in selectedOffer.includedItems" :key="incl.name">
                <strong>{{incl.name}}</strong>: {{incl.description}} <mdb-badge color="primary">Wert: {{new Intl.NumberFormat('de-CH', { style: 'currency', currency: 'CHF' }).format(incl.price)}}</mdb-badge>
            </li>
        </ul>
        <h2 class="h4">Das kostet es</h2>
        <p><strong>Total: {{calculatePrice(selectedOffer)}}</strong></p>
        <h2 class="h4">Deine Begleitung, {{guide.displayName}}</h2>
        <p class="floated-text clearfix">
            <img class="z-depth-1 rounded-circle float-right mt-2" :src="`https://baernhaeckt2020.blob.core.windows.net/images/guides/${selectedOffer.guideDisplayName.replace(/ /g,'_').toLowerCase()}.jpg`" width="140" height="140" />
            {{guide.description}}
        </p>
        <mdb-btn class="w-100 m-0" color="primary" @click="executeOrder">Jetzt kostenpflichtig bestellen</mdb-btn>
    </div>
</template>

<script>
import { GUIDES_LIST } from '@/plugins/store/actions/guides'
import { mapGetters } from 'vuex'

export default {
  name: 'Order',
  props: {
    offer: {
      type: Object
    }
  },
  data () {
    return {
      selectedOffer: this.$props.offer,
      loaded: false
    }
  },
  computed: {
    ...mapGetters(['getGuides']),
    guide () {
      return this.getGuides.find(g => g.id === this.selectedOffer.guideId)
    }
  },
  methods: {
    calculatePrice (offer) {
      return new Intl.NumberFormat(
        'de-CH',
        { style: 'currency', currency: 'CHF' }
      ).format(offer.includedItems.reduce((acc, val) => {
        return acc + val.price
      }, 0))
    },
    executeOrder () {
      this.$router.push({ name: 'payment', params: { offerId: this.selectedOffer.id } })
    }
  },
  mounted () {
    this.$store.dispatch(GUIDES_LIST).then(() => { this.loaded = true })
  }
}
</script>

<style lang="scss">
.order-view {
    .included-items {
        padding-left: 20px;
    }
    .floated-text {
        word-wrap: break-word;
        img.rounded-circle {
            display: inline-block;
            shape-outside: circle();
            border-radius: 50%;
            margin: 5px;
        }
    }
}
</style>
