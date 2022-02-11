<template>
  <a-row type="flex" justify="center" align="middle">
    <a-col :span="24">
      <ProjectModal />
      <SemesterModal />
    </a-col>
  </a-row>
</template>

<script>
import ProjectModal from "../components/ProjectModal.vue";
import SemesterModal from "../components/SemesterModal.vue";
export default {
  components: {
    ProjectModal,
    SemesterModal,
  },
};
</script>

<style>
</style>
