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
                      { required: true, message: 'Please enter status name' },
                    ],
                  },
                ]"
                placeholder="Name"
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
    ...mapState("status", ["drawer", "selectedStatus"]),
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
    selectedStatus(val) {
      if (val.id) {
        this.$nextTick(() => {
          this.form.setFieldsValue(val);
        });
      }
    },
  },
  mounted() {},

  methods: {
    ...mapActions("status", ["fetchStatus"]),
    ...mapMutations("status", ["setDrawer", "setSelectedStatus"]),

    showDrawer() {
      this.setSelectedStatus({});

      this.visible = true;
    },
    onClose() {
      this.$nextTick(() => {
        this.form.setFieldsValue({
          name: null,
        });
      });
      this.visible = false;
    },
    postItem() {
      this.form.validateFields((err, values) => {
        if (!err) {
          const newItem = {
            name: values.name,
          };
          if (this.selectedStatus.id) {
            console.log("editing");
            newItem.id = this.selectedStatus.id;
            HTTP()
              .put(`/status`, newItem)
              .then(() => {
                this.fetchStatus();
                this.visible = false;
                this.$notification.success({
                  message: "Status created successfully",
                });
                this.setSelectedStatus({});
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
              .post("/status", newItem)
              .then(() => {
                this.visible = false;
                this.$notification.success({
                  message: "Status created successfully",
                });
                this.fetchStatus();
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