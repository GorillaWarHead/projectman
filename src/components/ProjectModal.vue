<template>
  <a-modal v-model="visible" title="Project" on-ok="handleOk">
    <a-form :form="form" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
      <a-form-item label="ID">
        <a-input
          v-decorator="[
            `ID`,
            {
              rules: [
                {
                  required: true,
                  message: 'Project Id required',
                },
              ],
            },
          ]"
          placeholder="Project Id"
        />
      </a-form-item>
      <a-form-item label="Name">
        <a-input
          v-decorator="[
            `Name`,
            {
              rules: [
                {
                  required: true,
                  message: 'Project Name required',
                },
              ],
            },
          ]"
          placeholder="Project Name"
        />
      </a-form-item>
      <a-form-item label="Department">
        <a-select placeholder="Department">
          <a-select-option value="1"> Option 1 </a-select-option>
          <a-select-option value="2"> Option 2 </a-select-option>
          <a-select-option value="3"> Option 3 </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="Site">
        <a-select placeholder="Site">
          <a-select-option value="1"> Option 1 </a-select-option>
          <a-select-option value="2"> Option 2 </a-select-option>
          <a-select-option value="3"> Option 3 </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="Project Manager">
        <a-select placeholder="Project Manager">
          <a-select-option value="1"> Option 1 </a-select-option>
          <a-select-option value="2"> Option 2 </a-select-option>
          <a-select-option value="3"> Option 3 </a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item label="Category 1">
        <a-select placeholder="1st Category">
          <a-select-option value="1"> Option 1 </a-select-option>
          <a-select-option value="2"> Option 2 </a-select-option>
          <a-select-option value="3"> Option 3 </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="Category 2">
        <a-select placeholder="2nd Category">
          <a-select-option value="1"> Option 1 </a-select-option>
          <a-select-option value="2"> Option 2 </a-select-option>
          <a-select-option value="3"> Option 3 </a-select-option>
        </a-select>
      </a-form-item>
    </a-form>
    <template slot="footer">
      <a-button key="back" @click="handleCancel"> Return </a-button>
      <a-button key="submit" type="primary" :loading="loading">
        Submit
      </a-button>
    </template>
  </a-modal>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
    };
  },
};
</script>

<style>
</style>