<template>
  <div id="transaction" class="relative-position" v-ripple :style="transaction.sent ? 'border-bottom: 1px solid #D32F2F' : 'border-bottom: 1px solid #388E3C'" @click="transactionOpen = true">
    <div style="margin-bottom: 1vh">{{transaction.address}}</div>
    <div style="margin-bottom: 1vh">{{transaction.date}}</div>
    <div class="last"><div class="remaining">{{transaction.remainingXRP.toLocaleString()}} XRP</div>

    <div class="tsXRP" :style="transaction.sent ? 'color: #D32F2F' : 'color:#388E3C'"><span v-if="!transaction.sent">+</span><span v-else>-</span>{{transaction.transactionXRP.toLocaleString()}} XRP</div></div>
    <q-modal v-model="transactionOpen" minimized>
      <q-icon class="relative-position close" style="font-size:2em;" name="close" @click="transactionOpen = false" v-ripple>
      </q-icon>
    <div class="details">
      <h5 style="color: #31CCEC">{{transaction.transactionXRP.toLocaleString()}} XRP</h5>
      <p style="font-size:0.8em"><br>{{transaction.address}}</p>
      <p>{{transaction.date}}</p>

      <p v-if="transaction.status === 1"> <span ><div class="complete"> </div>Complete</span></p>

      <p v-if="transaction.status === 2"> <span> <div class="pending"></div> Pending</span></p>

      <p v-if="transaction.status === 3"> <span><div class="failed"></div> Failed</span></p>

      <q-icon class="relative-position tooltipspan" style="font-size:2em; float: right" name="send" @click="sendMore()" v-ripple>
        <span style="top: 100%">Send More</span>
      </q-icon>
    </div>
    </q-modal>
  </div>
</template>

<script>
import { QIcon, Ripple, QModal, QBtn } from 'quasar'
export default {
  components: {
    QIcon,
    QModal,
    QBtn
  },
  directives: {
    Ripple
  },
  props: ['transaction'],
  data() {
    return {
      transactionOpen: false
    }
  },
  methods: {
    sendMore() {
      this.$router.push(`/wallet/send/${this.transaction.address}`)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~variables';

.tooltipspan {
  border: none
  margin-bottom: 5vh
  max-width: 30%
  border-radius: 0px
  border-bottom: none
  color: $primary
  span {
    background-color white
    color: black
  }
}

#transaction {
  height: auto
  width: 90vw
  flex-direction: column;
  align-items: flex-start;
  color: #9E9E9E;
  justify-content: space-between
  align-content center
  &:active {
    background-color: #E0E0E0
  }
  margin-bottom: 1vh
}

.details>* {
  border-bottom: solid 1px grey
  width 100%
  text-align center
  padding-bottom 3vh
}

.details {
  margin-top: 10vh;
  max-width: 100vw;
  display: flex;
  flex-direction: column;
  margin-left: 5vw;
  margin-right: 5vw;
  justify-content: center;
  align-items: center;
  color: #616161;
}

.complete {
  min-height: 2vh
  min-width : 2vh
  max-width: 2vh
  max-height: 2vh
  background-color: $positive
  border-radius: 50px
  margin-left 48%
}

.sendmore {
  width: 60%
  max-height: 20%
  margin-bottom: 5vh
}

.pending {
  min-height: 2vh
  min-width : 2vh
  max-width: 2vh
  max-height: 2vh
  background-color: $warning
  border-radius: 50px
  margin-left 48%
}

.failed {
  min-height: 2vh
  min-width : 2vh
  max-width: 2vh
  max-height: 2vh
  background-color: $negative
  border-radius: 50px
  margin-left 48%
}



.last {
  display flex
  flex-direction row
  justify-content space-between
}
.remaining {
  color: $info
}
.tsXRP {
}

</style>

