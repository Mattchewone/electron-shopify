import shopify from '@/utils/api-client'

const state = {
  ordersKeyedByNumber: {},
  loading: false
}

const mutations = {
  LOADING (state, bool) {
    state.loading = bool
  },
  ADD_ITEMS (state, items) {
    state.ordersKeyedByNumber = items
  }
}

const getters = {
  find: state => (params = {}) => {
    const values = []
    for (let key in state.ordersKeyedByNumber) {
      values.push(state.ordersKeyedByNumber[key])
    }

    return values
  },

  get: state => (id, params = {}) => {
    return state.ordersKeyedByNumber[id] ? state.ordersKeyedByNumber[id] : null
  }
}

const actions = {
  find ({ commit }, url) {
    commit('LOADING', true)
    shopify.order.list({ limit: 5, fulfillment_status: 'unshipped', fields: 'id,email,order_number,total_price,shipping_address,line_items,financial_status,confirmed' })
      .then(response => {
        const map = response.reduce((map, current) => {
          map[current.order_number] = current
          return map
        }, {})
        commit('ADD_ITEMS', map)
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
