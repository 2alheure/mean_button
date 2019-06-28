<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    
    Tu as cliqué {{nbClicks}} fois.
    <button id="clique" @click="handleClick">CLIQUE</button>

  </div>
</template>

<script>
export default {
  name: 'home',
  data: function () {
    return {
      isPlaying: false,
      nbClicks: 0,
      stop: false
    }
  },
  methods: {
    handleClick() {
      if (!this.isPlaying) {
        this.isPlaying = true;

        setTimeout(() => {
          this.stop = true;
        }, 10000);
      }

      if (!this.stop) this.nbClicks++;

    }
  }
}
</script>
