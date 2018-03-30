import shopify from '@/utils/api-client'

const state = {
  orders: [],
  loading: false
}

const mutations = {
  LOADING (state, bool) {
    state.loading = bool
  },
  ADD_ITEMS (state, items) {
    state.orders = items
  }
}

const getters = {
  find: state => (params = {}) => {
    return state.orders
  }
}

const actions = {
  find ({ commit }, url) {
    commit('LOADING', true)
    shopify.order.list({ limit: 5, status: 'any', fields: 'id,email,total_price,billing_address,line_items,financial_status,confirmed' })
      .then(response => {
        commit('ADD_ITEMS', response)
        commit('LOADING', false)
      })
  }
}

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true
}
