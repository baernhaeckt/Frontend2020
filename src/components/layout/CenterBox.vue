<template>
    <div class="center-box">
        <slot />
    </div>
</template>

<script>
export default {
  name: 'center-box'
}
</script>

<style lang="scss">
.center-box {
    max-width: 350px;
    margin: 75px auto;
}
</style>
