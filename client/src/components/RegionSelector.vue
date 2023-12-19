<template>
  <p class="mb-2">Select a region:</p>
  <v-select
    :model-value="modelValue"
    :items="options"
    density="compact"
    variant="outlined"
    hide-details
    @update:model-value="emit('update:modelValue', $event)"
  />
</template>

<script setup>
const { modelValue } = defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue"]);

const options = [
  { title: "Germany 🇩🇪", value: "DE" },
  { title: "Italy 🇮🇹", value: "IT" },
  { title: "France 🇫🇷", value: "FR" },
  { title: "Georgia 🇬🇪", value: "GE" },
  { title: "Finland 🇫🇮", value: "FI" },
];
</script>
