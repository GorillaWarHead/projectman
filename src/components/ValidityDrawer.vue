  <template>
  <div>
    <a-button type="primary" @click="showDrawer">
      <a-icon type="plus" /> New
    </a-button>
    <!-- :title="this.selectedValidity.id ? 'Edit Project' : 'New Project'" -->
    <a-drawer
      :width="720"
      :visible="visible"
      :body-style="{ paddingBottom: '80px' }"
      @close="onClose"
    >
      <a-form :form="form" layout="vertical" hide-required-mark>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="Group">
              <a-select
                v-decorator="[
                  'group',
                  {
                    rules: [
                      { required: true, message: 'Please select a Group' },
                    ],
                  },
                ]"
                placeholder="Please select a Group"
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
            <a-form-item label="Semester">
              <a-select
                v-decorator="[
                  'semester',
                  {
                    rules: [
                      { required: true, message: 'Please select a Semester' },
                    ],
                  },
                ]"
                placeholder="Please select a Semester"
              >
                <a-select-option
                  v-for="{ id, name } in semesterList"
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
            <a-form-item label="Availibility">
              <a-input-number
                :min="0"
                :step="1"
                style="width: 100%"
                placeholder="Availibility"
                v-decorator="[
                  'availability',
                  {
                    rules: [
                      {
                        required: true,
                        message: 'Please enter availability',
                      },
                    ],
                  },
                ]"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="Run">
              <a-input-number
                :min="0"
                :step="1"
                style="width: 100%"
                placeholder="Run"
                v-decorator="[
                  'run',
                  {
                    rules: [
                      {
                        required: true,
                        message: 'Please enter run',
                      },
                    ],
                  },
                ]"
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
    ...mapState("user", ["userList"]),
    ...mapState("semester", ["semesterList"]),
    ...mapState("validity", ["drawer", "selectedValidity"]),
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
    selectedValidity(val) {
      if (val.id) {
        this.$nextTick(() => {
          this.form.setFieldsValue(val);
        });
      }
    },
  },
  mounted() {
    this.fetchSemesterList();
    this.fetchUserList();
  },

  methods: {
    ...mapActions("user", ["fetchUserList"]),
    ...mapActions("semester", ["fetchSemesterList"]),
    ...mapActions("validity", ["fetchValidities"]),

    ...mapMutations("validity", ["setDrawer", "setSelectedValidity"]),

    showDrawer() {
      this.setSelectedValidity({});

      this.visible = true;
    },
    onClose() {
      this.$nextTick(() => {
        this.form.setFieldsValue({
          availability: null,
          run: null,
          group: null,
          semester: null,
        });
      });
      this.visible = false;
    },
    postItem() {
      this.form.validateFields((err, values) => {
        console.log(values);
        if (!err) {
          console.log(values);
          const newValidity = {
            availability: values.availability,
            run: values.run,
            semester: {
              id: values.semester,
            },
            groupUser: {
              id: values.group,
            },
          };

          if (this.selectedValidity.id) {
            console.log("editing");
            newValidity.id = this.selectedValidity.id;
            HTTP()
              .put(`/validities`, newValidity)
              .then(() => {
                this.fetchValidities();
                this.visible = false;
                this.$notification.success({
                  message: "Validity created successfully",
                });
                this.setSelectedValidity({});
              })
              .catch((err) => {
                this.$notification.error({
                  message: "something went wrong",
                });
                console.log(err);
              });
          } else {
            console.log("creating");
            HTTP()
              .post("/validities", newValidity)
              .then(() => {
                this.visible = false;
                this.$notification.success({
                  message: "Validity created successfully",
                });
                this.fetchValidities();
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