export default {
  url: '/auth/userInfo',
  type: 'get',
  response: () => {
    return {
      status: 'success',
      code: 200,
      message: '请求成功',
      data: {
        userInfo: {
          userId: 2,
          userName: 'Susan',
          nickName: '苏珊',
          avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        },
        buttons: [],
        menus: [
          {
            path: '/dashboard',
            name: 'Dashboard',
            redirect: null,
            component: 'dashboard/index.vue',
            meta: {
              title: '看板',
              icon: 'PieChart',
              cache: true,
              hidden: false,
            },
            children: [],
          },
          {
            path: '/system',
            name: 'System',
            redirect: '/system/menu',
            meta: {
              title: '系统管理',
              icon: 'Setting',
              cache: true,
              hidden: false,
            },
            children: [
              {
                path: '/system/menu',
                name: 'SystemMenu',
                redirect: null,
                component: 'system/menu/index.vue',
                meta: {
                  title: '菜单管理',
                  icon: 'Menu',
                  cache: false,
                  hidden: false,
                },
                children: [],
              },
              {
                path: '/system/role',
                name: 'SystemRole',
                component: 'system/role/index.vue',
                meta: {
                  title: '角色管理',
                  icon: 'IceCream',
                  cache: true,
                  hidden: false,
                },
                children: [],
              },
              {
                path: '/system/user',
                name: 'SystemUser',
                redirect: null,
                component: 'system/user/index.vue',
                meta: {
                  title: '用户管理',
                  icon: 'User',
                  cache: true,
                  hidden: false,
                },
                children: [],
              },
            ],
          },
          {
            path: '/goods',
            name: 'Goods',
            redirect: '/goods/list',
            meta: {
              title: '商品管理',
              icon: 'Goods',
              cache: true,
              hidden: false,
            },
            children: [
              {
                path: '/goods/list',
                name: 'GoodsList',
                redirect: null,
                component: 'goods/list/index.vue',
                meta: {
                  title: '商品列表',
                  icon: 'GoodsFilled',
                  cache: false,
                  hidden: false,
                },
                children: [],
              },
              {
                path: '/goods/category',
                name: 'GoodsCategory',
                redirect: null,
                component: 'goods/category/index.vue',
                meta: {
                  title: '商品分类',
                  icon: 'Operation',
                  cache: false,
                  hidden: false,
                },
                children: [],
              },
            ],
          },
          {
            path: '/author',
            name: 'Author',
            redirect: null,
            component: 'author/index.vue',
            meta: {
              title: '作者官网',
              icon: 'Link',
              linkTo: 'https://www.rlfit.cn',
              cache: true,
              hidden: false,
            },
            children: [],
          },
        ],
      },
    }
  },
}
