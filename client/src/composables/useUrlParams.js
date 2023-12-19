import { watch } from "vue";
import { useUrlSearchParams } from "@vueuse/core";

export function useUrlParams(seed, selectedRegion, errorValue) {
  const params = useUrlSearchParams("history");
  if (params.seed) seed.value = params.seed;
  if (params.location) selectedRegion.value = params.location;
  if (params.error) errorValue.value = params.error;
  watch([seed, selectedRegion, errorValue], () => {
    params.seed = seed.value;
    params.location = selectedRegion.value;
    params.error = errorValue.value;
  });
}
