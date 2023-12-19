<template>
  <v-data-table-virtual
    :headers="headers"
    :items="users"
    hover
    no-filter
    no-data-text=""
    density="compact"
    item-height="100px"
    fixed-header
    style="font-size: 0.8rem"
  />
</template>

<script setup>
const { users } = defineProps(["users"]);

const headers = [
  {
    sortable: false,
    title: "no.",
    key: "idx",
  },
  {
    sortable: false,
    title: "Unique ID",
    key: "id",
    width: "10rem",
  },
  { sortable: false, title: "Name", key: "name" },
  {
    sortable: false,
    title: "Email",
    key: "email",
  },
  {
    sortable: false,
    title: "Phone",
    key: "phone",
  },
  {
    sortable: false,
    title: "Address",
    key: "address",
  },
];
</script>
