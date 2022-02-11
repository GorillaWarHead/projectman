<template>
  <a-table
    :columns="columns"
    :data-source="sites"
    rowKey="id"
    :scroll="{ x: 1300 }"
    bordered
    :pagination="false"
  >
    <template slot="title">
      <div :style="{ display: 'flex', justifyContent: 'space-between' }">
        <span> Site </span>
        <SiteDrawer />
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

import SiteDrawer from "../components/SiteDrawer";

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
    SiteDrawer,
  },
  data() {
    return {
      columns,
    };
  },
  computed: {
    ...mapState("site", ["sites", "meta"]),
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
      this.fetchSites();
    },
    perPage() {
      this.current = 1;
      this.fetchSites();
    },
  },
  mounted() {
    this.fetchSites();
  },
  methods: {
    ...mapActions("site", ["fetchSites", "deleteSite"]),
    ...mapMutations("site", [
      "setSelectedSite",
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
      this.setSelectedSite(item);
      this.setDrawer(true);
    },
    handleDelete(id) {
      this.deleteSite(id);
    },
  },
};
</script>

<style>
</style>