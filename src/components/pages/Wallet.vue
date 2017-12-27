<template>
  <div >
    <headerr title="Wallet"> </headerr>
    <div id="wallet">
      <div class="bg">
        <h5>{{ getBalanceXRP.toLocaleString() }} <span style="color:#31CCEC ">XRP</span></h5>
        <h6>${{ calcBalanceUSD.toLocaleString() }} <span style="color:#8bc34a ">USD</span></h6>

         <q-btn color="purple-6" icon="fa-send" style="margin-top: 4vh; margin-bottom: 4vh" @click="sendXRP">Send</q-btn>

      </div>
      <h5 style="color:grey">
        Recent Transactions
      </h5>
      <div class="transactions">
        <div v-for="(transaction, index) in transactions" :key="transaction.address + transaction.date + transaction.remainingXRP  + index"><transaction :transaction="transaction" :style="index === transactions.length-1 ? 'margin-bottom: 10vh' : ''"></transaction></div>
      </div>
    </div>
  </div>
</template>

<script>
import headerr from './../Header'
import transaction from './../Transaction'
import { QIcon, Ripple, QBtn } from 'quasar'
import { mapGetters } from 'vuex'
export default {
  components: {
    headerr,
    QIcon,
    QBtn,
    transaction
  },
  directives: {
    Ripple
  },
  data() {
    return {
      transactions: [
        {
          sent: false,
          address: 'rndofanfskmglagakdsgnGKDNGDpdkgm',
          date: '12/21/17',
          remainingXRP: '125105180',
          transactionXRP: '25',
          status: 1
        },
        {
          sent: true,
          address: 'rndofanfskmglagakdsgnGKDNGDpdkgm',
          date: '12/21/17',
          remainingXRP: '125105180',
          transactionXRP: '15',
          status: 1
        },
        {
          sent: true,
          address: 'rndofanfskmglagakdsgnGKDNGDpdkgm',
          date: '12/20/17',
          remainingXRP: '125105180',
          transactionXRP: '125',
          status: 1
        },
        {
          sent: false,
          address: 'rndofanfskmglagakdsgnGKDNGDpdkgm',
          date: '12/19/17',
          remainingXRP: '125105180',
          transactionXRP: '325',
          status: 1
        },
        {
          sent: false,
          address: 'rndofanfskmglagakdsgnGKDNGDpdkgm',
          date: '12/19/17',
          remainingXRP: '125105180',
          transactionXRP: '500',
          status: 3
        },
        {
          sent: true,
          address: 'rndofanfskmglagakdsgnGKDNGDpdkgm',
          date: '12/18/17',
          remainingXRP: '125105180',
          transactionXRP: '623',
          status: 2
        }
      ]
    }
  },
  methods: {
    sendXRP() {
      this.$router.push('/wallet/send/null')
    }
  },
  computed: mapGetters(['calcBalanceUSD', 'getBalanceXRP'])
}
</script>

<style lang="stylus" scoped>
@import '~variables';

h5, h6 {
  color: white;
}

#wallet {
  height: 100vh;
  width: 100vw;
  max-width: 100vw;
  max-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
}

.transactions {
  display: flex;
  flex-direction: column;
}

.bg {
  top: 0;
  background-color: $primary;
  height: auto;
  width: 100vw;
  padding-top: 10vh;
  flex-direction: column;
  align-items: center;
  color: white;
  text-align: center;
}
</style>

