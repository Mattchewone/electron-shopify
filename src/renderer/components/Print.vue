<template>
  <v-layout row wrap justify-center>
    <v-layout justify-start class="page-actions">
      <v-btn color="error" to="/" small>Back</v-btn>
    </v-layout>

    <v-layout justify-end class="page-actions">
      <v-btn color="primary" small @click="handlePrint">Print</v-btn>
      <v-flex xs3>
        <v-select
          :items="items"
          v-model="selectedPrintState"
          label="Select"
          single-line></v-select>
      </v-flex>
    </v-layout>

    <v-flex xs12 class="mt-3 address">
      <p>{{ order.shipping_address.name }}</p>
      <p>{{ order.shipping_address.address1 }}</p>
      <p v-if="order.shipping_address.address2">{{ order.shipping_address.address2 }}</p>
      <p>{{ order.shipping_address.city }}</p>
      <p>{{ order.shipping_address.zip }}</p>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'print',
  data () {
    return {
      selectedPrintState: '',
      items: ['shipped', 'partial']
    }
  },
  computed: {
    ...mapGetters('shopify', {
      getOrder: 'get'
    }),

    order () {
      return this.getOrder(this.$route.params.id)
    }
  },
  methods: {
    handlePrint () {
      window.print()
    }
  }
}
</script>

<style scoped>
  @media print {
    .page-actions {
      display: none;
    }
  }

  .pagebreak {
    page-break-after: always;
  }

  .address p {
    margin-bottom: 0;
  }
</style>
