  <template>
  <div>
    <a-button type="primary" @click="showDrawer">
      <a-icon type="plus" /> New
    </a-button>
    <a-drawer
      :title="this.selectedProject.id ? 'Edit Project' : 'New Project'"
      :width="720"
      :visible="visible"
      :body-style="{ paddingBottom: '80px' }"
      @close="onClose"
    >
      <a-form :form="form" layout="vertical" hide-required-mark>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="ID">
              <a-input
                v-decorator="[
                  'id',
                  {
                    rules: [
                      { required: true, message: 'Please enter Project ID' },
                    ],
                  },
                ]"
                placeholder="Please enter Project ID"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="Label">
              <a-input
                v-decorator="[
                  'label',
                  {
                    rules: [
                      { required: true, message: 'Please enter Project Label' },
                    ],
                  },
                ]"
                placeholder="Please enter Project Label"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="Department">
              <a-select
                mode="multiple"
                v-decorator="[
                  'department',
                  {
                    rules: [
                      { required: true, message: 'Please select a Department' },
                    ],
                  },
                ]"
                placeholder="Please select a Department"
              >
                <a-select-option
                  v-for="{ id, name } in departmentList"
                  :key="id"
                  :value="id"
                >
                  {{ name }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="Site">
              <a-select
                mode="multiple"
                v-decorator="[
                  'site',
                  {
                    rules: [
                      { required: true, message: 'Please select a Site' },
                    ],
                  },
                ]"
                placeholder="Please select a Site"
              >
                <a-select-option
                  v-for="{ id, name } in siteList"
                  :key="id"
                  :value="id"
                >
                  {{ name }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="Manager">
              <a-select
                v-decorator="[
                  'manager',
                  {
                    rules: [
                      { required: true, message: 'Please select a Manager' },
                    ],
                  },
                ]"
                placeholder="Please select a Manager"
              >
                <a-select-option
                  v-for="{ id, firstname, lastname } in userList"
                  :key="id"
                  :value="id"
                >
                  {{ firstname + " " + lastname }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="Category">
              <a-select
                mode="multiple"
                v-decorator="[
                  'category',
                  {
                    rules: [
                      { required: true, message: 'Please select Categories' },
                    ],
                  },
                ]"
                placeholder="Please select Categories"
              >
                <a-select-option
                  v-for="{ id, name } in categoryList"
                  :key="id"
                  :value="id"
                >
                  {{ name }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="Status">
              <a-select
                v-decorator="[
                  'status',
                  {
                    rules: [
                      { required: true, message: 'Please select a status' },
                    ],
                  },
                ]"
                placeholder="Please select a status"
              >
                <a-select-option
                  v-for="{ id, name } in statusList"
                  :key="id"
                  :value="id"
                >
                  {{ name }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="24">
            <a-form-item label="Description">
              <a-textarea
                v-decorator="[
                  'description',
                  {
                    rules: [
                      {
                        required: true,
                        message: 'Please enter project description',
                      },
                    ],
                  },
                ]"
                :rows="4"
                placeholder="please enter project description"
              />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
      <div
        :style="{
          position: 'absolute',
          right: 0,
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e9e9e9',
          padding: '10px 16px',
          background: '#fff',
          textAlign: 'right',
          zIndex: 1,
        }"
      >
        <a-button :style="{ marginRight: '8px' }" @click="onClose()">
          Cancel
        </a-button>
        <a-button type="primary" @click="postItem()"> Submit </a-button>
      </div>
    </a-drawer>
  </div>
</template>
<script>
import { mapActions, mapMutations, mapState } from "vuex";
import HTTP from "../plugins/http";
export default {
  data() {
    return {
      form: this.$form.createForm(this),
      // visible: false,
    };
  },
  computed: {
    ...mapState("site", ["siteList"]),
    ...mapState("department", ["departmentList"]),
    ...mapState("category", ["categoryList"]),
    ...mapState("user", ["userList"]),
    ...mapState("status", ["statusList"]),
    ...mapState("project", ["drawer", "selectedProject"]),
    visible: {
      get() {
        return this.drawer;
      },
      set(value) {
        this.setDrawer(value);
      },
    },
  },
  watch: {
    selectedProject(val) {
      if (val.id) {
        this.$nextTick(() => {
          this.form.setFieldsValue(val);
        });
      }
    },
  },
  mounted() {
    this.fetchSiteList();
    this.fetchDepartmentList();
    this.fetchCategoryList();
    this.fetchUserList();
    this.fetchStatusList();
  },

  methods: {
    ...mapActions("site", ["fetchSiteList"]),
    ...mapActions("department", ["fetchDepartmentList"]),
    ...mapActions("category", ["fetchCategoryList"]),
    ...mapActions("user", ["fetchUserList"]),
    ...mapActions("status", ["fetchStatusList"]),
    ...mapActions("project", ["fetchProjects"]),
    ...mapMutations("project", ["setDrawer", "setSelectedProject"]),
    showDrawer() {
      this.setSelectedProject({});

      this.visible = true;
    },
    onClose() {
      this.visible = false;
    },
    postItem() {
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log(values);
          const newProject = {
            id: values.id,
            libelle: values.label,
            description: values.description,
            user: {
              id: values.manager,
            },
            category: [],
            department: [],
            site: [],
            status: {
              id: values.status,
            },
          };
          newProject.category = values.category.map((item) => {
            return {
              id: item,
            };
          });
          newProject.department = values.department.map((item) => {
            return {
              id: item,
            };
          });
          newProject.site = values.site.map((item) => {
            return {
              id: item,
            };
          });
          if (this.selectedProject.id) {
            HTTP()
              .put(`/projects`, newProject)
              .then(() => {
                this.fetchProjects();
                this.visible = false;
                this.$notification.success({
                  message: "Project created successfully",
                });
                this.setSelectedProject({});
              })
              .catch((err) => {
                this.$notification.error({
                  message: "something went wrong",
                });
                console.log(err);
              });
          } else {
            HTTP()
              .post("/projects", newProject)
              .then(() => {
                this.visible = false;
                this.$notification.success({
                  message: "Project created successfully",
                });
                this.fetchProjects();
              })
              .catch((err) => {
                this.$notification.error({
                  message: "something went wrong",
                });
                console.log(err);
              });
          }
        }
      });
    },
  },
};
</script>