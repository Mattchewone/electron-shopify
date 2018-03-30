<template>
  <v-layout row wrap justify-center id="wrapper">
    <v-flex xs12 class="mt-3">
      <v-data-table
        :headers="headers"
        :items="orders"
        hide-actions>
        <template slot="items" slot-scope="props">
          <td>{{ props.item.id }}</td>
          <td>{{ props.item.email }}</td>
          <td>{{ props.item.financial_status }}</td>
          <td>{{ props.item.confirmed }}</td>
          <td>{{ props.item.total_price }}</td>
          <td><v-btn small color="primary">PRINT</v-btn></td>
        </template>
      </v-data-table>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'home',
  data () {
    return {
      headers: [
        { text: 'Order#', value: 'id' },
        { text: 'Email', value: 'email' },
        { text: 'Status', value: 'financial_status' },
        { text: 'Confirmed', value: 'confirmed' },
        { text: 'Price', value: 'total_price' },
        { text: '', value: 'actions', sortable: false }
      ]
    }
  },
  computed: {
    ...mapGetters('shopify', {
      findOrdersFromStore: 'find'
    }),

    orders () {
      return this.findOrdersFromStore()
    }
  },
  methods: {
    ...mapActions('shopify', {
      findOrders: 'find'
    })
  },
  created () {
    this.findOrders()
  }
}
</script>

<style scoped>
  .centered
  {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
