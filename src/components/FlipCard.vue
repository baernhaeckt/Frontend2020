<template>
  <div v-bind:class="flipped ? 'flip-container flipped': 'flip-container'">
    <div class="flipper" @click="flipped=!flipped">
      <div class="front">
        <slot name="front"></slot>
      </div>
      <div class="back">
        <slot name="back"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FlipCard',
  data: function () {
    return {
      flipped: false
    }
  }
}
</script>

<style type='text/css' scoped>
.flip-container {
  perspective: 1000;
}
.flip-container {
  min-height: 120px;
}
.flipper {
  transform: perspective(1000px);
  transform-style: preserve-3d;
  position: relative;
}
.front,
.back {
  backface-visibility: hidden;
  transition: 0.6s;
  transform-style: preserve-3d;
  top: 0;
  left: 0;
  width: 100%;
}
.back {
  transform: rotateY(-180deg);
  position: absolute;
}
.flip-container.flipped .back {
  transform: rotateY(0deg);
  position: inherit;
}
.flip-container.flipped .front {
  transform: rotateY(180deg);
  position: absolute;
}
.front {
  z-index: 2;
}
</style>
