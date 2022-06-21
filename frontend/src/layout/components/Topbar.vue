<template>
  <div class="top-nav">
    <!-- <div v-loading="!axiosFinished" class="log">
      <svg-icon
        v-if="!logoUrl && axiosFinished"
        icon-class="DataEase"
        custom-class="top-nav-logo-icon"
      />
      <img
        v-if="logoUrl && axiosFinished"
        :src="logoUrl"
        width="140"
        alt=""
        style="padding-top: 10px"
      />
    </div> -->
    <el-menu
      class="de-top-menu"
      mode="horizontal"
      active-text-color="#FFFFFF"
      :default-active="activeMenu"
      @select="handleSelect"
    >
      <div v-for="item in permission_routes" :key="item.path" class="nav-item">
        <app-link :to="resolvePath(item)">
          <el-menu-item v-if="!item.hidden" :index="item.path">
            {{ item.meta ? item.meta.title : item.children[0].meta.title }}
          </el-menu-item>
        </app-link>
      </div>
    </el-menu>

    <div class="right-menu" style="color: var(--TopTextColor)">
      <template>
        <notification class="right-menu-item hover-effect" />
        <lang-select class="right-menu-item hover-effect" />
        <!-- <div style="height: 100%;padding: 0 8px;" class="right-menu-item hover-effect">
          <a
            :href="helpLink"
            target="_blank"
            style="display: flex;height: 100%;width: 100%;justify-content: center;align-items: center;"
          >
            <svg-icon icon-class="docs" />
          </a>
        </div> -->
      </template>

      <el-popover
        ref="my-drop"
        class="top-dropdown"
        style="display: flex; align-items: center"
        :visible-arrow="false"
        :offset="20"
        trigger="hover"
        placement="bottom-end"
        width="300"
      >
        <div
          slot="reference"
          class="el-dropdown-link"
          style="
            display: flex;
            color: var(--TopTextColor);
            font-size: 14px;
            width: 100%;
            align-items: center;
          "
        >
          <img
            src="data:image/png;base64,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"
            alt=""
            width="40"
            style="border-radius: 50%; margin-right: 5px"
          />
          <span
            style="max-width: 80px; white-space: nowrap; text-overflow: ellipsis; overflow: hidden"
          >
            {{ userInfo.name || '未命名' }}
          </span>
          <span><i class="el-icon-arrow-down el-icon--right" /></span>
        </div>
        <div class="header-user">
          <h5 class="inline">
            <a class="text-info">{{ userInfo.name || '未命名' }}</a>
          </h5>
          <p class="text-muted role">角色：{{ userInfo.isAdmin && '管理员' }}</p>
          <p class="text-muted pre-login">上次登录：{{ userInfo.preLogin || '' }}</p>
          <p class="go-out" @click="openGoOut">退出</p>
        </div>
        <!-- <el-dropdown-menu slot="dropdown">
          <router-link to="/person-info/index">
            <el-dropdown-item>{{ $t('commons.personal_info') }}</el-dropdown-item>
          </router-link>

          <router-link v-if="$store.getters.validate" to="/ukey/index">
            <el-dropdown-item>{{ $t('commons.ukey_title') }}</el-dropdown-item>
          </router-link>

          <router-link to="/person-pwd/index">
            <el-dropdown-item>{{ $t('user.change_password') }}</el-dropdown-item>
          </router-link>

          <router-link to="/about/index">
            <el-dropdown-item>{{ $t('commons.about_us') }}</el-dropdown-item>
          </router-link>
          <el-dropdown-item divided @click.native="logout">
            <span style="display: block">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu> -->
      </el-popover>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import AppLink from './Sidebar/Link';
import variables from '@/styles/variables.scss';
import { isExternal } from '@/utils/validate';
import Notification from '@/components/Notification';
import bus from '@/utils/bus';
import LangSelect from '@/components/LangSelect';
import { getSysUI } from '@/utils/auth';
import { pluginLoaded } from '@/api/user';
import { logout, getSystemUserData, getLoginLog } from '@/api/system/user.js';
import { initTheme } from '@/utils/ThemeUtil';
// import Keycloak from 'keycloak-js';

export default {
  name: 'Topbar',
  components: {
    AppLink,
    Notification,
    LangSelect,
  },
  props: {
    showTips: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      uiInfo: null,
      logoUrl: null,
      axiosFinished: false,
      isPluginLoaded: false,
      userInfo: {},
    };
  },

  computed: {
    theme() {
      return this.$store.state.settings.theme;
    },

    topMenuColor() {
      if (
        this.$store.getters.uiInfo &&
        this.$store.getters.uiInfo['ui.topMenuColor'] &&
        this.$store.getters.uiInfo['ui.topMenuColor'].paramValue
      ) {
        return this.$store.getters.uiInfo['ui.topMenuColor'].paramValue;
      }
      return this.variables.topBarBg;
    },
    topMenuActiveColor() {
      if (
        this.$store.getters.uiInfo &&
        this.$store.getters.uiInfo['ui.topMenuActiveColor'] &&
        this.$store.getters.uiInfo['ui.topMenuActiveColor'].paramValue
      ) {
        return this.$store.getters.uiInfo['ui.topMenuActiveColor'].paramValue;
      }
      return this.variables.topBarMenuActive;
    },
    topMenuTextColor() {
      if (
        this.$store.getters.uiInfo &&
        this.$store.getters.uiInfo['ui.topMenuTextColor'] &&
        this.$store.getters.uiInfo['ui.topMenuTextColor'].paramValue
      ) {
        return this.$store.getters.uiInfo['ui.topMenuTextColor'].paramValue;
      }
      return this.variables.topBarMenuText;
    },
    topMenuTextActiveColor() {
      if (
        this.$store.getters.uiInfo &&
        this.$store.getters.uiInfo['ui.topMenuTextActiveColor'] &&
        this.$store.getters.uiInfo['ui.topMenuTextActiveColor'].paramValue
      ) {
        return this.$store.getters.uiInfo['ui.topMenuTextActiveColor'].paramValue;
      }
      return this.variables.topBarMenuTextActive;
    },
    helpLink() {
      if (
        this.$store.getters.uiInfo &&
        this.$store.getters.uiInfo['ui.helpLink'] &&
        this.$store.getters.uiInfo['ui.helpLink'].paramValue
      ) {
        return this.$store.getters.uiInfo['ui.helpLink'].paramValue;
      }
      return 'https://dataease.io/docs/';
    },
    /* topMenuColor() {
        return this.$store.getters.uiInfo.topMenuColor
      }, */
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        // return meta.activeMenu
      }
      // 如果是首页，首页高亮
      if (path === '/panel') {
        return '/';
      }
      // 如果不是首页，高亮一级菜单
      const activeMenu = '/' + path.split('/')[1];
      return activeMenu;
    },
    variables() {
      return variables;
    },
    sidebar() {
      return this.$store.state.app.sidebar;
    },
    ...mapGetters(['avatar', 'permission_routes', 'name']),
  },

  mounted() {
    this.initCurrentRoutes();
    bus.$on('set-top-menu-info', this.setTopMenuInfo);
    bus.$on('set-top-menu-active-info', this.setTopMenuActiveInfo);
    bus.$on('set-top-text-info', this.setTopTextInfo);
    bus.$on('set-top-text-active-info', this.setTopTextActiveInfo);
    this.showTips &&
      this.$nextTick(() => {
        const drop = this.$refs['my-drop'];
        drop && drop.show && drop.show();
      });
  },
  created() {
    this.loadUiInfo();
    getSystemUserData().then((res) => {
      this.userInfo = res.data;
    });
    getLoginLog({
      _q: { paginationParam: { page: 1, pageSize: 4 }, filter: { type: 'LOGIN' } },
      userId: this.$store.getters.auth.clientSecret,
    }).then((res) => {
      console.log('🚀 ~ res', res);
      if (res.data && res.data.resultSet.length !== 0) {
        const preLogin = new Date(res.data.resultSet[0].eventTime).toLocaleString();
        this.$set(this.userInfo, 'preLogin', preLogin);
      }
    });
  },
  beforeCreate() {
    pluginLoaded().then((res) => {
      this.isPluginLoaded = res.success && res.data;
      if (this.isPluginLoaded) {
        initTheme();
      }
    });
  },
  methods: {
    // 通过当前路径找到二级菜单对应项，存到store，用来渲染左侧菜单
    initCurrentRoutes() {
      const { path } = this.$route;
      let route = this.permission_routes.find((item) => item.path === '/' + path.split('/')[1]);
      // 如果找不到这个路由，说明是首页
      if (!route) {
        route = this.permission_routes.find((item) => item.path === '/');
      }
      this.$store.commit('permission/SET_CURRENT_ROUTES', route);
      this.setSidebarHide(route);
    },
    // 判断该路由是否只有一个子项或者没有子项，如果是，则在一级菜单添加跳转路由
    isOnlyOneChild(item) {
      if (item.children && item.children.length === 1) {
        return true;
      }
      return false;
    },
    resolvePath(item) {
      // 如果是个完成的url直接返回
      if (isExternal(item.path)) {
        return item.path;
      }
      // 如果是首页，就返回重定向路由
      if (item.path === '/') {
        const path = item.redirect;
        return path;
      }

      // 如果有子项，默认跳转第一个子项路由
      let path = '';
      /**
       * item 路由子项
       * parent 路由父项
       */
      const getDefaultPath = (item, parent) => {
        // 如果path是个外部链接（不建议），直接返回链接，存在个问题：如果是外部链接点击跳转后当前页内容还是上一个路由内容
        if (isExternal(item.path)) {
          path = item.path;
          return;
        }
        // 第一次需要父项路由拼接，所以只是第一个传parent
        if (parent) {
          path += parent.path + '/' + item.path;
        } else {
          path += '/' + item.path;
        }
        // 如果还有子项，继续递归
        if (item.children) {
          getDefaultPath(item.children[0]);
        }
      };

      if (item.children) {
        getDefaultPath(item.children[0], item);
        return path;
      }

      return item.path;
    },
    handleSelect(key, keyPath) {
      // 把选中路由的子路由保存store
      const route = this.permission_routes.find((item) => item.path === key);
      this.$store.commit('permission/SET_CURRENT_ROUTES', route);
      this.setSidebarHide(route);
    },
    // 设置侧边栏的显示和隐藏
    setSidebarHide(route) {
      //   if (!route.children || route.children.length === 1) {
      if (route.name !== 'system' && (!route.children || this.showChildLength(route) === 1)) {
        this.$store.dispatch('app/toggleSideBarHide', true);
      } else {
        this.$store.dispatch('app/toggleSideBarHide', false);
      }
    },
    // 获取非隐藏子路由的个数
    showChildLength(route) {
      if (!route || !route.children) {
        return 0;
      }
      return route.children.filter((kid) => !kid.hidden).length;
    },
    async logout() {
      await this.$store.dispatch('user/logout');
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    },
    loadUiInfo() {
      this.$store.dispatch('user/getUI').then(() => {
        this.uiInfo = getSysUI();
        if (this.uiInfo['ui.logo'] && this.uiInfo['ui.logo'].paramValue) {
          this.logoUrl = '/system/ui/image/' + this.uiInfo['ui.logo'].paramValue;
        }
        if (this.uiInfo['ui.theme'] && this.uiInfo['ui.theme'].paramValue) {
          const val = this.uiInfo['ui.theme'].paramValue;
          this.$store.dispatch('settings/changeSetting', {
            key: 'theme',
            value: val,
          });
        }

        /* if (this.uiInfo['ui.themeStr'] && this.uiInfo['ui.themeStr'].paramValue) {
            if (this.uiInfo['ui.themeStr'].paramValue === 'dark') {
              document.body.className = 'blackTheme'
            } else if (this.uiInfo['ui.themeStr'].paramValue === 'light') {
              document.body.className = ''
            }
          } */
        this.axiosFinished = true;
      });
    },

    setTopMenuInfo(val) {
      this.loadUiInfo();
    },
    setTopMenuActiveInfo(val) {
      this.loadUiInfo();
    },
    setTopTextInfo(val) {
      this.loadUiInfo();
    },
    setTopTextActiveInfo(val) {
      this.loadUiInfo();
    },
    openGoOut() {
      this.$confirm('确定退出吗？真的不再看看啦?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          logout().then(() => {
            sessionStorage.clear();
            this.$kc.logout();
            // const kc = new Keycloak('keycloak.json');
            // kc.logout();
            // window.location.href =
            //   this.$kc['auth-server-url'] +
            //   '/realms/fast/protocol/openid-connect/auth?client_id' +
            //   this.$kc.resource;
          });
        })
        .catch(() => {});
    },
  },
};
</script>
<style lang="scss" scoped>
.el-dropdown-link {
  cursor: pointer;
  color: #1e212a;
}

.el-icon-arrow-down {
  font-size: 12px;
}

.top-dropdown {
  display: inline-block;
  height: 100%;
  font-size: 16px;
  color: #1e212a;
  vertical-align: text-bottom;
  padding: 0 10px;
}

.de-top-menu {
  background-color: var(--MainBG);
  position: 'absolute';
  // left: 50%;
  left: 0;
  // transform: translateX(-50%);
}

.header-user {
  .inline {
    margin: 0;
    .text-info {
      color: #5cafde !important;
      font-size: 15px;
      font-weight: 400;
      line-height: 32px;
    }
  }
  .text-muted {
    line-height: 2.35em;
    color: #a6aeb4;

    &.pre-login {
      border-top: 1px solid #dcdfe6;
      border-bottom: 1px solid #dcdfe6;
    }
  }
  .go-out {
    color: #a6aeb4;
    padding-top: 10px;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      color: #999;
    }
  }
}
</style>
