<template>
  <div>
    <headerr title="Settings"></headerr>
    <div id="settings">
      <q-btn color="purple-8" class="setting">Support</q-btn>
      <q-btn color="red">Sign Out</q-btn>
    </div>
  </div>

</template>

<script>
import headerr from './../Header'
import { QBtn, QIcon } from 'quasar'
export default {
  components: { headerr, QBtn, QIcon },
  data() {
    return {}
  },
  methods: {}
}
</script>

<style lang="stylus" scoped>
@import '~variables';

#settings {
  height: 100vh;
  width: 100vw;
  max-width: 100vw;
  max-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  margin-top: 10vh;
  overflow hidden
}

.setting {
  width: 70vw
  margin-bottom: 5vh
}

</style>

