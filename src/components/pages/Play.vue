<template>
<div>
  <headerr title="Find Match"> </headerr>
  <div id="play">
    <h6 style="margin-bottom: 15vh">{{rooms.toLocaleString()}} Matches in Progress</h6>
    <q-btn class="button" color="red-10" @click="createRoom">Create Room</q-btn>
    <q-btn class="button" color="blue-5" @click="joinRoom">Join Room</q-btn>
  </div>
</div>
</template>

<script>
import headerr from './../Header'
import { QBtn } from 'quasar'

export default {
  components: {
    headerr,
    QBtn
  },
  data() {
    return {
      rooms: 0
    }
  },
  methods: {
    createRoom() {
      this.$router.push('/play/create')
    },
    joinRoom() {
      this.$router.push('/play/join')
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~variables';

#play {
  height: 100vh;
  width: 100vw;
  max-width: 100vw;
  max-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 10vh;
  color: white;
}

.button {
  width: 80vw;
  border-radius: 5px;
  margin-top: 5vh;
  height: 7vh;
}
</style>

