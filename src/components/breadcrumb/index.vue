<script lang="ts" setup>
import type { RouteLocationNormalizedLoaded, RouteLocationMatched } from 'vue-router'

const { currentRoute } = useRouter()

const breadcrumbs = ref<RouteLocationMatched[]>([])

watch(
  () => currentRoute.value,
  (route: RouteLocationNormalizedLoaded) => {
    breadcrumbs.value = [
      {
        path: '/',
        meta: {
          title: '首页',
          icon: 'House',
        },
      } as RouteLocationMatched,
      ...route.matched.filter((x) => x.meta?.title),
    ]
  },
  { immediate: true },
)
</script>

<template>
  <el-breadcrumb separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="x in breadcrumbs" :to="{ path: x.path }" :key="x.path">
        <span class="breadcrumb-item-content">
          <el-icon v-if="x.meta?.icon" size="16" color="var(--el-text-color-regular)">
            <component :is="x.meta?.icon" />
          </el-icon>
          {{ x.meta.title }}
        </span>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<style lang="scss" scoped>
.el-breadcrumb {
  @include mixins.flex-ac;
}

.breadcrumb-item-content {
  @include mixins.flex-ac;
  gap: 4px;
}

/* 面包屑过渡动画 */
.breadcrumb-enter-active {
  transition: all 0.3s;
}

.breadcrumb-enter-from {
  opacity: 0;
  transform: translateX(20px);
}
</style>
