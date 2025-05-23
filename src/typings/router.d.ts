import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    // 标题
    title?: string
    // 图标
    icon?: string
    // 是否需要登录
    requiresAuth?: boolean
    // 权限
    permissions?: string[]
    // 布局
    layout?: string
    // 是否隐藏
    hidden?: boolean
    // 排序
    order?: number
    // 是否需要缓存
    cache?: boolean
    // 外链
    externalLink?: boolean
  }
}
