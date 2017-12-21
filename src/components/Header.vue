<template>
<div>
    <q-toolbar id="header" class="shadow-6">
        <q-btn flat>
          <q-icon v-if="canGoBack" name="keyboard_arrow_left" @click="goBack"/>
        </q-btn>
        <q-toolbar-title class="headerTitle">
          {{title}}
        </q-toolbar-title>
    </q-toolbar>
</div>
</template>

<script>
import { QToolbar, QToolbarTitle, QBtn, QIcon } from 'quasar'
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
    QIcon
  },
  data() {
    return {
      canGoBack: window.history.length > 1
    }
  },
  methods: {
    goBack() {
      window.history.go(-1)
    }
  }
}
</script>

<style lang='stylus' scoped>
@import '~variables';

#header {
  background-color: $primary;
  position: fixed;
  top 0;
  display flex;
}

.headerTitle {
  text-align: center
  margin-right: 10vw
}
</style>
