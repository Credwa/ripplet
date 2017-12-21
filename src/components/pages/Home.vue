<template>
  <q-pull-to-refresh style="color:white" :handler="refresher">
    <div id="home">
      <div class="xrp-usd"><span style="color:#31CCEC ">XRP</span>-<span style="color:#8bc34a ">USD</span> 24h <span style="color: #8bc34a">${{XRPDiffUSD}} </span> | <span :style="percentChange > 0 ? 'color:#8bc34a' : 'color:#FFA726'">(<span v-if="percentChange < 0"> -</span><span v-if="percentChange > 0">+</span>{{Math.abs(percentChange).toLocaleString()}}%)</span></div>

      <h4>Balance</h4>
      <h5>{{balanceXRP.toLocaleString()}} <span style="color:#31CCEC ">XRP</span></h5>
      <h6>${{balanceUSD.toLocaleString()}} <span style="color:#8bc34a ">USD</span></h6>

      <h4 style="margin-top:5vh;" >Life Winnings</h4>
      <h5>{{winningsXRP.toLocaleString()}} <span style="color:#31CCEC ">XRP</span></h5>

          <canvas id="last30Days" width="100vw" height="80%" ref='last30Days'></canvas>
    </div>
  </q-pull-to-refresh>
</template>

<script>
import { QBtn, QIcon, QPullToRefresh, Toast, QCard } from 'quasar'
import axios from 'axios'
import Chart from 'chart.js'
import moment from 'moment'

export default {
  components: {
    QBtn,
    QIcon,
    Toast,
    QPullToRefresh,
    QCard
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
      XRPLabelDays: []
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
    }
  },
  created() {
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
                  }
                }
              ]
            }
          }
        })
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
  color: #E0E0E0;
}

#last30Days {
  background-color: white;
  border-radius: 5px;
  max-height: 45vh;
}

#home {
  height: 100vh;
  width: 100vw;
  max-width: 100vw;
  max-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.xrp-usd {
  font-size: 0.8em;
  font-weight: 500;
}
</style>
