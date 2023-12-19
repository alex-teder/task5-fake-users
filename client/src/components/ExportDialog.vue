<template>
  <p class="mb-2">Export:</p>
  <v-btn color="primary" block @click="isDialogOpen = true">Export CSV</v-btn>

  <v-dialog v-model="isDialogOpen" max-width="300px">
    <v-card title="Download .csv file">
      <v-form v-model="isFormValid" @submit.prevent="handleSubmit">
        <v-card-text class="px-6 pb-0">
          <p class="mb-2">Entries to generate:</p>
          <v-text-field
            v-model="qty"
            type="number"
            variant="outlined"
            density="compact"
            hint="Enter a number"
            :rules="[validateNumber, nonEmpty]"
            validate-on="input"
          />
        </v-card-text>

        <v-card-actions class="px-6 pb-2 d-flex justify-space-between">
          <v-btn @click="isDialogOpen = false">Cancel</v-btn>
          <v-btn type="submit" color="primary" append-icon="mdi-open-in-new">
            Download
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, computed, toRefs } from "vue";

const props = defineProps(["selectedRegion", "seed", "errorValue"]);
const { selectedRegion, seed, errorValue } = toRefs(props);

const qty = ref(0);
const isDialogOpen = ref(false);
const isFormValid = ref(false);

const url = computed(() => {
  const BASE_URL = "https://fake-users-server.onrender.com/download-csv/";
  const params = new URLSearchParams({
    location: selectedRegion.value,
    error: errorValue.value,
    seed: seed.value,
    qty: qty.value,
  });
  const result = new URL(BASE_URL);
  result.search = params.toString();
  return result;
});

const handleSubmit = async () => {
  if (!isFormValid.value) return;
  const link = document.createElement("a");
  link.href = url.value;
  link.target = "_blank";
  link.download = "users.csv";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const validateNumber = (v) =>
  (parseInt(v) !== 0 && v.length < 5) || "Min: 1, Max: 9999";
const nonEmpty = (v) => !!v || "Enter a number";
</script>
