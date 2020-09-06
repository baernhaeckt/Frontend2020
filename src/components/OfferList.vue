<template>
    <div class="offer-list">
        <flip-card v-for="offer in $props.offers" :key="offer.id" class="mb-3">
            <template slot="front">
                    <mdb-card>
                        <mdb-card-image :src="`https://baernhaeckt2020.blob.core.windows.net/images/offers/${offer.name.replace(/ /g,'_')}.jpg`"></mdb-card-image>
                        <mdb-card-body>
                            <mdb-card-title>{{offer.name}}</mdb-card-title>
                            <mdb-card-text>{{offer.description}}</mdb-card-text>
                            <mdb-btn color="primary">Details</mdb-btn>
                        </mdb-card-body>
                        <span class="guide-bubble">
                            <img class="img-fluid z-depth-1 rounded-circle" :src="`https://baernhaeckt2020.blob.core.windows.net/images/guides/${offer.guideDisplayName.replace(/ /g,'_').toLowerCase()}.jpg`" width="60" height="60" />
                        </span>
                        <span class="price-tag-container">
                            <span class="price-tag">{{calculatePrice(offer)}}</span>
                        </span>
                    </mdb-card>
            </template>
            <template slot="back">
                <mdb-card class="backside">
                    <mdb-card-body>
                        <mdb-card-title>{{offer.name}}</mdb-card-title>
                        <mdb-card-text>
                            <p class="floated-text">
                                <img class="z-depth-1 rounded-circle float-right mt-2" :src="`https://baernhaeckt2020.blob.core.windows.net/images/guides/${offer.guideDisplayName.replace(/ /g,'_').toLowerCase()}.jpg`" width="120" height="120" />
                                {{offer.description}}
                            </p>
                            <p>Du wirst begleitet von {{offer.guideDisplayName}}.</p>
                            <p><strong>Folgende Leistungen sind im Angebot inbegriffen:</strong></p>
                            <ul class="included-items">
                                <li v-for="incl in offer.includedItems" :key="incl.name">
                                    <strong>{{incl.name}}</strong>: {{incl.description}} <mdb-badge color="primary">Wert: {{new Intl.NumberFormat('de-CH', { style: 'currency', currency: 'CHF' }).format(incl.price)}}</mdb-badge>
                                </li>
                            </ul>
                            <p><strong>Total: {{calculatePrice(offer)}}</strong></p>
                            <a class="btn btn-primary float-right" @click.stop.prevent="() => selectOffer(offer)">Angebot auswählen</a>
                        </mdb-card-text>
                    </mdb-card-body>
                </mdb-card>
            </template>
        </flip-card>
    </div>
</template>

<script>
export default {
  name: 'OfferList',
  props: {
    offers: {
      type: Array
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
    selectOffer: function (offer) {
      this.$emit('offerselected', offer)
    }
  }
}
</script>

<style lang="scss">
.offer-list {
    .card {
        position: relative;

        .price-tag-container {
            border-style: solid;
            border-width: 0 85px 58px 0;
            position: absolute;
            top: 0;
            right: 0;
            height: 0px;
            width: 0px;
            -ms-transform: rotate(360deg);
            -o-transform: rotate(360deg);
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
            border-color: transparent #d22831 transparent transparent;

            .price-tag {
                color: #fff;
                position: absolute;
                right: -84px;
                top: 15px;
                font-size: 12px;
                font-weight: bold;
                white-space: nowrap;
                transform: rotate(35deg);
            }
        }

        .guide-bubble {
            position: absolute;
            left: 15px;
            top: 155px;
            border: 3px solid #d22831;
            border-radius: 50%;
        }

        .included-items {
            padding-left: 20px;
        }

        &:first-child {
            margin-top: 15px;
        }

        &.backside {
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
    }
}
</style>
