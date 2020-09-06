<template>
    <div class="payment-page">
        <h1 class="h3 mt-4">Wähle Deine Zahlungsart</h1>
        <mdb-container>
            <mdb-row>
                <mdb-col col="4" v-for="provider in providers" :key="provider.name">
                    <mdb-card>
                        <mdb-view>
                            <a @click="selectProvider(provider.name)"><mdb-card-image :src="`/img/payment/${provider.name}.png`" :alt="provider.label" /></a>
                        </mdb-view>
                    </mdb-card>
                </mdb-col>
            </mdb-row>
        </mdb-container>
    </div>
</template>

<script>
import { VOUCHERS_ORDER } from '@/plugins/store/actions/vouchers'

export default {
  name: 'Payment',
  props: {
    offerId: {
      type: String
    }
  },
  data () {
    return {
      providers: [
        { label: 'Postcard', name: 'postfinance-alternate2' },
        { label: 'Postfinance', name: 'postfinance' },
        { label: 'Twint', name: 'twint' },
        { label: 'Mastercard', name: 'mastercard' },
        { label: 'American-Express', name: 'american-express' },
        { label: 'Maestro', name: 'maestro' },
        { label: 'Visa', name: 'visa' },
        { label: 'Paypal', name: 'paypal-alternative2' },
        { label: 'Applepay', name: 'applepay' },
        { label: 'Googlepay', name: 'googlepay' },
        { label: 'Bitcoin', name: 'bitcoin' },
        { label: 'Paysafecard', name: 'paysafecard' }
      ]
    }
  },
  methods: {
    selectProvider () {
      this.$store.dispatch(VOUCHERS_ORDER, this.$props.offerId).then((voucher) => {
        this.$toastr.s('Vielen Dank', 'Vielen Dank für Deine Bestellung.')
        this.$router.push({ name: 'voucherdetail', params: { voucherId: voucher.id } })
      })
    }
  }
}
</script>

<style lang="scss">
.payment-page {
    .container {
        margin-top: 15px;
        padding-left: 3px;
        padding-right: 3px;

        .row {
            margin-left: -6px;
            margin-right: -6px;

            .col-4 {
                padding-left: 3px;
                padding-right: 3px;
                margin-bottom: 6px;
            }
        }
    }

    .card {
        border-radius: 15px;
    }
}
</style>
