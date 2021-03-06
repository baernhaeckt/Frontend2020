<template>
    <div class="board" ref="board" v-if="!cardLoading">
        <div
            class="swipe-card"
            v-bind:key="$props.card.name"
            v-hammer:pan="(event) => cardOnPan(event, $props.card)"
            ref="topCard"
            :style="`background-image: url('https://baernhaeckt2020.blob.core.windows.net/images/interests/${$props.card.name}.jpg')`">
            <div class="label">{{$props.card.label || $props.card.name}}</div>
        </div>
        <img v-if="showSwipeHint" class="swipe-hint" src="/img/swipe-hint.png" ref="swipeHint" />
    </div>
</template>

<script>
import Hammer from 'hammerjs'
export default {
  name: 'Swiper',
  props: {
    card: {
      type: Object
    }
  },
  data () {
    return {
      isPanning: false,
      cardLoading: false,
      showSwipeHint: true
    }
  },
  methods: {
    cardOnPan (e, card) {
      const topCard = this.$refs.topCard
      const board = this.$refs.board
      if (!this.isPanning) {
        this.isPanning = true

        // remove transition property
        topCard.style.transition = null

        // get card coordinates in pixels
        const style = window.getComputedStyle(topCard)
        const mx = style.transform.match(/^matrix\((.+)\)$/)
        card.startPosX = mx ? parseFloat(mx[1].split(', ')[4]) : 0
        card.startPosY = mx ? parseFloat(mx[1].split(', ')[5]) : 0

        // get card bounds
        const bounds = topCard.getBoundingClientRect()

        // get finger position on card, top (1) or bottom (-1)
        card.isDraggingFrom = (e.center.y - bounds.top) > topCard.clientHeight / 2 ? -1 : 1
      }

      // get new coordinates
      let posX = e.deltaX + card.startPosX
      const posY = e.deltaY + card.startPosY

      // get ratio between swiped pixels and the axes
      const propX = e.deltaX / board.clientWidth

      // get swipe direction, left (-1) or right (1)
      const dirX = e.deltaX < 0 ? -1 : 1

      // get degrees of rotation (between 0 and +/- 45)
      const deg = card.isDraggingFrom * dirX * Math.abs(propX) * 45

      // move and rotate card
      topCard.style.transform = 'translateX(' + posX + 'px) translateY(' + posY + 'px) rotate(' + deg + 'deg)'

      if (e.isFinal) {
        this.isPanning = false
        let swipeResult = null

        // set back transition property
        topCard.style.transition = 'transform 200ms ease-out'

        // check threshold
        if (propX > 0.25 && e.direction === Hammer.DIRECTION_RIGHT) {
          // get right border position
          posX = board.clientWidth
          // throw card towards the right border
          topCard.style.transform = 'translateX(' + posX + 'px) translateY(' + posY + 'px) rotate(' + deg + 'deg)'
          swipeResult = 'accept'
        } else if (propX < -0.25 && e.direction === Hammer.DIRECTION_LEFT) {
          // get left border position
          posX = -(board.clientWidth + topCard.clientWidth)
          // throw card towards the left border
          topCard.style.transform = 'translateX(' + posX + 'px) translateY(' + posY + 'px) rotate(' + deg + 'deg)'
          swipeResult = 'decline'
        } else {
          // reset card position
          topCard.style.transform = 'translateX(-50%) translateY(-50%) rotate(0deg)'
        }

        if (swipeResult) {
          this.showSwipeHint = false
          this.emitCardSwipeResult(card, swipeResult)
        }
      }
    },
    emitCardSwipeResult (card, result) {
      this.$emit('swiperesult', { card, result })
    }
  },
  mounted () {
  },
  watch: {
    props: () => {
      this.cardLoading = true
      this.$nextTick(() => {
        this.cardLoading = false
      })
    }
  }
}
</script>

<style lang="scss">
.board {
  width: 100%;
  max-width: 640px;
  min-height: 600px;
  margin: 15px auto;
  position: relative;
  overflow: hidden;
  background-color: rgb(245, 247, 250);

  .swipe-hint {
    z-index: 10;
    position: fixed;
    width: 120px;
    bottom: 94px;
    left: 50%;
    margin-left: -60px;
    pointer-events: none;

    animation: shake 3s cubic-bezier(.36,.07,.19,.97) both;
    animation-delay: 1s;
    animation-iteration-count: infinite;
    transform: translate3d(0, 0, 0);
    backface-visibility: hidden;
    perspective: 1000px;
  }

  .swipe-card {
    width: 100%;
    height: 100%;
    max-height: 75vh;
    position: absolute;
    top: 50%;
    left: 50%;
    border-radius: 1%;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.1);
    transform: translateX(-50%) translateY(-50%) rotate(0deg);

    background-repeat: no-repeat;
    background-position: center center fixed;
    background-size: cover;

    @media (max-width: 767px) {
        top: calc(50% - 48px);
    }

    .label {
        position: absolute;
        top:0;
        left:0;
        width: 100%;
        padding: 10px;
        text-align: center;
        font-size: 20px;
        font-weight: bold;
        background: rgba(0, 0, 0, 0.6);
        color: #fff;
    }
  }

  @keyframes shake {
    0%, 40% {
      transform: translate3d(0px, 0, 0);
    }

    5%, 35% {
      transform: translate3d(4px, 0, 0);
    }

    10%, 20%, 30% {
      transform: translate3d(-8px, 0, 0);
    }

    15%, 25% {
      transform: translate3d(8px, 0, 0);
    }

    100% {
      transform: translate3d(0px, 0, 0);
    }
  }
}
</style>
