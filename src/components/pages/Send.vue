<template>
<div>
  <headerr title="Send"> </headerr>
  <div id="amount">
    <h5>{{amountToSend.toLocaleString(undefined, {minimumFractionDigits: 8})}} XRP</h5>
    <h6>${{(amountToSend * getXRPDiffUSD).toLocaleString()}} USD</h6>

    <div class="keys">
      <div class="key relative-position" v-for="(key, index) in keys" :key="key"  @click="keyClicked(key)" v-ripple>{{key}}
          <q-icon v-if="index === 'back'" name="fa-arrow-left"></q-icon>
      </div>
    </div>

    <q-btn color="purple-10" style="width: 80%" @click="continueToTransaction()">Continue</q-btn>
  </div>
  <q-modal v-model="continueTrans" maximized>
      <q-icon class="relative-position tooltipspan close" style="font-size:2em;" name="close" @click="continueTrans = false" v-ripple>
        <span style="right: 100%; color: white">Close</span>
      </q-icon>

      <div class="details" v-if="!sending && !sent && !notSent">
        <h6>{{amountToSend.toLocaleString(undefined, {minimumFractionDigits: 8})}} XRP </h6>
        <q-field class="inputData"
        >
          <q-input v-model="rippleIDToSend" type="email" :after="[{icon: 'fa-qrcode', handler () {
            scanQR()
          }}]" float-label="Address" class="inputData"  color="purple-8"/>
        </q-field>

        <q-field class="inputData"
        >
          <q-input v-model="secret" float-label="Deposit Tag (Optional)" color="purple-8"/>
        </q-field>
        <q-field class="inputData"
        >
          <q-input v-model="secret" float-label="Invoice ID (Optional)" color="purple-8"/>
        </q-field>
        <q-btn color="purple-10" style="width: 100%; top : 20vh" @click="send()">Send</q-btn>
      </div>

  </q-modal>
</div>

</template>

<script>
import headerr from './../Header'
import {
  QBtn,
  QIcon,
  Ripple,
  QModal,
  Toast,
  QField,
  QInput,
  Loading,
  QSpinnerPuff
} from 'quasar'
const rippleAddress = require('ripple-address-codec')
import { mapGetters } from 'vuex'

function show(options) {
  Loading.show(options)
  setTimeout(() => {
    Loading.hide()
  }, 3000)
}

export default {
  components: {
    headerr,
    QBtn,
    QIcon,
    QModal,
    Toast,
    QField,
    QInput,
    Loading,
    QSpinnerPuff
  },
  directives: {
    Ripple
  },
  data() {
    return {
      keys: {
        one: 1,
        two: 2,
        three: 3,
        four: 4,
        five: 5,
        six: 6,
        seven: 7,
        eight: 8,
        nine: 9,
        dot: '.',
        zero: 0,
        back: ''
      },
      amountToSend: 0,
      decimalPressed: false,
      secondDecimal: false,
      continueTrans: false,
      amountValid: false,
      secret: '',
      rippleIDToSend: null,
      sending: false,
      sent: false,
      notSent: false
    }
  },
  methods: {
    scanQR() {

    },
    keyClicked(key) {
      if (!this.isMaxLength(this.amountToSend)) {
        if (key !== '.' && key !== '') {
          if (!this.decimalPressed) {
            let tempString = this.amountToSend
            tempString = tempString + key.toString()
            this.amountToSend = Number(tempString)
          } else if (!this.secondDecimal) {
            let tempString = this.amountToSend
            tempString = tempString + '.' + key.toString()
            this.amountToSend = Number(tempString)
            this.secondDecimal = true
          } else {
            let tempString = this.amountToSend
            tempString = tempString + key.toString()
            this.amountToSend = Number(tempString)
          }
        } else if (key === '.') {
          if (this.amountToSend.toString().indexOf('.') === -1) {
            this.decimalPressed = true
          }
        }
      }
      if (key === '') {
        this.amountToSend = Number(this.amountToSend.toString().slice(0, -1))
      }
    },
    isMaxLength(num) {
      let myNums = num.toString().split('.')
      if (myNums[0]) {
        if (myNums[0].length > 8) {
          return true
        }
      }
      if (myNums[1]) {
        if (myNums[1].length > 8) {
          return true
        }
      }

      return false
    },
    continueToTransaction() {
      if (this.amountToSend === 0) {
        Toast.create.warning({
          html: "Amount Can't Be 0"
        })
      } else {
        this.continueTrans = true
      }
    },
    send() {
      if (rippleAddress.isValidAddress(this.rippleIDToSend.trim())) {
        Loading.show({
          spinner: QSpinnerPuff,
          spinnerColor: 'purple',
          message: 'Sending...',
          messageColor: 'white',
          spinnerSize: 200
        })
        setTimeout(() => {
          show({
            message: `${this.amountToSend} XRP Successfully Sent`,
            messageColor: 'white',
            spinnerColor: 'green',
            spinnerSize: 1
          })
          this.amountToSend = 0
          this.$router.push('/wallet')
        }, 3000)
        this.continueTrans = false
      } else {
        Toast.create.warning({ html: 'Ripple Address not valid ' })
      }
    }
  },
  computed: mapGetters(['getXRPDiffUSD', 'getBalanceXRP', 'getWalletID']),
  created() {
    if (this.$route.params.address !== 'null') {
      this.rippleIDToSend = this.$route.params.address
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~variables';

h6 {
  color: #616161;
}

.details {
  margin-top: 15vh;
  max-width: 90vw;
  min-width: 90vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
  margin-left: 5vw;
  margin-right: 5vw;
}

.inputData {
  display: flex;
  flex-direction: row;
  min-width: 90vw;
}

#amount {
  height: 100vh;
  width: 100vw;
  max-width: 100vw;
  max-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  neutral-grad();
  padding-top: 7vh;
}

.keys {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 5vh;
  color: black;
  font-size: 2em;
  justify-content: center;
  margin-bottom: 3vh;
}

.key {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 33vw;
  height: 13vh;
  text-align: center;
  border: none;
}
</style>

