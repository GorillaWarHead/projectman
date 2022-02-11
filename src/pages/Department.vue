<template>
  <a-table
    :columns="columns"
    :data-source="departments"
    rowKey="id"
    :scroll="{ x: 1300 }"
    bordered
    :pagination="false"
  >
    <template slot="title">
      <div :style="{ display: 'flex', justifyContent: 'space-between' }">
        <span> Department </span>
        <DepartmentDrawer />
      </div>
    </template>

    <template slot="action" slot-scope="record">
      <a @click="handleEdit(record)" :style="{ marginRight: '8px' }">Edit</a>
      <a-popconfirm
        title="Sure to delete?"
        @confirm="() => handleDelete(record.id)"
      >
        <a href="javascript:;">Delete</a>
      </a-popconfirm>
    </template>
    <template slot="footer">
      <a-pagination
        show-size-changer
        :pageSizeOptions="['10', '20', '50', '100']"
        :current="current"
        :total="meta.totalItems"
        :pageSize.sync="perPage"
        @change="onChange"
      />
    </template>
  </a-table>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";

import DepartmentDrawer from "../components/DepartmentDrawer";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },

  {
    title: "Action",
    key: "action",
    fixed: "right",
    width: 150,
    scopedSlots: { customRender: "action" },
  },
];
export default {
  components: {
    DepartmentDrawer,
  },
  data() {
    return {
      columns,
    };
  },
  computed: {
    ...mapState("department", ["departments", "meta"]),
    current: {
      get() {
        return this.meta.current;
      },
      set(val) {
        this.setCurrent(val);
      },
    },
    perPage: {
      get() {
        return this.meta.itemsPerPage;
      },
      set(val) {
        this.setItemsPerPage(val);
      },
    },
  },
  watch: {
    current() {
      this.fetchDepartments();
    },
    perPage() {
      this.current = 1;
      this.fetchDepartments();
    },
  },
  mounted() {
    this.fetchDepartments();
  },
  methods: {
    ...mapActions("department", ["fetchDepartments", "deleteDepartment"]),
    ...mapMutations("department", [
      "setSelectedDepartment",
      "setDrawer",
      "setCurrent",
      "setItemsPerPage",
    ]),

    onChange(current) {
      this.current = current;
    },
    handleEdit(record) {
      let item = {
        id: record.id,
        name: record.name,
      };
      this.setSelectedDepartment(item);
      this.setDrawer(true);
    },
    handleDelete(id) {
      this.deleteDepartment(id);
    },
  },
};
</script>

<style>
</style>