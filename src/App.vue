<template>
  <!-- Don't drop "q-app" class -->
  <div id="q-app">
        <router-view/>
    <footerr> </footerr>
  </div>
</template>

<script>
import {} from 'quasar'
import footerr from './components/Footer'
/*
 * Root component
 */

export default {
  components: {
    footerr
  },
  data() {
    return {}
  },
  methods: {}
}
</script>

<style lang='stylus'>
@import '~variables';

h1, h2, h3, h4, h5, h6 {
  color: black;
}

body {
  neutral-grad();
  color: black;
}

.close {
  position: absolute;
  top: 0;
  right: 0;
}

.tooltipspan {
  border-radius:50px;
  &:active {
    background-color: rgba(117, 117, 117, 0.6);
  }

  span {
    display: none;
    background-color: #424242;
    z-index: 1000;
    font-size: 0.6em;
    border-radius: 10px;
    font-family: 'Times New Roman', Times, serif;
    padding: 5px;
    position: absolute;
    opacity: 0.9;
  }

  &:active {
    span {
      display: inline-block;
      position: absolute;
    }
  }
}
</style>
