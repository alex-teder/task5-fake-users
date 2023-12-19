<template>
  <p class="mb-2">Seed number:</p>
  <v-text-field
    :model-value="modelValue"
    type="number"
    density="compact"
    variant="outlined"
    class="hide-spinners"
    hide-details
    placeholder="Enter a seed"
    :rules="[notEmpty]"
    validate-on="lazy input"
    append-inner-icon="mdi-reload"
    @click:append-inner="handleGenerateSeed"
    @keydown.up.prevent
    @keydown.down.prevent
    @input="emit('update:modelValue', $event.target.value)"
  >
  </v-text-field>
</template>

<script setup>
import { getRandomSeed } from "/src/utils/getRandomSeed";

const { modelValue } = defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue"]);

const notEmpty = (input) => !!input;
const handleGenerateSeed = () => emit("update:modelValue", getRandomSeed());
</script>

<style scoped>
.hide-spinners ::-webkit-inner-spin-button,
.hide-spinners ::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.hide-spinners ::-moz-inner-spin-button,
.hide-spinners ::-moz-outer-spin-button {
  -moz-appearance: none;
  margin: 0;
}
</style>
