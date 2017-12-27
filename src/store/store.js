import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    XRPDiffUSD: 0,
    balanceXRP: 56,
    walletID: 'rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn'
  },
  getters: {
    calcBalanceUSD: state => {
      return state.XRPDiffUSD * state.balanceXRP
    },
    getXRPDiffUSD: state => {
      return state.XRPDiffUSD
    },
    getBalanceXRP: state => {
      return state.balanceXRP
    },
    getWalletID: state => {
      return state.walletID
    }
  },
  mutations: {
    setXRPDiffUSD: (state, XRPDiffUSD) => {
      state.XRPDiffUSD = XRPDiffUSD
    },
    setBalanceXRP: (state, balanceXRP) => {
      state.balanceXRP = balanceXRP
    },
    setWalletID: (state, walletID) => {
      state.walletID = walletID
    }
  }
})
