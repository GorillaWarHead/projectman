<template>
  <a-modal v-model="visible" title="Project" on-ok="handleOk">
    <a-range-picker @change="onChange" />
  </a-modal>
</template>

<script>
export default {
  data() {
    return {
      visible: true,
    };
  },
  methods: {
    onChange(date, dateString) {
      console.log(date, dateString);
    },
  },
};
</script>

<style>
</style>