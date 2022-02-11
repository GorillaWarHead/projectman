<template>
  <a-table
    :columns="columns"
    :data-source="itValidities"
    rowKey="id"
    :scroll="{ x: true }"
    :pagination="false"
    bordered
  >
    <template slot="groupUser" slot-scope="groupUser">
      <a-tag
        :style="{ marginBottom: '8px' }"
        v-if="groupUser"
        :color="groupUser.color"
      >
        {{ groupUser.name }}
      </a-tag>
    </template>
    <template
      v-for="semester in semesterList"
      :slot="semester.id + 'dispo'"
      slot-scope="record"
    >
      <!-- v-if="semester && semester.id === record.semester.id" -->
      <span
        :key="semester.id + 'dispo'"
        v-if="semester && semester.id === record.msemesterAvailability[1].id"
      >
        {{ record.msemesterAvailability[1].quantity }}
      </span>
    </template>
    <template
      v-for="semester in semesterList"
      :slot="semester.id + 'run'"
      slot-scope="record"
    >
      <span
        v-if="semester && semester.id === record.msemesterRun[1].id"
        :key="semester.id + 'run'"
      >
        {{ record.msemesterRun[1].quantity }}
      </span>
    </template>
    <template
      v-for="semester in semesterList"
      :slot="semester.id + 'need'"
      slot-scope="record"
    >
      <span
        v-if="semester && semester.id === record.msemesterIt[1].id"
        :key="semester.id + 'need'"
      >
        {{ record.msemesterIt[1].quantity }}
      </span>
    </template>
    <template
      v-for="semester in semesterList"
      :slot="semester.id + 'rest'"
      slot-scope="record"
    >
      <span
        v-if="semester && semester.id === record.msemesterRest[1].id"
        :key="semester.id + 'rest'"
      >
        {{ record.msemesterRest[1].quantity }}
      </span>
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
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState("itvalidity", ["itValidities", "meta"]),
    ...mapState("semester", ["semesterList"]),
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
    columns() {
      const items = [
        {
          title: "Ressource",
          dataIndex: "groupUser",
          key: "groupUser",
          scopedSlots: { customRender: "groupUser" },
        },
        {
          title: "Availability",
          key: "dispo",
          children: [],
        },
        {
          title: "RUN",
          key: "run",
          children: [],
        },
        {
          title: "Needs",
          key: "need",
          children: [],
        },
        {
          title: "Rest",
          key: "rest",
          children: [],
        },
      ];
      this.semesterList.forEach((item) => {
        items[1].children.push({
          title: item.name,
          key: item.id + "dispo",
          scopedSlots: { customRender: item.id + "dispo" },
        });
      });
      this.semesterList.forEach((item) => {
        items[2].children.push({
          title: item.name,
          key: item.id + "run",
          scopedSlots: { customRender: item.id + "run" },
        });
      });
      this.semesterList.forEach((item) => {
        items[3].children.push({
          title: item.name,
          key: item.id + "need",
          scopedSlots: { customRender: item.id + "need" },
        });
      });
      this.semesterList.forEach((item) => {
        items[4].children.push({
          title: item.name,
          key: item.id + "rest",
          scopedSlots: { customRender: item.id + "rest" },
        });
      });

      return items;
    },
  },
  watch: {
    current() {
      this.fetchItValidities();
    },
    perPage() {
      this.current = 1;
      this.fetchItValidities();
    },
  },
  mounted() {
    this.fetchItValidities();
    this.fetchSemesterList();
  },
  methods: {
    ...mapActions("itvalidity", ["fetchItValidities"]),
    ...mapActions("semester", ["fetchSemesterList"]),
    ...mapMutations("itvalidity", ["setCurrent", "setItemsPerPage"]),
    onChange(current) {
      this.current = current;
    },
  },
};
</script>

<style>
</style>