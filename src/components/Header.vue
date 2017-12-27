<template>
<div>
    <q-toolbar id="header" class="shadow-5">
        <q-btn flat v-if="!isFirst">
          <q-icon v-if="canGoBack" class="relative-position tooltipspan" name="keyboard_arrow_left" @click="goBack" v-ripple>
          <span>Go Back</span>
          </q-icon>
        </q-btn>
        <q-toolbar-title class="headerTitle">
          {{title}}
        </q-toolbar-title>
        <q-icon v-if="isWallet" class="relative-position tooltipspan" style="font-size:1.7em;" name="fa-qrcode" @click="qrOpen = true" v-ripple>
          <span style="right: 100%">My Address</span>
        </q-icon>
    </q-toolbar>
    <q-modal v-model="qrOpen" minimized>
      <q-icon class="relative-position tooltipspan" style="font-size:2em; float: right" name="close" @click="qrOpen = false" v-ripple>
        <span style="right: 100%">Close</span>
      </q-icon>
      QR CODE GOES HERE
    </q-modal>
</div>
</template>

<script>
import {
  QToolbar,
  QToolbarTitle,
  QBtn,
  QIcon,
  QModal,
  QTooltip,
  Ripple
} from 'quasar'
/*
 * Root component
 */
export default {
  name: 'headerr',
  props: ['title'],
  components: {
    QToolbar,
    QToolbarTitle,
    QBtn,
    QIcon,
    QTooltip,
    QModal
  },
  directives: {
    Ripple
  },
  data() {
    return {
      canGoBack: window.history.length > 1,
      qrOpen: false,
      showQRTip: false
    }
  },
  methods: {
    goBack() {
      window.history.go(-1)
    },
    openQR() {},
    test() {
      console.log(1)
    }
  },
  computed: {
    isWallet() {
      if (this.$route.path === '/wallet') {
        return true
      }
      return false
    },
    isFirst() {
      let route = this.$route.path
      if (route === '/wallet' || route === '/settings') {
        return true
      }
      return false
    }
  }
}
</script>

<style lang='stylus' scoped>
@import '~variables';

#header {
  z-index: 1000;
  background-color: $primary;
  position: fixed;
  top: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  align-content: center;
}

.headerTitle {
}
</style>
