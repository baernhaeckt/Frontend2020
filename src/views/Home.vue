<template>
  <div class="home">
    <swiper v-if="step === 'interests' && interestsLoaded" :card="activeCard" @swiperesult="onCardSwipeResult" />
    <offer-list v-if="step === 'offers'" :offers="offers" />
  </div>
</template>

<script>
import { INTERESTS_LIST, INTERESTS_NEXT } from '@/plugins/store/actions/interests'
import { OFFERS_LIST } from '@/plugins/store/actions/offers'
import { mapGetters } from 'vuex'

export default {
  name: 'home',
  data () {
    return {
      interestsLoaded: false,
      activeCard: {},
      answers: [],
      step: 'interests'
    }
  },
  computed: {
    ...mapGetters(['getInterests', 'getOffers']),
    offers () {
      const offers = this.getOffers
      console.log(offers)
      return offers
    }
  },
  methods: {
    onCardSwipeResult (result) {
      const isAccept = result.result === 'accept'
      const cardName = result.card.name
      this.answers.push({ name: cardName, match: isAccept })
      this.$store.dispatch(INTERESTS_NEXT, this.answers).then((nextCard) => {
        if (nextCard) {
          this.activeCard = nextCard
        } else {
          this.step = 'offers'
        }
      })
    },
    loadOffers () {
      this.$store.dispatch(OFFERS_LIST, this.answers)
    }
  },
  mounted () {
    this.$store.dispatch(INTERESTS_LIST).then(() => {
      this.interestsLoaded = true
      this.activeCard = this.getInterests
    })
  },
  watch: {
    step: function (newStep) {
      if (newStep === 'offers') {
        this.loadOffers()
      }
    }
  }
}
</script>

<style lang="scss">
</style>
