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
                    </mdb-card>
            </template>
            <template slot="back">
                <mdb-card>
                    <mdb-card-body>
                        <mdb-card-title>{{offer.name}}</mdb-card-title>
                        <mdb-card-text>
                            <p>{{offer.description}}</p>
                            <p>Du wirst begleitet von {{offer.guideDisplayName}}.</p>
                            <p><strong>Folgende Leistungen sind im Angebot inbegriffen:</strong></p>
                            <ul>
                                <li v-for="incl in offer.includedItems" :key="incl.name">
                                    {{incl.name}}: {{incl.description}} <mdb-badge color="primary">Wert: {{new Intl.NumberFormat('de-CH', { style: 'currency', currency: 'CHF' }).format(incl.price)}}</mdb-badge>
                                </li>
                            </ul>
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
  }
}
</script>

<style lang="scss">
.offer-list {
    .card {
        &:first-child {
            margin-top: 15px;
        }
    }
}
</style>
