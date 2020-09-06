<template>
    <div class="voucher-redeem-page" v-if="!isLoading">
      <h1>Voucher einlösen</h1>
      <p v-if="redeemSuccess">Du hast den Voucher erfolgreich eingelöst, Deine Leistungen werden Dir wie vereinbart vergütet.</p>
      <p v-else>Beim einlösen des Vouchers ist leider ein Fehler aufgetreten: <span v-text="redeemError"></span>.</p>
    </div>
</template>

<script>
import { VOUCHERS_REDEEM } from '@/plugins/store/actions/vouchers'

export default {
  name: 'VoucherRedeem',
  props: {
    voucherId: {
      type: String
    }
  },
  data () {
    return {
      redeemSuccess: false,
      redeemError: '',
      isLoading: true
    }
  },
  methods: {
  },
  mounted () {
    this.$store.dispatch(VOUCHERS_REDEEM, this.voucherId).then(() => {
      this.redeemSuccess = true
      this.isLoading = false
    }).catch(err => {
      console.log(err)
      this.redeemSuccess = false
      this.redeemError = err.statusCode === 401 ? 'Dieser Voucher ist nicht für Dich bestimmt und kann so nicht eingelöst werden, sorry.' : err.error
      this.isLoading = false
    })
  }
}
</script>

<style lang="scss">
.voucher-redeem-page {
}
</style>
