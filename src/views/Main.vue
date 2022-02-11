<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
      <div class="logo">
        <h1 v-if="collapsed" :style="{ color: 'white' }"><b>RM</b></h1>
        <h1 v-else :style="{ color: 'white' }"><b>ROAD</b>MAP</h1>
      </div>
      <a-menu
        theme="dark"
        mode="inline"
        :default-selected-keys="['/']"
        :selected-keys="[$route.path]"
      >
        <template v-for="(menu, idx) in menus">
          <a-menu-item :key="menu.path" v-if="!menu.children">
            <router-link :to="menu.path">
              <a-icon :type="menu.icon" />
              <span>{{ menu.title }}</span>
            </router-link>
          </a-menu-item>
          <a-sub-menu :key="idx" v-if="menu.children">
            <span slot="title"
              ><a-icon :type="menu.icon" /><span>{{ menu.title }}</span></span
            >
            <a-menu-item v-for="submenu in menu.children" :key="submenu.path">
              <router-link :to="submenu.path">
                <a-icon :type="submenu.icon" />
                <span>{{ submenu.title }}</span>
              </router-link>
            </a-menu-item>
          </a-sub-menu>
        </template>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <a-row justify="space-between" align="middle">
          <a-col :span="4">
            <a-icon
              class="trigger"
              :type="collapsed ? 'menu-unfold' : 'menu-fold'"
              @click="() => (collapsed = !collapsed)"
            />
          </a-col>
          <a-col :span="17"></a-col>
          <a-col :span="3">
            <a-dropdown :trigger="['click']">
              <a class="ant-dropdown-link" @click="(e) => e.preventDefault()">
                <a-avatar :style="{ marginRight: '8px' }">HB</a-avatar>
                <span>Hicham Bergueddi</span>
              </a>
              <a-menu slot="overlay">
                <a-menu-item key="0">
                  <a>Profile</a>
                </a-menu-item>

                <a-menu-divider />
                <a-menu-item @click="$router.push('/login')"
                  >LOGOUT
                </a-menu-item>
              </a-menu>
            </a-dropdown>
          </a-col>
        </a-row>
      </a-layout-header>
      <a-layout-content
        :style="{
          margin: '24px 16px',
          padding: '24px',
          background: '#fff',
          minHeight: '280px',
        }"
      >
        <router-view />
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
      menus: [
        {
          title: "Dashboard",
          icon: "appstore",
          path: "/",
        },
        {
          title: "Settings",
          icon: "setting",
          children: [
            {
              title: "Category",
              icon: "ordered-list",
              path: "/category",
            },
            {
              title: "Department",
              icon: "apartment",
              path: "/department",
            },
            {
              title: "Semester",
              icon: "hourglass",
              path: "/semester",
            },
            {
              title: "Site",
              icon: "bank",
              path: "/site",
            },
            {
              title: "Status",
              icon: "pushpin",
              path: "/status",
            },
          ],
        },
        {
          title: "Permissions",
          icon: "lock",
          children: [
            {
              title: "Users",
              icon: "user",
              path: "/user",
            },
            {
              title: "Roles",
              icon: "usergroup-add",
              path: "/role",
            },
            {
              title: "Groups",
              icon: "team",
              path: "/group",
            },
          ],
        },
        {
          title: "Planning",
          icon: "table",
          children: [
            {
              title: "Project/Semester",
              icon: "schedule",
              path: "/planning",
            },
            {
              title: "IT",
              icon: "schedule",
              path: "/itplanning",
            },
            {
              title: "Availablity",
              icon: "schedule",
              path: "/itvalidity",
            },
          ],
        },
        {
          title: "Projects",
          icon: "project",
          path: "/project",
        },
        {
          title: "Availability",
          icon: "coffee",
          path: "/validity",
        },
      ],
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
#components-layout-demo-custom-trigger {
  min-height: 100vh;
}
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  /* height: 32px; */
  /* background: rgba(255, 255, 255, 0.2); */
  margin: 16px;
  padding: "5px";
  text-align: center;
}
</style>
