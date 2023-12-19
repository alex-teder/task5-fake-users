<template>
  <v-btn
    v-scroll="handleScroll"
    v-show="isVisible"
    class="scroll-to-top"
    icon="mdi-arrow-up"
    aria-label="scroll to top"
    theme="dark"
    @click="handleClick"
  />
</template>

<script setup>
import { ref } from "vue";

const isVisible = ref(false);

function handleScroll(e) {
  const top = window.pageYOffset || e.target.scrollTop || 0;
  isVisible.value = top > 20;
}

function handleClick() {
  window.scrollTo({ top: 0 });
}
</script>

<style scoped>
.scroll-to-top {
  position: fixed;
  right: 20px;
  bottom: 20px;
}
</style>
