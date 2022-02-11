<template>
  <a-table
    :columns="columns"
    :data-source="plannings"
    rowKey="projectId"
    :scroll="{ x: 1300 }"
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
    <template
      v-for="(semester, idx) in semesterList"
      :slot="semester.id"
      slot-scope="record"
    >
      <span :key="semester.id">
        <a-popover
          v-model="visible[`${record.projectId}-${semester.id}`]"
          trigger="click"
          :key="idx"
          placement="bottom"
        >
          <template
            slot="content"
            @click="visible[`${record.projectId}-${semester.id}`] = false"
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
                      :max="1"
                      :step="0.1"
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
                  <a-button
                    type="primary"
                    block
                    @click="
                      handleSave({
                        project: record.projectId,
                        semester: semester.id,
                      })
                    "
                  >
                    Save
                  </a-button>
                </a-col>
                <a-col :span="12">
                  <a-button
                    type="secondary"
                    block
                    @click="
                      handleCancel(
                        visible[`${record.projectId}-${semester.id}`]
                      )
                    "
                  >
                    Cancel
                  </a-button>
                </a-col>
                <a-col :span="12">
                  <a-button
                    type="danger"
                    block
                    @click="
                      handleDelete({
                        project: record.projectId,
                        semester: semester.id,
                      })
                    "
                  >
                    Delete
                  </a-button>
                </a-col>
              </a-row>
            </a-form>
          </template>
          <span
            @click="editQuantity(record.msemesterDto[semester.id].quantity)"
          >
            {{ record.msemesterDto[semester.id].quantity }}
          </span>
        </a-popover>
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
    ...mapState("planning", ["plannings", "meta"]),
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
          title: "Department",
          dataIndex: "departmentes",
          key: "departmentes",
          scopedSlots: { customRender: "department" },
        },
        {
          title: "Category",
          dataIndex: "categories",
          key: "categories",
          scopedSlots: { customRender: "category" },
        },
        {
          title: "Site",
          dataIndex: "sites",
          key: "sites",
          scopedSlots: { customRender: "site" },
        },
        {
          title: "Status",
          dataIndex: "status",
          key: "status",
        },
      ];
      this.semesterList.forEach((item) => {
        items.push({
          title: item.name,
          key: item.id,
          scopedSlots: { customRender: item.id },
        });
      });
      return items;
    },
  },
  watch: {
    current() {
      this.fetchPLannings();
    },
    perPage() {
      this.current = 1;
      this.fetchPLannings();
    },
  },
  mounted() {
    this.fetchPLannings();
    this.fetchSemesterList();
  },
  methods: {
    ...mapActions("planning", [
      "fetchPLannings",
      "postQuantity",
      "deleteQuantity",
    ]),
    ...mapActions("semester", ["fetchSemesterList"]),
    ...mapMutations("planning", ["setCurrent", "setItemsPerPage"]),

    onChange(current) {
      this.current = current;
    },
    handleSave({ project, semester }) {
      this.form.validateFields((err, values) => {
        if (err) {
          return;
        }
        console.log({ project, semester, quality: values.quantity });
        const newQuantity = {
          project: {
            id: project,
          },
          semester: {
            id: semester,
          },
          quantity: values.quantity,
        };
        this.postQuantity(newQuantity).then(() => {
          this.form.setFieldsValue({
            quantity: null,
          });
          this.visible[`${project}-${semester}`] = false;
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
    handleDelete({ project, semester }) {
      const Quantity = { projectId: project, semesterId: semester };
      this.deleteQuantity(Quantity).then(() => {
        this.visible[`${project}-${semester}`] = false;
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