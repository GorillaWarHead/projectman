<template>
  <a-table
    :columns="columns"
    :data-source="validities"
    rowKey="id"
    :scroll="{ x: 1300 }"
    bordered
    :pagination="false"
  >
    <template slot="title">
      <div :style="{ display: 'flex', justifyContent: 'space-between' }">
        <span> Validity </span>
        <ValidityDrawer />
      </div>
    </template>
    <span slot="groupUser" slot-scope="groupUser">
      <a-tag
        :style="{ marginBottom: '8px' }"
        v-if="groupUser"
        :color="groupUser.color"
      >
        {{ groupUser.name }}
      </a-tag>
    </span>
    <span slot="semester" slot-scope="semester">
      <a-tag :style="{ marginBottom: '8px' }" v-if="semester">
        {{ semester.name }}
      </a-tag>
    </span>

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

import ValidityDrawer from "../components/ValidityDrawer";

const columns = [
  //   {
  //     title: "ID",
  //     dataIndex: "id",
  //     key: "id",
  //   },
  {
    title: "Ressource",
    dataIndex: "groupUser",
    key: "groupUser",
    scopedSlots: { customRender: "groupUser" },
  },
  {
    title: "Semester",
    dataIndex: "semester",
    key: "semester",
    scopedSlots: { customRender: "semester" },
  },
  {
    title: "Availibility",
    dataIndex: "availability",
    key: "availability",
  },
  {
    title: "Run",
    dataIndex: "run",
    key: "run",
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
    ValidityDrawer,
  },
  data() {
    return {
      columns,
    };
  },
  computed: {
    ...mapState("validity", ["validities", "meta"]),
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
      this.fetchValidities();
    },
    perPage() {
      this.current = 1;
      this.fetchValidities();
    },
  },
  mounted() {
    this.fetchValidities();
  },
  methods: {
    ...mapActions("validity", ["fetchValidities", "deleteValidity"]),
    ...mapMutations("validity", [
      "setSelectedValidity",
      "setDrawer",
      "setCurrent",
      "setItemsPerPage",
    ]),

    onChange(current) {
      this.current = current;
    },
    handleEdit(record) {
      let validity = {
        id: record.id,
        availability: record.availability,
        run: record.run,
        group: record?.groupUser?.id,
        semester: record?.semester?.id,
      };
      this.setSelectedValidity(validity);
      this.setDrawer(true);
    },
    handleDelete(id) {
      this.deleteValidity(id);
    },
  },
};
</script>

<style>
</style>