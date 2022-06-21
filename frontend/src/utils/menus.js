export default [
  // {
  //   path: '/wizard',
  //   component: 'wizard/index',
  //   redirect: null,
  //   name: 'wizard',
  //   meta: {
  //     title: '首页',
  //     icon: '',
  //   },
  //   pid: 0,
  //   id: 100,
  //   permission: null,
  //   hidden: false,
  //   type: 1,
  //   menuSort: 0,
  //   isPlugin: false,
  //   noLayout: null,
  //   children: null,
  // },
  {
    path: '/panel',
    component: 'panel/index',
    redirect: null,
    name: 'panel',
    meta: {
      title: '仪表板',
      icon: null,
    },
    pid: 0,
    id: 30,
    permission: null,
    hidden: false,
    type: 1,
    menuSort: 1,
    isPlugin: false,
    noLayout: null,
    children: null,
  },
  {
    path: '/dataset',
    component: 'dataset/index',
    redirect: null,
    name: 'dataset',
    meta: {
      title: '数据集',
      icon: '',
    },
    pid: 0,
    id: 8,
    permission: 'data:read',
    hidden: false,
    type: 1,
    menuSort: 3,
    isPlugin: false,
    noLayout: null,
    children: null,
  },
  {
    path: '/datasource',
    component: 'system/datasource/index',
    redirect: null,
    name: 'datasource',
    meta: {
      title: '数据源',
      icon: null,
    },
    pid: 0,
    id: 34,
    permission: 'datasource:read',
    hidden: false,
    type: 1,
    menuSort: 4,
    isPlugin: false,
    noLayout: null,
    children: null,
  },
  // #region
  // {
  //   path: '/system',
  //   component: 'Layout',
  //   redirect: '/system/user',
  //   name: 'system',
  //   meta: {
  //     title: '系统管理',
  //     icon: 'system',
  //   },
  //   pid: 0,
  //   id: 1,
  //   permission: null,
  //   hidden: false,
  //   type: 0,
  //   menuSort: 6,
  //   isPlugin: false,
  //   noLayout: null,
  //   children: [
  //     {
  //       path: 'user',
  //       component: 'system/user/index',
  //       redirect: null,
  //       name: 'system-user',
  //       meta: {
  //         title: '用户管理',
  //         icon: 'peoples',
  //       },
  //       pid: 1,
  //       id: 2,
  //       permission: 'user:read',
  //       hidden: false,
  //       type: 1,
  //       menuSort: 1,
  //       isPlugin: false,
  //       noLayout: null,
  //       children: null,
  //     },
  //     {
  //       path: 'system-param',
  //       component: 'system/SysParam/index',
  //       redirect: null,
  //       name: 'system-param',
  //       meta: {
  //         title: '系统参数',
  //         icon: 'sys-tools',
  //       },
  //       pid: 1,
  //       id: 6,
  //       permission: 'sysparam:read',
  //       hidden: false,
  //       type: 1,
  //       menuSort: 6,
  //       isPlugin: false,
  //       noLayout: null,
  //       children: null,
  //     },
  //     {
  //       path: 'panel/template/index',
  //       component: 'panel/template/index',
  //       redirect: null,
  //       name: 'system-template',
  //       meta: {
  //         title: '模板管理',
  //         icon: 'dashboard',
  //       },
  //       pid: 1,
  //       id: 40,
  //       permission: 'template:read',
  //       hidden: false,
  //       type: 1,
  //       menuSort: 13,
  //       isPlugin: false,
  //       noLayout: null,
  //       children: null,
  //     },
  //     {
  //       path: 'log',
  //       component: 'system/log/index',
  //       redirect: null,
  //       name: 'system-log',
  //       meta: {
  //         title: '日志管理',
  //         icon: 'log',
  //       },
  //       pid: 1,
  //       id: 618,
  //       permission: 'log:read',
  //       hidden: false,
  //       type: 1,
  //       menuSort: 15,
  //       isPlugin: false,
  //       noLayout: null,
  //       children: null,
  //     },
  //     {
  //       path: 'system-msg-web',
  //       component: 'msg/index',
  //       redirect: 'system-msg-web/all',
  //       name: 'sys-msg-web',
  //       meta: {
  //         title: '站内消息',
  //         icon: 'all-msg',
  //       },
  //       pid: 1,
  //       id: 53,
  //       permission: null,
  //       hidden: false,
  //       type: 1,
  //       menuSort: 1000,
  //       isPlugin: false,
  //       noLayout: null,
  //       children: [
  //         {
  //           path: 'all',
  //           component: 'msg/all',
  //           redirect: null,
  //           name: 'sys-msg-web-all',
  //           meta: {
  //             title: '所有消息',
  //             icon: 'web-msg',
  //           },
  //           pid: 53,
  //           id: 54,
  //           permission: null,
  //           hidden: false,
  //           type: 1,
  //           menuSort: 1,
  //           isPlugin: false,
  //           noLayout: null,
  //           children: null,
  //         },
  //         {
  //           path: 'unread',
  //           component: 'msg/unread',
  //           redirect: null,
  //           name: 'sys-msg-web-unread',
  //           meta: {
  //             title: '未读消息',
  //             icon: 'unread-msg',
  //           },
  //           pid: 53,
  //           id: 55,
  //           permission: null,
  //           hidden: false,
  //           type: 1,
  //           menuSort: 2,
  //           isPlugin: false,
  //           noLayout: null,
  //           children: null,
  //         },
  //         {
  //           path: 'readed',
  //           component: 'msg/readed',
  //           redirect: null,
  //           name: 'sys-msg-web-readed',
  //           meta: {
  //             title: '已读消息',
  //             icon: 'readed-msg',
  //           },
  //           pid: 53,
  //           id: 56,
  //           permission: null,
  //           hidden: false,
  //           type: 1,
  //           menuSort: 3,
  //           isPlugin: false,
  //           noLayout: null,
  //           children: null,
  //         },
  //         {
  //           path: 'setting',
  //           component: 'msg/setting',
  //           redirect: null,
  //           name: 'sys-msg-setting',
  //           meta: {
  //             title: '接收管理',
  //             icon: 'msg-setting',
  //           },
  //           pid: 53,
  //           id: 59,
  //           permission: null,
  //           hidden: false,
  //           type: 1,
  //           menuSort: 4,
  //           isPlugin: false,
  //           noLayout: null,
  //           children: null,
  //         },
  //       ],
  //     },
  //     {
  //       path: 'system-task',
  //       component: 'system/task/index',
  //       redirect: 'system-task/dataset',
  //       name: 'sys-task',
  //       meta: {
  //         title: '任务管理',
  //         icon: 'task',
  //       },
  //       pid: 1,
  //       id: 60,
  //       permission: '',
  //       hidden: false,
  //       type: 1,
  //       menuSort: 1001,
  //       isPlugin: false,
  //       noLayout: null,
  //       children: [
  //         {
  //           path: 'dataset',
  //           component: 'system/task/dataset',
  //           redirect: null,
  //           name: 'sys-task-dataset',
  //           meta: {
  //             title: '数据同步',
  //             icon: 'dataset-task',
  //           },
  //           pid: 60,
  //           id: 58,
  //           permission: 'task:read',
  //           hidden: false,
  //           type: 1,
  //           menuSort: 1001,
  //           isPlugin: false,
  //           noLayout: null,
  //           children: null,
  //         },
  //       ],
  //     },
  //     {
  //       path: 'plugin',
  //       component: 'system/plugin/index',
  //       redirect: null,
  //       name: 'system-plugin',
  //       meta: {
  //         title: '插件管理',
  //         icon: 'plugins',
  //       },
  //       pid: 1,
  //       id: 101,
  //       permission: 'plugin:read',
  //       hidden: false,
  //       type: 1,
  //       menuSort: 1002,
  //       isPlugin: false,
  //       noLayout: null,
  //       children: null,
  //     },
  //     {
  //       path: 'user-form',
  //       component: 'system/user/form',
  //       redirect: null,
  //       name: 'system-user-form',
  //       meta: {
  //         title: '用户表单',
  //         icon: '',
  //       },
  //       pid: 1,
  //       id: 35,
  //       permission: null,
  //       hidden: true,
  //       type: 1,
  //       menuSort: 10,
  //       isPlugin: false,
  //       noLayout: null,
  //       children: null,
  //     },
  //   ],
  // },
  // #endregion
  {
    path: '/ds-form',
    component: 'system/datasource/form',
    redirect: null,
    name: 'datasource-form',
    meta: {
      title: '数据源表单',
      icon: null,
    },
    pid: 0,
    id: 39,
    permission: null,
    hidden: true,
    type: 1,
    menuSort: 5,
    isPlugin: false,
    noLayout: null,
    children: null,
  },
  {
    path: '/about',
    component: 'system/about/index',
    redirect: null,
    name: 'about',
    meta: {
      title: '关于',
      icon: 'system',
    },
    pid: 0,
    id: 52,
    permission: null,
    hidden: true,
    type: 1,
    menuSort: 16,
    isPlugin: false,
    noLayout: null,
    children: null,
  },
  {
    path: '/person-info',
    component: 'system/user/privateForm',
    redirect: null,
    name: 'person-info',
    meta: {
      title: '个人信息',
      icon: null,
    },
    pid: 0,
    id: 50,
    permission: null,
    hidden: true,
    type: 1,
    menuSort: 999,
    isPlugin: false,
    noLayout: null,
    children: null,
  },
  {
    path: '/person-pwd',
    component: 'system/user/personPwd',
    redirect: null,
    name: 'person-pwd-reset',
    meta: {
      title: '重置密码',
      icon: null,
    },
    pid: 0,
    id: 51,
    permission: null,
    hidden: true,
    type: 1,
    menuSort: 999,
    isPlugin: false,
    noLayout: null,
    children: null,
  },
];
