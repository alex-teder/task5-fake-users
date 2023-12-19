import { computed } from "vue";
import { useFetch } from "@vueuse/core";

const BASE_URL = "https://inquisitive-swan-97dcdd.netlify.app/api/";

export function useFetchUsers(debouncedSeed, selectedRegion, errorValue, page) {
  const url = computed(() => {
    const query = new URLSearchParams({
      seed: debouncedSeed.value,
      error: errorValue.value,
      page: page.value,
    });
    const result = new URL(`${BASE_URL}${selectedRegion.value}`);
    result.search = query.toString();
    return result;
  });

  const { data, isFetching } = useFetch(url, { refetch: true }).json();
  return { data, isFetching };
}
