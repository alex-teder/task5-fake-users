<template>
  <p class="mb-2">Distortion:</p>
  <v-slider
    :model-value="modelValue"
    :step="0.25"
    :min="0"
    :max="40"
    thumb-label
    hide-details
    @end="emit('update:modelValue', $event)"
  />
</template>

<script setup>
const { modelValue } = defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue"]);
</script>
