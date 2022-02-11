<template>
  <a-table
    :columns="columns"
    :data-source="semesters"
    rowKey="id"
    :scroll="{ x: 1300 }"
    bordered
    :pagination="false"
  >
    <template slot="title">
      <div :style="{ display: 'flex', justifyContent: 'space-between' }">
        <span> Semester </span>
        <SemesterDrawer />
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

import SemesterDrawer from "../components/SemesterDrawer";
import momment from "moment";

const columns = [
  //   {
  //     title: "ID",
  //     dataIndex: "id",
  //     key: "id",
  //   },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Start Date",
    dataIndex: "startDate",
    key: "startDate",
  },
  {
    title: "End Date",
    dataIndex: "endDate",
    key: "endDate",
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
    SemesterDrawer,
  },
  data() {
    return {
      columns,
    };
  },
  computed: {
    ...mapState("semester", ["semesters", "meta"]),
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
      this.fetchSemesters();
    },
    perPage() {
      this.current = 1;
      this.fetchSemesters();
    },
  },
  mounted() {
    this.fetchSemesters();
    console.log(momment().format("YYYY-MM-DD"));
  },
  methods: {
    ...mapActions("semester", ["fetchSemesters", "deleteSemester"]),
    ...mapMutations("semester", [
      "setSelectedSemester",
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
        semester: [momment(record.startDate), momment(record.endDate)],
      };
      this.setSelectedSemester(item);
      this.setDrawer(true);
    },
    handleDelete(id) {
      this.deleteSemester(id);
    },
  },
};
</script>

<style>
</style>