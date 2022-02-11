<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <a-layout>
      <a-layout-content
        :style="{
          margin: '24px 16px',
          padding: '24px',
          background: '#fff',
          minHeight: '100vh',
        }"
      >
        <a-row
          type="flex"
          justify="center"
          align="middle"
          :style="{ padding: 'auto', minHeight: '100vh' }"
        >
          <a-col :xs="{ span: 24 }" :lg="{ span: 6 }">
            <a-form :form="form" class="ant-advanced-form">
              <a-form-item>
                <a-input
                  v-decorator="[
                    'userName',
                    {
                      rules: [
                        {
                          required: true,
                          message: 'Please input your username!',
                        },
                      ],
                    },
                  ]"
                  placeholder="Username"
                >
                  <a-icon
                    slot="prefix"
                    type="user"
                    style="color: rgba(0, 0, 0, 0.25)"
                  />
                </a-input>
              </a-form-item>
              <a-form-item>
                <a-input
                  v-decorator="[
                    'password',
                    {
                      rules: [
                        {
                          required: true,
                          message: 'Please input your Password!',
                        },
                      ],
                    },
                  ]"
                  type="password"
                  placeholder="Password"
                >
                  <a-icon
                    slot="prefix"
                    type="lock"
                    style="color: rgba(0, 0, 0, 0.25)"
                  />
                </a-input>
              </a-form-item>
              <a-form-item>
                <!-- <a-checkbox
                  v-decorator="[
                    'remember',
                    {
                      valuePropName: 'checked',
                      initialValue: true,
                    },
                  ]"
                >
                  Remember me
                </a-checkbox> -->
                <a-button type="primary" @click="$router.push('/')" block>
                  Log in
                </a-button>
              </a-form-item>
            </a-form>
          </a-col>
        </a-row>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
export default {
  data() {
    return {
      screenWidth: window.innerWidth,
      isMobile: false,
      collapsed: false,
      form: this.$form.createForm(this),
    };
  },

  watch: {
    screenWidth(newWidth) {
      if (newWidth < 600) {
        this.$nextTick(() => {
          this.isMobile = true;
        });
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
    });
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },
  methods: {
    onResize() {
      this.screenWidth = window.innerWidth;
    },
  },
};
</script>

<style>
.ant-advanced-form {
  padding: 24px;
  background: #fbfbfb;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
}
</style>
