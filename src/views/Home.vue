<template>
  <div class="home">
    <swiper v-if="step === 'interests' && interestsLoaded" :card="activeCard" @swiperesult="onCardSwipeResult" />
    <template v-if="step === 'offers'">
      <p>OFFERS!</p>
    </template>
  </div>
</template>

<script>
import { INTERESTS_LIST, INTERESTS_NEXT } from '@/plugins/store/actions/interests'
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
    ...mapGetters(['getInterests'])
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
    }
  },
  mounted () {
    this.$store.dispatch(INTERESTS_LIST).then(() => {
      this.interestsLoaded = true
      this.activeCard = this.getInterests
    })
  }
}
</script>

<style lang="scss">
</style>
