<template>
  <q-pull-to-refresh style="color:white" :handler="refresher">
    <div id="home">
      <div class="xrp-usd"><span style="color:#31CCEC ">XRP</span>-<span style="color:#8bc34a ">USD</span> 24h <span style="color: #8bc34a">${{XRPDiffUSD}} </span> | <span :style="percentChange > 0 ? 'color:#8bc34a' : 'color:#FFA726'">(<span v-if="percentChange < 0"> -</span><span v-if="percentChange > 0">+</span>{{Math.abs(percentChange).toLocaleString()}}%)</span></div>
      <q-card class="balance shadow-4" @click="goToWallet">
        <div class="ripID">rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn</div>
        <h4>Balance</h4>
        <q-card-separator/>
        <h5>{{balanceXRP.toLocaleString()}} <span style="color:#31CCEC ">XRP</span></h5>
        <h6>${{balanceUSD.toLocaleString()}} <span style="color:#8bc34a ">USD</span></h6>
      </q-card>



      <canvas v-show="!loading" id="last30Days" class="shadow-6" width="80vw" height="80%" ref='last30Days'></canvas>
      <q-spinner-bars color="purple-9" size="10vh" style="margin-top:15vh" v-show="loading"> </q-spinner-bars>
      <div class="bg"></div><div class="bg2"></div>
    </div>
  </q-pull-to-refresh>
</template>

<script>
import {
  QBtn,
  QIcon,
  QPullToRefresh,
  Toast,
  QCard,
  QSpinnerBars,
  QCardSeparator,
  QCardTitle
} from 'quasar'
import axios from 'axios'
import Chart from 'chart.js'
import moment from 'moment'

export default {
  components: {
    QBtn,
    QIcon,
    Toast,
    QPullToRefresh,
    QCard,
    QSpinnerBars,
    QCardSeparator,
    QCardTitle
  },
  data() {
    return {
      canGoBack: window.history.length > 1,
      balanceXRP: 56.881,
      balanceUSD: 0,
      balanceChange: 0,
      winningsXRP: 0,
      XRPDiffUSD: 0,
      percentChange: 0,
      XRPLast30Days: [],
      XRPLabelDays: [],
      loading: false
    }
  },
  methods: {
    goBack() {
      window.history.go(-1)
    },
    refresher(done) {
      setTimeout(() => {
        this.$router.push('/')
        done()
      }, 1000)
    },
    goToWallet() {
      this.$router.push('/wallet')
    }
  },
  created() {
    this.loading = true
    // change request to backend and websocket
    axios
      .get('https://api.coinmarketcap.com/v1/ticker/ripple/')
      .then(res => {
        this.percentChange = res.data[0].percent_change_24h
        this.XRPDiffUSD = res.data[0].price_usd
        this.balanceUSD = this.balanceXRP * this.XRPDiffUSD
      })
      .catch(e => {
        Toast.create.warning({ html: 'Unable to load data try again later' })
      })
    axios
      .get(
        'https://min-api.cryptocompare.com/data/histoday?fsym=XRP&tsym=USD&limit=30&aggregate=1'
      )
      .then(res => {
        res.data.Data.forEach(element => {
          this.XRPLast30Days.push(element.high)
          let myMoment = moment.unix(element.time).format('MM-DD')
          this.XRPLabelDays.push(myMoment)
        })
        let ctx = this.$refs.last30Days
        let myChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: [...this.XRPLabelDays],
            datasets: [
              {
                label: 'XRP-USD Last 30 Days',
                data: this.XRPLast30Days,
                backgroundColor: 'rgba(49, 204, 236, 0.3)',
                borderColor: 'rgba(40, 190, 255, 1)',
                borderWidth: 2
              }
            ]
          },
          options: {
            tooltips: {
              mode: 'index',
              intersect: false
            },
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true
                  },
                  gridLines: {
                    color: 'rgba(117,117,117,.05)'
                  }
                }
              ],
              xAxes: [
                {
                  gridLines: {
                    color: 'rgba(0,0,0,0)'
                  }
                }
              ]
            }
          }
        })
        this.loading = false
        myChart.render()
      })
      .catch(e => {
        Toast.create.warning({
          html: 'Unable to load chart data try again later'
        })
      })
  }
}
</script>

<style lang="stylus" scoped>
@import '~variables';

h4 {
  color: #616161;
}

.balance {
  display: flex;
  flex-direction: column;
  width: 90%;
  align-items: center;
  neutral-grad();
  border-radius: 3px;
  flex-wrap: wrap;
  margin-bottom: 8vh;
}

.balance:active {
  box-shadow: 1px 1px grey;
}

.q-card-separator {
  width: 90%;
}

.ripID {
  font-size: 0.9em;
  color: grey;
}

.bg {
  background-color: $primary;
  position: absolute;
  z-index: -1;
  height: 30vh;
  top: 0;
  width: 100vw;
}

.bg2 {
  background-color: $primary;
  position: absolute;
  z-index: -1;
  height: 30vh;
  bottom: 0;
  width: 100vw;
}

#last30Days {
  neutral-grad();
  border-radius: 5px;
  max-height: 45vh;
  max-width: 90vw;
}

#home {
  height: 100vh;
  width: 100vw;
  max-width: 100vw;
  max-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
}

.xrp-usd {
  font-size: 0.8em;
  font-weight: 500;
}
</style>
