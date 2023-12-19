<template>
  <div class="d-flex justify-center pa-4">
    <v-progress-circular
      v-intersect="handleIntersect"
      indeterminate
      :size="50"
    />
  </div>
</template>

<script setup>
const emit = defineEmits(["intersect"]);

function handleIntersect(e) {
  if (!e) return;
  emit("intersect");
}
</script>
