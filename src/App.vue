<template>
  <!-- Don't drop "q-app" class -->
  <div id="q-app"  v-touch-swipe.horizontal="userHasSwiped">
    <q-transition duration=1000 group :enter="enter" :leave="leave">
        <router-view :key="currRoute"/>
    </q-transition>

    <footerr> </footerr>
  </div>
</template>

<script>
import 'quasar-extras/animate/slideInLeft.css'
import 'quasar-extras/animate/slideInRight.css'
import 'quasar-extras/animate/slideOutLeft.css'
import 'quasar-extras/animate/slideOutRight.css'
import { TouchSwipe, Toast, QTransition } from 'quasar'
import footerr from './components/Footer'
/*
 * Root component
 */

export default {
  components: {
    footerr,
    Toast,
    QTransition
  },
  directives: {
    TouchSwipe
  },
  data() {
    return {
      routes: ['/', '/play', '/wallet', '/settings'],
      windowWidth: window.outerWidth,
      currRoute: 0,
      enter: 'slideInLeft',
      leave: 'slideOutRight'
    }
  },
  methods: {
    userHasSwiped(e) {
      if (e.direction === 'right' && e.distance.x >= this.windowWidth / 2) {
        this.enter = 'slideInLeft'
        this.leave = 'slideOutRight'
        if (this.$route.params[0]) {
          this.routes.forEach((val, index) => {
            if (val === this.$route.params[0]) {
              this.currRoute = index
            }
          })
          this.$router.push(this.routes[this.currRoute - 1])
        }
      }
      if (e.direction === 'left' && e.distance.x >= this.windowWidth / 2) {
        this.enter = 'slideInRight'
        this.leave = 'slideOutLeft'
        if (!this.$route.params[0]) {
          this.$router.push(this.routes[1])
          return
        }

        if (this.$route.params[0] !== this.routes[3]) {
          this.routes.forEach((val, index) => {
            if (val === this.$route.params[0]) {
              this.currRoute = index
            }
          })
          this.$router.push(this.routes[this.currRoute + 1])
        }
      }
    }
  }
}
</script>

<style lang='stylus'>
@import '~variables';

body {
  main-grad();
}
</style>
