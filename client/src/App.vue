<template>
  <v-app>
    <v-card width="100%" max-width="1200px" class="ma-4 mx-auto pa-2">
      <div class="pa-2 pt-8">
        <v-row>
          <v-col cols="12" sm="6" md="3">
            <RegionSelector v-model="selectedRegion" />
          </v-col>

          <v-col cols="12" sm="6" md="3">
            <ErrorSlider v-model="errorValue" />
          </v-col>

          <v-col cols="12" sm="6" md="3">
            <SeedField v-model="seed" />
          </v-col>

          <v-col cols="12" sm="6" md="3">
            <ExportDialog
              :selectedRegion="selectedRegion"
              :seed="seed"
              :errorValue="errorValue"
            />
          </v-col>
        </v-row>
      </div>

      <UsersTable :users="users" class="mt-4" />

      <template v-if="!!seed">
        <LoadingSpinner @intersect="handleIntersect($event)" />
      </template>
    </v-card>
    <ScrollToTopButton />
  </v-app>
</template>

<script setup>
import { ref, watch } from "vue";
import { debouncedRef } from "@vueuse/core";
import ErrorSlider from "./components/ErrorSlider.vue";
import RegionSelector from "./components/RegionSelector.vue";
import SeedField from "./components/SeedField.vue";
import ExportDialog from "./components/ExportDialog.vue";
import UsersTable from "./components/UsersTable.vue";
import ScrollToTopButton from "./components/ScrollToTopButton.vue";
import { useFetchUsers } from "/src/composables/useFetchUsers";
import { useUrlParams } from "/src/composables/useUrlParams";
import { getRandomSeed } from "/src/utils/getRandomSeed";
import LoadingSpinner from "./components/LoadingSpinner.vue";

const DEFAULT_REGION = "DE";
const DEBOUNCE_TIMER = 400;

const seed = ref(getRandomSeed());
const selectedRegion = ref(DEFAULT_REGION);
const errorValue = ref(0);
useUrlParams(seed, selectedRegion, errorValue);
const debouncedSeed = debouncedRef(seed, DEBOUNCE_TIMER);
const page = ref(0);
const users = ref([]);

watch([debouncedSeed, selectedRegion, errorValue], () => {
  page.value = 0;
  users.value = [];
});

const { data } = useFetchUsers(debouncedSeed, selectedRegion, errorValue, page);
watch(data, () => {
  if (data.value) {
    users.value.push(...data.value);
  }
});

function handleIntersect() {
  if (!users.value.length) return;
  page.value++;
}
</script>
