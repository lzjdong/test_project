import router from '@/router';
import store from './store';
// import { Message } from 'element-ui'
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css'; // progress bar style
import { getToken } from '@/utils/auth'; // get token from cookie
import getPageTitle from '@/utils/get-page-title';
import { buildMenus } from '@/api/system/menu';
import { filterAsyncRouter } from '@/store/modules/permission';
import { isMobile } from '@/utils/index';
import Layout from '@/layout/index';
// import bus from './utils/bus'

import { getSocket } from '@/websocket';

NProgress.configure({
  showSpinner: false,
}); // NProgress Configuration

const whiteList = ['/login', '/401', '/404', '/delink', '/nolic', '/panel']; // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start();
  const mobileIgnores = ['/delink'];
  const mobilePreview = '/preview/';

  if (isMobile() && !to.path.includes(mobilePreview) && mobileIgnores.indexOf(to.path) === -1) {
    window.location.href = window.origin + '/app.html';
    NProgress.done();
  }

  // set page title
  document.title = getPageTitle(to.meta.title);

  // determine whether the user has logged in
  // const hasToken = getToken()
  const hasToken = true;
  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({
        path: '/',
      });
      NProgress.done();
    } else {
      const hasGetUserInfo = store.getters.name;
      if (
        hasGetUserInfo ||
        to.path.indexOf('/previewScreenShot/') > -1 ||
        to.path.indexOf('/preview/') > -1 ||
        to.path.indexOf('/delink') > -1 ||
        to.path.indexOf('/nolic') > -1
      ) {
        next();
        store.dispatch('permission/setCurrentPath', to.path);
      } else {
        if (store.getters.roles.length === 0 && 0 === 1) {
          // 判断当前用户是否已拉取完user_info信息
          // get user info
          store
            .dispatch('user/getInfo')
            .then(() => {
              const deWebsocket = getSocket();
              deWebsocket && deWebsocket.reconnect && deWebsocket.reconnect();
              store
                .dispatch('lic/getLicInfo')
                .then(() => {
                  loadMenus(next, to);
                })
                .catch(() => {
                  loadMenus(next, to);
                });
            })
            .catch(() => {
              store.dispatch('user/logout').then(() => {
                location.reload(); // 为了重新实例化vue-router对象 避免bug
              });
            });
        } else if (store.getters.loadMenus) {
          // 修改成false，防止死循环
          store.dispatch('user/updateLoadMenus');
          store
            .dispatch('lic/getLicInfo')
            .then(() => {
              loadMenus(next, to);
            })
            .catch(() => {
              loadMenus(next, to);
            });
        } else {
          next();
        }
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next();
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`);
      NProgress.done();
    }
  }
});
export const loadMenus = (next, to) => {
  buildMenus().then((res) => {
    const datas = res.data;
    console.log('🚀 ~ datas', datas);
    const filterDatas = filterRouter(datas);
    const asyncRouter = filterAsyncRouter(filterDatas);
    // 如果包含首页 则默认页面是 首页 否则默认页面是仪表板页面
    if (JSON.stringify(datas).indexOf('wizard') > -1) {
      asyncRouter.push({
        path: '/',
        component: Layout,
        redirect: '/wizard/index',
        hidden: true,
      });
    } else {
      asyncRouter.push({
        path: '/',
        component: Layout,
        redirect: '/panel/index',
        hidden: true,
      });
    }

    asyncRouter.push({
      path: '*',
      redirect: '/404',
      hidden: true,
    });
    store.dispatch('permission/GenerateRoutes', asyncRouter).then(() => {
      // 存储路由
      router.addRoutes(asyncRouter);
      if (pathValid(to.path, asyncRouter)) {
        next({
          ...to,
          replace: true,
        });
      } else {
        next('/');
      }
    });
  });
};

/**
 * 验证path是否有效
 * @param {*} path
 * @param {*} routers
 * @returns
 */
const pathValid = (path, routers) => {
  const temp = path.startsWith('/') ? path.substr(1) : path;
  const locations = temp.split('/');
  if (locations.length === 0) {
    return false;
  }

  return hasCurrentRouter(locations, routers, 0);
};
/**
 * 递归验证every level
 * @param {*} locations
 * @param {*} routers
 * @param {*} index
 * @returns
 */
const hasCurrentRouter = (locations, routers, index) => {
  const location = locations[index];
  let kids = [];
  const isvalid = routers.some((router) => {
    kids = router.children;
    return router.path === location || '/' + location === router.path;
  });
  if (isvalid && index < locations.length - 1) {
    return hasCurrentRouter(locations, kids, index + 1);
  }
  return isvalid;
};
// 根据权限过滤菜单
const filterRouter = (routers) => {
  const user_permissions = store.getters.permissions;
  // if (!user_permissions || user_permissions.length === 0) {
  //   return routers
  // }
  const tempResults = routers.filter((router) => hasPermission(router, user_permissions));
  // 如果是一级菜单(目录) 没有字菜单 那就移除
  return tempResults.filter((item) => {
    if (item.type === 0 && (!item.children || item.children.length === 0)) {
      return false;
    }
    return true;
  });
};
const hasPermission = (router, user_permissions) => {
  // 菜单要求权限 但是当前用户权限没有包含菜单权限
  if (router.permission && !user_permissions.includes(router.permission)) {
    return false;
  }
  if (!filterLic(router)) {
    return false;
  }
  // 如果有字菜单 则 判断是否满足 ‘任意一个子菜单有权限’
  if (router.children && router.children.length) {
    const permissionChilds = router.children.filter((item) =>
      hasPermission(item, user_permissions)
    );
    router.children = permissionChilds;
    return router.children.length > 0;
  }
  return true;
};
const filterLic = (router) => {
  return !router.isPlugin || store.getters.validate;
};
router.afterEach(() => {
  // finish progress bar
  NProgress.done();
});
