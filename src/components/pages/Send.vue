<template>
<div>
  <headerr title="Send"> </headerr>
  <div id="amount">
    <h5>{{amountToSend.toLocaleString(undefined, {minimumFractionDigits: 8})}} XRP</h5>
    <h6>${{(amountToSend * 1.124).toLocaleString()}} USD</h6>

    <div class="keys">
      <div class="key relative-position" v-for="(key, index) in keys" :key="key"  @click="keyClicked(key)" v-ripple>{{key}}
          <q-icon v-if="index === 'back'" name="fa-arrow-left"></q-icon>
      </div>
    </div>

    <q-btn color="purple-10" style="width: 80%" @click="continuetoTransaction()">Continue</q-btn>
  </div>
  <q-modal v-model="continueTrans" maximized>
      <q-icon class="relative-position tooltipspan" style="font-size:2em; float: right" name="close" @click="continueTrans = false" v-ripple>
        <span style="right: 100%">Close</span>
      </q-icon>

    </q-modal>
</div>

</template>

<script>
import headerr from './../Header'
import { QBtn, QIcon, Ripple, QModal } from 'quasar'
export default {
  components: {
    headerr,
    QBtn,
    QIcon,
    QModal
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
      continueTrans: false
    }
  },
  methods: {
    keyClicked(key) {
      if (!this.isMaxLength(this.amountToSend)) {
        if (key !== '.' && key !== '') {
          if (!this.decimalPressed) {
            let tempString = this.amountToSend
            tempString = tempString + key.toString()
            this.amountToSend = Number(tempString)
          }
          else if (!this.secondDecimal) {
            let tempString = this.amountToSend
            tempString = tempString + '.' + key.toString()
            this.amountToSend = Number(tempString)
            this.secondDecimal = true
          }
          else {
            let tempString = this.amountToSend
            tempString = tempString + key.toString()
            this.amountToSend = Number(tempString)
          }
        }
        else if (key === '.') {
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

    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~variables';

h6 {
  color: #616161;
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

