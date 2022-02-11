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
            <a-form-item label="Name">
              <a-input
                v-decorator="[
                  'name',
                  {
                    rules: [
                      { required: true, message: 'Please enter semester name' },
                    ],
                  },
                ]"
                placeholder="Name"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="Semester">
              <a-range-picker
                v-decorator="[
                  'semester',
                  {
                    rules: [
                      {
                        required: true,
                        message: 'Please select semester range',
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
    ...mapState("semester", ["drawer", "selectedSemester"]),
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
    selectedSemester(val) {
      if (val.id) {
        this.$nextTick(() => {
          this.form.setFieldsValue(val);
        });
      }
    },
  },
  mounted() {},

  methods: {
    ...mapActions("semester", ["fetchSemesters"]),
    ...mapMutations("semester", ["setDrawer", "setSelectedSemester"]),

    showDrawer() {
      this.setSelectedSemester({});

      this.visible = true;
    },
    onClose() {
      this.$nextTick(() => {
        this.form.setFieldsValue({
          availability: null,
          name: null,
        });
      });
      this.visible = false;
    },
    postItem() {
      this.form.validateFields((err, values) => {
        console.log(values.semester);
        if (!err) {
          const newItem = {
            startDate: values.semester[0].format("YYYY-MM-DD"),
            endDate: values.semester[1].format("YYYY-MM-DD"),
            name: values.name,
          };
          if (this.selectedSemester.id) {
            console.log("editing");
            newItem.id = this.selectedSemester.id;
            HTTP()
              .put(`/semesters`, newItem)
              .then(() => {
                this.fetchSemesters();
                this.visible = false;
                this.$notification.success({
                  message: "Semester created successfully",
                });
                this.setSelectedSemester({});
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
              .post("/semesters", newItem)
              .then(() => {
                this.visible = false;
                this.$notification.success({
                  message: "Semester created successfully",
                });
                this.fetchSemesters();
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