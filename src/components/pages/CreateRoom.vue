<template>
  <div>
    <headerr title="Create a Room"> </headerr>
    <div id="create"></div>
  </div>
</template>

<script>
import headerr from './../Header'
export default {
  components: {
    headerr
  }
}
</script>

<style lang="stylus" scoped>
@import '~variables';

#create {
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
</style>