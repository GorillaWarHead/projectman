<template>
  <a-row type="flex" justify="center" align="middle">
    <a-col :span="24">
      <a-table
        rowKey="id"
        :columns="columns"
        :data-source="tasks"
        :scroll="{ x: 1500 }"
        bordered
      >
        <template v-for="(w, index) in weeks" :slot="w.id" slot-scope="record">
          <a-popover
            v-model="visible[`${record.id}-${w.week}-${w.year}`]"
            title="Title"
            trigger="click"
            :key="index"
            placement="bottom"
          >
            <template
              slot="content"
              @click="visible[`${record.id}-${w.week}-${w.year}`] = false"
            >
              <a-row
                type="flex"
                justify="center"
                align="middle"
                :gutter="[16, 16]"
                style="width: 500px"
              >
                <a-col
                  v-for="(p, idx) in currentPlan(
                    `${record.id}-${w.week}-${w.year}`
                  )"
                  :key="idx"
                >
                  <a-tag
                    :color="p.color"
                    closable
                    @close.prevent="
                      showConfirm({
                        p,
                        idCss: `${record.id}-${w.week}-${w.year}`,
                      })
                    "
                    @click="
                      handleClick({
                        p,
                        idCss: `${record.id}-${w.week}-${w.year}`,
                      })
                    "
                  >
                    {{ p.pcharge }}
                  </a-tag>
                </a-col>
              </a-row>
              <a-row
                type="flex"
                justify="center"
                align="middle"
                :gutter="[16, 16]"
              >
                <a-col :span="24">
                  <a-select
                    v-model="planif.personnel"
                    show-search
                    placeholder="Select a person"
                    style="width: 100%"
                  >
                    <a-select-option
                      v-for="p in personnel"
                      :value="p.id"
                      :key="p.id"
                      >{{ p.nom }} {{ p.prenom }}</a-select-option
                    >
                  </a-select>
                </a-col>
                <a-col :span="24">
                  <a-input-number
                    v-model="planif.charge"
                    :min="0"
                    :max="10"
                    :step="0.1"
                    style="width: 100%"
                    placeholder="charge"
                  />
                </a-col>
                <a-col :span="12">
                  <a-button type="secondary" block @click="handleCancel">
                    Annuler
                  </a-button>
                </a-col>
                <a-col :span="12">
                  <a-button
                    v-if="editing"
                    type="primary"
                    block
                    @click="update({ record, w })"
                  >
                    Modifier
                  </a-button>
                  <a-button
                    v-else
                    type="primary"
                    block
                    @click="post({ record, w })"
                  >
                    Enregister
                  </a-button>
                </a-col>
              </a-row>
            </template>
            <!-- <h1>ADD PLANIFICATION</h1> -->
            <a-row
              type="flex"
              justify="center"
              align="middle"
              :gutter="[0, 16]"
            >
              <a-col
                :span="24"
                style="height: 50px"
                v-if="
                  currentPlan(`${record.id}-${w.week}-${w.year}`).length === 0
                "
              >
              </a-col>
              <a-col
                v-for="(p, idx) in currentPlan(
                  `${record.id}-${w.week}-${w.year}`
                )"
                :key="idx"
              >
                <a-avatar
                  :style="`backgroundColor:${p.color}; margin-left: -10px;font-weight: bold;`"
                >
                  {{ p.pcharge }}
                </a-avatar>
              </a-col>
            </a-row>
          </a-popover>
        </template>
      </a-table>
    </a-col>
  </a-row>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
// @ is an alias to /src

export default {
  name: "Home",
  data: () => ({
    editing: false,
    visible: {},
    items: [
      {
        id: 1,
        project: `gestion firm`,
        subproject: `gestion de l'assolement`,
        task: `analyse`,
      },
    ],
  }),
  computed: {
    ...mapState([
      "weeks",
      "tasks",
      "planifications",
      "personnel",
      "planification",
    ]),
    planif: {
      set(v) {
        this.setPlanification(v);
      },
      get() {
        return this.planification;
      },
    },
    columns() {
      const items = [
        {
          title: "Projet",
          width: 200,
          dataIndex: "projet",

          fixed: "left",
        },
        {
          title: "Sous-Projet",
          width: 200,
          dataIndex: "sousprojet",

          fixed: "left",
        },
        {
          title: "Tache",
          width: 200,
          dataIndex: "tache",

          fixed: "left",
        },
      ];
      this.weeks.forEach((w) => {
        items.push({
          title: `${w.week}/${w.year}`,
          key: w.id,
          width: 250,
          scopedSlots: { customRender: w.id },
        });
      });

      return items;
    },
  },
  mounted() {
    this.fetchWeeks();
    this.fetchTasks();
    this.fetchPlanifications();
    this.fetchPersonnel();
  },
  methods: {
    ...mapMutations(["setPlanification"]),
    ...mapActions([
      "fetchWeeks",
      "fetchTasks",
      "fetchPlanifications",
      "fetchPersonnel",
      "postPlanification",
      "fetchPlanification",
      "updatePlanification",
      "deletePlanification",
    ]),
    currentPlan(css) {
      return this.planifications.filter((p) => p.css === css);
    },
    post(data) {
      this.planif.tache = data.record.id;
      this.planif.week = data.w.week;
      this.planif.year = data.w.year;
      this.planif.idCss = `${data.w.week}-${data.w.year}`;
      this.postPlanification().then(() => {
        this.visible[`${data.record.id}-${data.w.week}-${data.w.year}`] = false;
      });
    },
    update(data) {
      this.planif.tache = data.record.id;
      this.planif.week = data.w.week;
      this.planif.year = data.w.year;
      this.planif.idCss = `${data.w.week}-${data.w.year}`;
      this.updatePlanification().then(() => {
        this.visible[`${data.record.id}-${data.w.week}-${data.w.year}`] = false;
        this.editing = false;
      });
    },
    handleDelete(data) {
      this.planif.tache = data.p.idtache;
      this.planif.personnel = data.p.personnel;
      this.deletePlanification().then(() => {
        this.visible[data.idCss] = false;
      });
    },
    showConfirm(deleteargs) {
      let v = this;
      this.$confirm({
        title: "Are you sure delete this person?",
        okText: "Yes",
        okType: "danger",
        zIndex: 100000,
        cancelText: "No",
        onOk() {
          v.handleDelete(deleteargs);

          console.log("OK");
        },
        onCancel() {
          console.log("Cancel");
        },
      });
    },
    handleCancel() {
      this.planif = {};
    },
    handleClick(data) {
      this.editing = true;
      this.planif = {
        tache: null,
        charge: null,
        personnel: null,
      };
      this.planif.tache = data.p.idtache;
      this.planif.personnel = data.p.personnel;
      this.fetchPlanification();
    },
  },
};
</script>
