<template>
  <div id="footer">
      <q-tabs align="justify" class="shadow-6" color="blue-14" slot="navigation" >
          <q-route-tab to="/" name="home" slot="title" icon="home"/>
          <q-route-tab to="/wallet" name="movies" slot="title" icon="attach_money"/>
          <q-route-tab to="/settings" name="settings" slot="title" icon="settings"/>
      </q-tabs>
  </div>
</template>

<script>
import { QTabs, QRouteTab, QOptionGroup, QLayout } from 'quasar'
export default {
  components: {
    QTabs,
    QRouteTab,
    QOptionGroup,
    QLayout
  }
}
</script>

<style lang='stylus' scoped>
@import '~variables';

.q-tabs {
  position: fixed
  bottom: 0;
  width: 100%;
  margin-top: 3vh
  z-index: 1000
}

.q-tab {
  height: 5vh
}
</style>
