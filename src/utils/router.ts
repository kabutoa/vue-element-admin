import type { RouteComponent, RouteRecordRaw } from 'vue-router'
import { router } from '@/router'
import { dynamicRoutes as originDynamicRoutes } from '@/router/routes'

/**
 * 懒加载路由模块
 * {
 *  '/src/views/about/index.vue': () => import('@/views/about/index.vue'),
 * }
 */
export const viewModules: Record<string, RouteComponent> = import.meta.glob(
  ['@/views/**/*.vue', '!@/views/**/components/*.vue'],
  {
    eager: false,
  },
)
/**
 * 格式化路由模块
 * {
 *  '/about/index.vue': () => import('@/views/about/index.vue'),
 * }
 */
export const routeModules: Record<string, RouteComponent> = Object.keys(viewModules).reduce(
  (accumulator, currentValue) =>
    Object.assign(accumulator, {
      [currentValue.replace(/\/src\/views|..\/views/, '')]: viewModules[currentValue],
    }),
  {},
)
/**
 * 初始化动态路由
 * @param routes 路由
 */
export const initDynamicRoutes = (routes: RouteRecordRaw[]) => {
  if (!originDynamicRoutes.length) return []
  const dynamicRoutes = originDynamicRoutes.slice()
  dynamicRoutes[0].children = routes
  addRoutes(dynamicRoutes)
}
/**
 * 生成动态路由
 * @param menus 路由菜单
 * @returns 动态路由
 */
export const generateRoutesByMenus = (menus: RouteRecordRaw[]) => {
  if (!menus?.length) return []
  return menus.map((menu) => {
    const { component } = menu
    if (component) {
      menu.component = routeModules[`${component}`] || routeModules[`/${component}`]
    }
    menu.children && generateRoutesByMenus(menu.children)
    return menu
  })
}

/**
 * 添加路由
 * @param routes 路由
 */
export const addRoutes = (routes: RouteRecordRaw[]) => {
  routes.forEach((route) => {
    router.addRoute(route)
  })
}
