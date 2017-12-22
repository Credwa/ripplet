<template>
  <div id="transaction" class="relative-position" v-ripple :style="transaction.sent ? 'border-bottom: 1px solid #D32F2F' : 'border-bottom: 1px solid #388E3C'" @click="transactionOpen = true">
    <div style="margin-bottom: 1vh">{{transaction.address}}</div>
    <div style="margin-bottom: 1vh">{{transaction.date}}</div>
    <div class="last"><div class="remaining">{{transaction.remainingXRP.toLocaleString()}} XRP</div>

    <div class="tsXRP" :style="transaction.sent ? 'color: #D32F2F' : 'color:#388E3C'"><span v-if="!transaction.sent">+</span><span v-else>-</span>{{transaction.transactionXRP.toLocaleString()}} XRP</div></div>
    <q-modal v-model="transactionOpen" minimized>
      <q-icon class="relative-position" style="font-size:2em; float: right" name="close" @click="transactionOpen = false" v-ripple>
      </q-icon>

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
  }
}
</script>

<style lang="stylus" scoped>
@import '~variables';

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

