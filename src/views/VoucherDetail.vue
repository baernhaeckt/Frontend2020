<template>
    <div class="voucher-detail-page" v-if="!isLoading">
        <h1 class="h3 mt-4 text-center">Dein Voucher für:</h1>
        <h2 class="h3 text-center">{{voucher.offer.name}}</h2>
        <div class="vouchers mb-4">
          <flip-card class="mb-3">
            <template slot="front">
              <mdb-card>
                <mdb-card-body>
                  <h2 class="text-center h4 mb-4">QR-Code Transport-Ticket</h2>
                  <mdb-icon icon="undo" />
                </mdb-card-body>
              </mdb-card>
            </template>
            <template slot="back">
              <mdb-card>
                <mdb-card-body>
                  <h3 class="h4 text-center mb-0">QR-Code Transport-Ticket</h3>
                  <div v-html="updateViewBoxAttribute(voucher.publicTransportQrCode)" class="qr-code" />
                  <mdb-icon icon="undo" />
                </mdb-card-body>
              </mdb-card>
            </template>
          </flip-card>
          <flip-card>
            <template slot="front">
              <mdb-card>
                <mdb-card-body>
                  <h2 class="text-center h4 mb-4">QR-Code Erlebnis-Ticket</h2>
                  <mdb-icon icon="undo" />
                </mdb-card-body>
              </mdb-card>
            </template>
            <template slot="back">
              <mdb-card>
                <mdb-card-body>
                  <h3 class="h4 text-center mb-0">QR-Code Erlebnis-Ticket</h3>
                  <div v-html="updateViewBoxAttribute(voucher.voucherQrCode)" class="qr-code" />
                  <mdb-icon icon="undo" />
                </mdb-card-body>
              </mdb-card>
            </template>
          </flip-card>
        </div>

        <template v-if="havePaidOffers">
          <h2>Zusatzangebote</h2>
          <div class="mb-3" v-for="offer in paidOffers" :key="offer.id">
            <mdb-card>
              <mdb-card-image :src="`https://baernhaeckt2020.blob.core.windows.net/images/paidoffers/${offer.name.replace(/ /g,'_')}.jpg`"></mdb-card-image>
              <mdb-card-body>
                <h3>{{offer.name}}</h3>
                <ul class="offer-props">
                  <li><strong>Dauer</strong>: {{parseTimeSpan(offer.duration)}}</li>
                  <li><strong>Ort</strong>: {{offer.location}}</li>
                </ul>
                <p>{{offer.description}}</p>
                <div class="clearfix">
                  <mdb-btn color="success" class="float-right">Angebot entdecken</mdb-btn>
                </div>
              </mdb-card-body>
            </mdb-card>
          </div>
        </template>
    </div>
</template>

<script>
import { VOUCHERS_SINGLE } from '@/plugins/store/actions/vouchers'
import { PAIDOFFERS_LIST } from '@/plugins/store/actions/paidOffers'

export default {
  name: 'VoucherDetail',
  props: {
    voucherId: {
      type: String
    }
  },
  data () {
    return {
      voucher: {},
      paidOffers: [],
      isLoading: true
    }
  },
  computed: {
    havePaidOffers () {
      return this.paidOffers.length > 0
    }
  },
  methods: {
    updateViewBoxAttribute (qrCode) {
      // const width = qrCode.match(/width="(\d*)"/i)[1]
      // const height = qrCode.match(/height="(\d*)"/i)[1]
      return qrCode // .replace(/^<svg./g, `<svg viewBox="0 0 ${width} ${height}"`).replace(/width="(\d*)"/i, 'width="300"').replace(/height="(\d*)"/i, 'height="300"')
    },
    parseTimeSpan (timeSpan) {
      var parts = timeSpan.split(':')
      var hours = parseInt(parts[0])
      var minutes = parseInt(parts[1])
      var seconds = parseInt(parts[2])

      var result = []
      if (hours > 1) {
        result.push(`${hours} Stunden`)
      } else if (hours > 0) {
        result.push(`${hours} Stunde`)
      }
      if (minutes > 1) {
        result.push(`${minutes} Minuten`)
      } else if (minutes > 0) {
        result.push(`${minutes} Minute`)
      }
      if (seconds > 1) {
        result.push(`${seconds} Sekunden`)
      } else if (seconds > 0) {
        result.push(`${seconds} Sekunde`)
      }

      return result.join(', ')
    }
  },
  mounted () {
    this.$store.dispatch(VOUCHERS_SINGLE, this.voucherId).then(voucher => {
      this.voucher = voucher

      this.$store.dispatch(PAIDOFFERS_LIST, this.voucher.offer.id).then(paidOffers => {
        this.paidOffers = paidOffers
        this.isLoading = false
      })
    })
  }
}
</script>

<style lang="scss">
.voucher-detail-page {
  .qr-code {
    svg {
      display: block;
      margin: 0 auto;
    }
  }

  .offer-props {
    padding-left: 20px;
  }

  .vouchers {
    i {
      position: absolute;
      bottom: 15px;
      right: 15px;
    }
  }
}
</style>
