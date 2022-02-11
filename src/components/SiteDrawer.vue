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
                      { required: true, message: 'Please enter site name' },
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
    ...mapState("site", ["drawer", "selectedSite"]),
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
    selectedSite(val) {
      if (val.id) {
        this.$nextTick(() => {
          this.form.setFieldsValue(val);
        });
      }
    },
  },
  mounted() {},

  methods: {
    ...mapActions("site", ["fetchSites"]),
    ...mapMutations("site", ["setDrawer", "setSelectedSite"]),

    showDrawer() {
      this.setSelectedSite({});

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
          if (this.selectedSite.id) {
            console.log("editing");
            newItem.id = this.selectedSite.id;
            HTTP()
              .put(`/sites`, newItem)
              .then(() => {
                this.fetchSites();
                this.visible = false;
                this.$notification.success({
                  message: "Site created successfully",
                });
                this.setSelectedSite({});
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
              .post("/sites", newItem)
              .then(() => {
                this.visible = false;
                this.$notification.success({
                  message: "Site created successfully",
                });
                this.fetchSites();
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