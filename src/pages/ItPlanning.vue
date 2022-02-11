<template>
  <a-table
    :columns="columns"
    :data-source="itPlannings"
    rowKey="record"
    :scroll="{ x: true }"
    :pagination="false"
    bordered
  >
    <span slot="department" slot-scope="departmentes">
      <a-tag
        :style="{ marginBottom: '8px' }"
        v-for="(depart, idx) in departmentes"
        :key="idx"
      >
        {{ depart.name }}
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
    <span slot="category" slot-scope="categories">
      <a-tag
        v-for="(item, idx) in categories"
        :key="idx"
        :style="{ marginBottom: '8px' }"
      >
        {{ item.name }}
      </a-tag>
    </span>
    <span slot="user" slot-scope="user">
      <a-tag :style="{ marginBottom: '8px' }" v-if="user" :color="user.color">
        {{ user.firstname + " " + user.lastname }}
      </a-tag>
    </span>
    <span slot="ressource" slot-scope="groupUser">
      <a-tag
        :style="{ marginBottom: '8px' }"
        v-if="groupUser"
        :color="groupUser.color"
      >
        {{ groupUser.name }}
      </a-tag>
    </span>

    <template slot="overallLoad" slot-scope="record">
      <span>
        <a-popover
          v-model="
            visible[`${record.projectId}-${itPlannings.indexOf(record)}`]
          "
          trigger="click"
          placement="bottom"
        >
          <template
            slot="content"
            @click="
              visible[
                `${record.projectId}-${itPlannings.indexOf(record)}`
              ] = false
            "
          >
            <a-form :form="form" layout="vertical" hide-required-mark>
              <a-row
                type="flex"
                justify="center"
                align="middle"
                :gutter="[16, 0]"
              >
                <a-col :span="16">
                  <a-form-item label="Quantity">
                    <a-input-number
                      :min="0"
                      :step="1"
                      style="width: 100%"
                      placeholder="Quantity"
                      v-decorator="[
                        'quantity',
                        {
                          rules: [
                            {
                              required: true,
                              message: 'Please Enter Quantity',
                            },
                          ],
                        },
                      ]"
                    />
                  </a-form-item>
                </a-col>
                <a-col :span="8">
                  <a-button type="primary" block @click="handleSave(record)">
                    Save
                  </a-button>
                </a-col>
                <a-col :span="12">
                  <a-button
                    type="secondary"
                    block
                    @click="
                      handleCancel(
                        visible[
                          `${record.projectId}-${itPlannings.indexOf(record)}`
                        ]
                      )
                    "
                  >
                    Cancel
                  </a-button>
                </a-col>
                <a-col :span="12">
                  <a-button type="danger" block @click="handleDelete(record)">
                    Delete
                  </a-button>
                </a-col>
              </a-row>
            </a-form>
          </template>
          <span @click="editQuantity(record.quantityGp)">
            {{ record.quantityGp }}
          </span>
        </a-popover>
      </span>
    </template>
    <template
      v-for="semester in semesterList"
      :slot="semester.id"
      slot-scope="record"
    >
      <span :key="semester.id">
        {{ record.msemesterProject[semester.id].quantity }}
      </span>
    </template>
    <template
      v-for="semester in semesterList"
      :slot="semester.id + semester.name"
      slot-scope="record"
    >
      <span :key="semester.id">
        {{ record.msemesterGroupUser[semester.id].quantity }}
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
import { mapActions, mapMutations, mapState } from "vuex";

export default {
  data() {
    return {
      visible: {},
      form: this.$form.createForm(this),
    };
  },
  computed: {
    ...mapState("itplanning", ["itPlannings", "meta"]),
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
          title: "ID",
          dataIndex: "projectId",
          key: "projectId",
        },
        {
          title: "Project Name",
          dataIndex: "projectName",
          key: "projectName",
          // render(record) {
          //   return {
          //     props: {
          //       style: {
          //         background:
          //           this.handleQuantity(record) === 1 ? "red" : "green",
          //       },
          //     },
          //   };
          // },
        },
        {
          title: "Manager",
          dataIndex: "user",
          key: "user",
          scopedSlots: { customRender: "user" },
        },
        // {
        //   title: "Department",
        //   dataIndex: "departmentes",
        //   key: "departmentes",
        //   scopedSlots: { customRender: "department" },
        // },
        {
          title: "Category",
          dataIndex: "categories",
          key: "categories",
          scopedSlots: { customRender: "category" },
        },
        {
          title: "Status",
          dataIndex: "status",
          key: "status",
        },
        {
          title: "Site",
          dataIndex: "sites",
          key: "sites",
          scopedSlots: { customRender: "site" },
        },
        {
          title: "Ressource",
          dataIndex: "groupUser",
          key: "groupUser",
          scopedSlots: { customRender: "ressource" },
        },
        {
          title: "Overall Load",
          key: "overallLoad",
          scopedSlots: { customRender: "overallLoad" },
        },
      ];
      this.semesterList.forEach((item) => {
        items.push({
          title: item.name,
          key: item.id,
          scopedSlots: { customRender: item.id },
        });
      });
      this.semesterList.forEach((item) => {
        items.push({
          title: item.name,
          key: item.id + item.name,
          scopedSlots: { customRender: item.id + item.name },
        });
      });
      return items;
    },
  },
  watch: {
    current() {
      this.fetchItPlannings();
    },
    perPage() {
      this.current = 1;
      this.fetchItPlannings();
    },
  },
  mounted() {
    this.fetchItPlannings();
    this.fetchSemesterList();
  },
  methods: {
    ...mapActions("itplanning", [
      "fetchItPlannings",
      "postQuantity",
      "deleteQuantity",
    ]),
    ...mapActions("semester", ["fetchSemesterList"]),
    ...mapMutations("itplanning", ["setCurrent", "setItemsPerPage"]),

    onChange(current) {
      this.current = current;
    },
    handleSave(record) {
      this.form.validateFields((err, values) => {
        if (err) {
          return;
        }
        const newQuantity = {
          project: {
            id: record.projectId,
          },
          groupUser: {
            id: record.groupUser.id,
          },
          quantity: values.quantity,
        };
        this.postQuantity(newQuantity).then(() => {
          this.form.setFieldsValue({
            quantity: null,
          });
          this.visible[
            `${record.projectId}-${this.itPlannings.indexOf(record)}`
          ] = false;
        });
      });
    },
    handleCancel() {
      this.$nextTick(() => {
        this.form.setFieldsValue({
          quantity: null,
        });
      });
    },
    handleDelete(record) {
      const Quantity = {
        projectId: record.projectId,

        groupUserId: record.groupUser.id,
      };
      this.deleteQuantity(Quantity).then(() => {
        this.visible[
          `${record.projectId}-${this.itPlannings.indexOf(record)}`
        ] = false;
      });
    },
    editQuantity(quantity) {
      this.form.setFieldsValue({
        quantity,
      });
    },
    handleQuantity(record) {
      const projectQuantity = Object.values(record.msemesterDto);
      const total = projectQuantity.reduce((acc, cur) => {
        return acc + cur.quantity;
      }, 0);
      return total;
    },
  },
};
</script>