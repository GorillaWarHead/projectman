<template>
  <div>
    <a-table
      :columns="columns"
      :data-source="projects"
      rowKey="id"
      :scroll="{ x: 1300 }"
      bordered
      :pagination="false"
    >
      <template slot="title">
        <div :style="{ display: 'flex', justifyContent: 'space-between' }">
          <span> Projects </span>
          <ProjectDrawer />
        </div>
      </template>
      <span slot="category" slot-scope="category">
        <a-tag
          v-for="(item, idx) in category"
          :key="idx"
          :style="{ marginBottom: '8px' }"
        >
          {{ item.name }}
        </a-tag>
      </span>
      <span slot="department" slot-scope="department">
        <a-tag
          v-for="(item, idx) in department"
          :key="idx"
          :style="{ marginBottom: '8px' }"
        >
          {{ item.name }}
        </a-tag>
      </span>
      <span slot="site" slot-scope="site">
        <a-tag
          v-for="(item, idx) in site"
          :key="idx"
          :style="{ marginBottom: '8px' }"
        >
          {{ item.name }}
        </a-tag>
      </span>
      <span slot="status" slot-scope="status">
        <a-tag :style="{ marginBottom: '8px' }" v-if="status">
          {{ status.name }}
        </a-tag>
      </span>
      <span slot="user" slot-scope="user">
        <a-tag :style="{ marginBottom: '8px' }" v-if="user" :color="user.color">
          {{ user.firstname + " " + user.lastname }}
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
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import ProjectDrawer from "../components/ProjectDrawer";
const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Label",
    dataIndex: "libelle",
    key: "libelle",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Manager",
    dataIndex: "user",
    key: "user",
    scopedSlots: { customRender: "user" },
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
    scopedSlots: { customRender: "category" },
  },
  {
    title: "Department",
    dataIndex: "department",
    key: "department",
    scopedSlots: { customRender: "department" },
  },
  {
    title: "Site",
    dataIndex: "site",
    key: "site",
    scopedSlots: { customRender: "site" },
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    scopedSlots: { customRender: "status" },
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
  data() {
    return {
      columns,
    };
  },
  components: {
    ProjectDrawer,
  },
  computed: {
    ...mapState("project", ["projects", "meta"]),
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
      this.fetchProjects();
    },
    perPage() {
      this.current = 1;
      this.fetchProjects();
    },
  },
  mounted() {
    this.fetchProjects();
  },
  methods: {
    ...mapActions("project", ["fetchProjects", "deleteProject"]),
    ...mapMutations("project", [
      "setSelectedProject",
      "setDrawer",
      "setCurrent",
      "setItemsPerPage",
    ]),
    handleEdit(item) {
      let project = {
        id: item.id,
        label: item.libelle,
        department: [],
        site: [],
        manager: item.user.id,
        category: [],
        status: item.status?.id,
        description: item.description,
      };
      project.department = item.department.map((d) => d.id);
      project.site = item.site.map((s) => s.id);
      project.category = item.category.map((c) => c.id);
      this.setSelectedProject(project);
      this.setDrawer(true);
    },
    handleDelete(id) {
      this.deleteProject(id);
    },
    onChange(current) {
      this.current = current;
    },
  },
};
</script>

<style scoped>
.table-operations {
  margin-bottom: 16px;
}

.table-operations > button {
  margin-right: 8px;
}
</style>